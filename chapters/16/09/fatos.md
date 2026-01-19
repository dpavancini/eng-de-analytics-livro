# 16.9 Tabelas fato

Nesta seção vamos modelar as **tabelas fato** do projeto. Se dimensões respondem “**quem/o quê/onde**”, fatos respondem “**o que aconteceu**” e carregam as **métricas** (medidas) no **grão** escolhido.

No nosso caso, temos dois eventos centrais no processo de vendas da Northwind:

- **Pedido** (`orders`): um pedido feito por um cliente, atendido por um funcionário e entregue por uma transportadora.
- **Item de pedido** (`order_items`): cada produto comprado dentro de um pedido (com quantidade, preço e desconto).

Isso se traduz em duas tabelas fato na camada `marts`:

- `fct_orders`: **1 linha por pedido**
- `fct_transactions`: **1 linha por item do pedido** (transação/linha)

> Pressuposto: a camada `staging` já está pronta (`stg_erp__orders`, `stg_erp__order_items`, etc.). O foco aqui é **intermediate → marts**.

## Grão primeiro, métricas depois

A decisão mais importante ao criar uma fato é o **grão**. Ele determina:

- Qual a pergunta que a tabela responde (ex.: “vendas por pedido” vs “vendas por produto”).
- Quais métricas fazem sentido (e como agregá-las).
- Quais chaves estrangeiras entram na tabela (quais dimensões a fato referencia).

No nosso esquema estrela:

- `fct_orders` referencia `dim_customers`, `dim_employees` e `dim_shippers` (um pedido aponta para exatamente um cliente, um funcionário e uma transportadora).
- `fct_transactions` referencia as mesmas dimensões e adiciona `dim_products` (um item de pedido aponta para exatamente um produto).

## Por que temos modelos `intermediate` para fatos?

Em teoria, poderíamos construir as fatos diretamente em `marts`. Mas existe uma vantagem prática em colocar as regras e cálculos em `intermediate`:

- **Reuso e consistência**: a mesma métrica (ex.: `net_total`) é usada por diferentes análises; centralizar evita divergências.
- **Testabilidade**: fica mais simples criar testes e validar cada etapa (join, cálculo, agregação).
- **Contrato limpo em `marts`**: a camada final apenas “publica” um dataset já pronto que foi testado previamente na camada `intermediate`.

No projeto, usamos dois modelos intermediários:

- `int_order_items__metrics`: cria métricas no grão de **item de pedido**
- `int_orders__metrics`: agrega as métricas no grão de **pedido**

## Fato no grão de item: `int_order_items__metrics` → `fct_transactions`

### Por que fazemos `join` entre `orders` e `order_items`?

O `stg_erp__order_items` traz as métricas “de linha” (preço, quantidade, desconto), mas não possui todas as chaves e datas que são úteis no consumo (por exemplo, `customer_fk`, `employee_fk`, `order_date`). Essas informações vivem em `orders`.

Como a relação é **1 pedido → N itens**, este `join` é do tipo **one-to-many**. No grão do item, isso é exatamente o que queremos: **cada linha continua representando um item de pedido**, agora enriquecido com atributos do pedido.

Usamos `left join` para preservar o grão do item de pedido mesmo se houver anomalias upstream. Em um sistema transacional bem modelado, espera-se que não existam itens órfãos (um item sem pedido correspondente). Ainda assim, em pipelines analíticos reais, falhas de ingestão e reprocessamentos podem produzir inconsistências temporárias. Ao manter o `left join` e cobrir integridade referencial com testes, você evita perder registros silenciosamente e consegue diagnosticar o problema mais cedo.

### Métricas do item (e por que elas existem)

No grão do item, criamos métricas **aditivas** (somáveis) que funcionam bem em praticamente qualquer agregação:

- `gross_total`: **valor bruto** da linha (`unit_price * quantity`), antes de desconto.
- `net_total`: **valor líquido** da linha (aplica desconto: `unit_price * (1 - discount_pct) * quantity`).
- `had_discount`: flag booleana para análises de desconto (ex.: “% de itens com desconto”).

Também resolvemos um problema comum de modelagem: o `freight` (frete) está no grão do **pedido**, mas `fct_transactions` está no grão do **item**. Para não misturar grãos (e para possibilitar análises de custo por produto/transação), alocamos o frete proporcionalmente por linha.

No projeto, por razões acadêmicas, a regra escolhida é simples e direta: **dividir o frete igualmente entre os itens do pedido**. No mundo real, o frete de um item costuma depender de fatores como peso, volume e modalidade de entrega.

`models/intermediate/int_order_items__metrics.sql`

