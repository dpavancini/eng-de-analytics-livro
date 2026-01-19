# 16.10 Testes singulares

Antes de entrar nos testes singulares, vale reforçar um hábito importante: **documente e teste seus modelos conforme você constrói**. Na prática, isso significa colocar descrições (`description`) e testes de *schema* (como `not_null`, `unique` e `relationships`) nos seus `schema.yml`. Na branch `recursos`, você viu esse padrão aplicado aos modelos e às fontes. O motivo é simples: documentação e testes funcionam como um **contrato** do dado, reduzindo ambiguidade e ajudando o time a detectar regressões cedo.

Feito isso, chegamos a um tipo de validação que complementa muito bem os testes genéricos: os **testes singulares**.

## O que são testes singulares?

No dbt, um **teste singular** é um arquivo `.sql` (normalmente na pasta `tests/`) que retorna **linhas quando o teste falha**. Ou seja:

- Se a query retorna **0 linhas**, o teste **passa**.
- Se a query retorna **1+ linhas**, o teste **falha** (e o dbt mostra as linhas como evidência do problema).

Esse formato é poderoso porque você pode escrever praticamente qualquer validação em SQL: regras de negócio, reconciliações com números auditados, checagens de consistência entre camadas, “guardrails” para métricas críticas etc.

## Diferença entre testes singulares e testes genéricos

Os **testes genéricos** (declarados em `schema.yml`) são “moldes” reutilizáveis. Você aplica o mesmo padrão a várias colunas/modelos:

- `not_null` e `unique` (muito comuns para chaves e colunas obrigatórias)
- `relationships` (integridade referencial)
- `accepted_values` (domínios e flags)

Já os **testes singulares** são específicos: eles validam um cenário ou uma regra que não cabe bem num molde genérico, por exemplo:

- “O total de vendas de 2012 deve bater com o valor auditado.”
- “Não pode existir pedido com `ship_date` anterior a `order_date`.”
- “A soma de `net_total` por mês não pode variar mais que X% sem explicação.”

Na engenharia de analytics, os dois se complementam:

- Testes genéricos garantem a **higiene estrutural** (chaves, nulos, relacionamentos).
- Testes singulares garantem a **qualidade semântica e de métricas** (o que o negócio realmente enxerga).

## Por que testar uma métrica “de verdade” é importante?

Em projetos reais, dashboards e decisões dependem de **métricas**, não de tabelas. Por isso, além de testar chaves e relacionamentos, o projeto deve mirar para que **toda tabela fato tenha ao menos um teste de qualidade contra um valor que sabemos ser correto** (um número “dourado”, auditado ou reconciliado).

Esse tipo de teste é especialmente útil quando:

- A métrica é crítica (ex.: receita, pedidos, usuários ativos).
- O cálculo tem regras (desconto, devolução, frete, alocação).
- Houve mudanças recentes em fontes, joins ou transformação.

O ganho é direto: você protege a confiança nos números e reduz o risco de decisões baseadas em dados errados.

## Por que colocar o teste na camada `intermediate`?

A camada `intermediate` existe, entre outros motivos, para tornar o pipeline **testável**. Validar ali tem uma vantagem prática:

- Se algo quebra (ingestão, join, regra de cálculo), o teste falha **antes** da camada final (`marts`) ser publicada.

Isso impede que dados errados cheguem na camada final de *report* e, consequentemente, **no dashboard onde decisões são tomadas**.

Existe um *trade-off*: quando o teste falha, os dados podem ficar **desatualizados** até o problema ser corrigido. Mas, em analytics, normalmente é melhor estar **desatualizado do que errado**: dado errado implica perda de confiança, retrabalho e possíveis más decisões.

## Exemplo: teste singular das vendas de 2012

Vamos usar um exemplo clássico de reconciliação: existe um valor auditado para o **total bruto de vendas de 2012**. No projeto de da Northwind, as métricas de item de pedido são calculadas no modelo `int_order_items__metrics`. É nele que nasce a métrica `gross_total`, que depois é agregada em análises.

Para entender o teste, primeiro veja os modelos envolvidos.