```sql
with
    orders as (
        select *
        from {{ ref('stg_erp__orders') }}
    )

    , order_items as (
        select *
        from {{ ref('stg_erp__order_items') }}
    )

    , joined as (
        select
            order_items.order_item_sk
            , order_items.order_fk
            , order_items.product_fk
            , orders.employee_fk
            , orders.customer_fk
            , orders.shipper_fk
            , orders.order_date
            , orders.ship_date
            , orders.required_delivery_date
            , order_items.discount_pct
            , order_items.unit_price
            , order_items.quantity
            , orders.freight
            , orders.order_number
            , orders.recipient_name
            , orders.recipient_city
            , orders.recipient_region
            , orders.recipient_country
        from order_items
        left join orders on order_items.order_fk = orders.order_pk
    )

	    , metrics as (
	        select
	        order_item_sk
	        , order_fk
	        , product_fk
	        , employee_fk
	        , customer_fk
	        , shipper_fk
	        , order_date
	        , ship_date
	        , required_delivery_date
            , discount_pct
            , unit_price
            , quantity
            , unit_price * quantity as gross_total
            , unit_price * (1 - discount_pct) * quantity as net_total
            , cast((freight / count(*) over (partition by order_number)) as numeric(18,2)) as freight_allocated
            , case
                when discount_pct > 0 then true
                else false
            end as had_discount
            , order_number
            , recipient_name
            , recipient_city
            , recipient_region
            , recipient_country
        from joined
    )

select *
from metrics
```

Algumas observações importantes sobre esse modelo:

- `freight_allocated` usa uma **função de janela** para contar quantas linhas existem por pedido e dividir o frete por esse número.
- `gross_total` e `net_total` são métricas que você vai somar com frequência. Por isso, é melhor tê-las pré-calculadas na fato do que repetir a regra em cada consumo.

### Publicação no mart: `fct_transactions`

Com as métricas prontas em `intermediate`, a fato final fica enxuta:

`models/marts/fct_transactions.sql`

```sql
with
    transactions as (
        select *
        from {{ ref('int_order_items__metrics') }}
    )

select *
from transactions
```

## Fato no grão de pedido: `int_orders__metrics` → `fct_orders`

O grão do pedido é muito útil quando a pergunta é sobre o **pedido como unidade**: quantidade de pedidos, ticket médio por pedido, tempo de entrega, etc.

O desafio é que muitas métricas “de venda” nascem no item (`quantity`, `net_total`) e precisam ser **agregadas** no nível do pedido. Por isso, `int_orders__metrics` depende de `int_order_items__metrics`.

### Métricas do pedido (e por que elas existem)

No modelo de pedidos, criamos agregações diretas:

- `total_quantity`: soma das quantidades dos itens do pedido.
- `gross_total`: soma do valor bruto das linhas.
- `net_total`: soma do valor líquido das linhas (já com desconto).
- `line_item_count`: contagem de itens (linhas) no pedido.
- `had_discount_flag`: indicador se o pedido teve ao menos um item com desconto.
- `freight_total`: frete no grão do pedido (sem alocação).

Além disso, carregamos as chaves estrangeiras e datas que conectam o pedido às dimensões e permitem análises temporais.

`models/intermediate/int_orders__metrics.sql`

```sql
with
    order_items_metrics as (
        select *
        from {{ ref('int_order_items__metrics') }}
    )

    , aggregated_line_metrics as (
        select
            order_fk
            , sum(quantity) as total_quantity
            , sum(gross_total) as gross_total
            , sum(net_total) as net_total
            , count(*) as line_item_count
            , max(case when had_discount then 1 else 0 end) as had_discount_flag
        from order_items_metrics
        group by order_fk
    )

    , orders as (
        select *
        from {{ ref('stg_erp__orders') }}
    )

select
    orders.order_pk
    , orders.order_number
    , orders.employee_fk
    , orders.customer_fk
    , orders.shipper_fk
    , orders.order_date
    , orders.ship_date
    , orders.required_delivery_date
    , orders.freight as freight_total
    , coalesce(aggregated_line_metrics.total_quantity, 0) as total_quantity
    , coalesce(aggregated_line_metrics.gross_total, 0) as gross_total
    , coalesce(aggregated_line_metrics.net_total, 0) as net_total
    , coalesce(aggregated_line_metrics.line_item_count, 0) as line_item_count
    , coalesce(aggregated_line_metrics.had_discount_flag, 0) as had_discount_flag
    , orders.recipient_name
    , orders.recipient_city
    , orders.recipient_region
    , orders.recipient_country
from orders
left join aggregated_line_metrics on aggregated_line_metrics.order_fk = orders.order_pk
```

Por que `left join` aqui?

- Queremos preservar o grão de `orders` (1 linha por pedido) mesmo que, por alguma anomalia, um pedido não tenha itens associados.
- Ao usar `coalesce(..., 0)`, garantimos que as métricas numéricas não fiquem nulas e funcionem bem em agregações.

### Publicação no mart: `fct_orders`

Assim como na fato de itens, a camada `marts` apenas publica o dataset intermediário:

`models/marts/fct_orders.sql`

```sql
with
    orders_metrics as (
        select *
        from {{ ref('int_orders__metrics') }}
    )

select *
from orders_metrics
```

## Como escolher a fato certa no consumo

Uma forma rápida de decidir:

- Use `fct_orders` quando o objeto de análise for o **pedido** (ex.: ticket médio, pedidos por cliente, taxa de desconto por pedido).
- Use `fct_transactions` quando o objeto de análise for o **produto/linha** (ex.: vendas por produto, desconto por categoria, margem por item — se você tiver custo).

E lembre do princípio central: **não misture grãos**. Se uma métrica nasce no pedido (como `freight_total`), ela deve estar em `fct_orders` (ou ser alocada para o grão menor com uma regra explícita, como fizemos em `freight_allocated`).