### Staging: itens do pedido

`dbk_norhtwind/models/staging/erp/stg_erp__order_items.sql`

```sql
with
    source_order_details as (
        select *
        from {{ source('erp', 'orders_detail') }}
    )

    , renamed as (
        select
            {{ dbt_utils.generate_surrogate_key(['orderid', 'productid']) }} as order_item_sk
            , cast(orderid as int) as order_fk
            , cast(productid as int) as product_fk
            , cast(discount as numeric(18,2)) as discount_pct
            , cast(unitprice as numeric(18,2)) as unit_price
            , cast(quantity as int) as quantity
        from source_order_details
    )

select *
from renamed
```

Aqui a ideia é “arrumar” o dado bruto: renomear colunas, normalizar tipos e criar uma chave substituta (`order_item_sk`) para cada linha (item do pedido).

### Staging: pedidos

`dbk_norhtwind/models/staging/erp/stg_erp__orders.sql`

```sql
with
    source_orders as (
        select *
        from {{ source('erp', 'orders') }}
    )

    , renamed as (
        select
            cast(id as int) as order_pk
            , cast(employeeid as int) as employee_fk
            , cast(customerid as string) as customer_fk
            , cast(shipvia as int) as shipper_fk
            , cast(id as int) as order_number
            , cast(orderdate as date) as order_date
            , cast(shippeddate as date) as ship_date
            , cast(requireddate as date) as required_delivery_date
            , cast(freight as numeric) as freight
            , cast(shipname as string) as recipient_name
            , cast(shipcity as string) as recipient_city
            , cast(shipregion as string) as recipient_region
            , cast(shipcountry as string) as recipient_country
        from source_orders
    )

select *
from renamed
```

Esse modelo cria as chaves e datas do pedido, além de atributos de entrega que são muito usados no consumo (por exemplo, `order_date` e geografia de entrega).

### Intermediate: métricas no grão do item

`dbk_norhtwind/models/intermediate/int_order_items__metrics.sql`

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
        inner join orders on order_items.order_fk = orders.order_pk
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

Repare como esse modelo materializa **regras de negócio em métricas**:

- `gross_total`: valor bruto da linha (`unit_price * quantity`)
- `net_total`: valor líquido com desconto
- `freight_allocated`: uma regra explícita de alocação de frete para não misturar grãos

É justamente por centralizar regras assim que faz sentido colocar testes singulares na `intermediate`: aqui a métrica “nasce” e qualquer erro vai contaminar tudo que depende dela.

## O teste singular (reconciliação) em si

Agora, o teste que valida a métrica: ele calcula a soma de `gross_total` em 2012 e compara com o valor auditado (com uma tolerância pequena, para lidar com arredondamentos).

`dbk_norhtwind/tests/tst_order_items__total_sales_2012.sql`

```sql
/*
    This test ensures that the gross sales for 2012 match
    the audited accounting value: R$ 230,784.68
*/

with
    sales_in_2012 as (
        select sum(gross_total) as sum_gross_total
        from {{ ref('int_order_items__metrics') }}
        where order_date between '2012-01-01' and '2012-12-31'
    )

select sum_gross_total
from sales_in_2012
where sum_gross_total not between 230784.00 and 230785.00
```

Como ler esse teste:

- Ele depende de `int_order_items__metrics`, que é onde a métrica é calculada.
- Se a soma estiver dentro do intervalo, o `select` final não retorna nada → **passa**.
- Se a soma ficar fora do intervalo, retorna o valor calculado → **falha** e já te entrega evidência.

Esse padrão (“métrica agregada vs valor conhecido”) é uma das formas mais efetivas de testar fatos. Em projetos reais, é comum manter um conjunto pequeno de testes desse tipo para métricas críticas, como receita e pedidos, apoiados por números validados (contábil, financeiro, sistema fonte, auditoria, *back-office* etc.).

Esse teste protege a tabela contra edições upstream que não tragram problemas para a chave unitárias, mas que acidentalmente mudam a forma de calculo das métricas o que por sua vez passar a apresentar dados erroneos.
