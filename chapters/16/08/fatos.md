# 16.8 Criando as tabelas fato

Construímos duas tabelas fato complementares para cobrir diferentes grãos.

## `fct_transactions` (grão: item do pedido)

- Mede receita linha a linha.
- Replica o freight total em cada linha e calcula `freight_allocated`.
- Reaproveita o modelo `int_order_items__metrics`.

```sql
with transactions as (
    select * from {{ ref('int_order_items__metrics') }}
)
select * from transactions
```

Boas práticas:

- Sempre inclua `order_item_sk` como chave primária com testes `unique` e `not_null`.
- Documente `order_fk`, `product_fk`, `customer_fk` e demais chaves estrangeiras.
- Adicione colunas derivadas (`gross_total`, `net_total`, `had_discount`) no intermediário para manter a fato enxuta.

## `fct_orders` (grão: pedido)

- Consolida métricas agregadas por pedido.
- Mostra o total de freight, a quantidade de itens e um *flag* se houve desconto.
- Usa o intermediário `int_orders__metrics`.

```sql
with orders_metrics as (
    select * from {{ ref('int_orders__metrics') }}
)
select * from orders_metrics
```

Recomendações:

- Mantenha nomes consistentes (`order_pk`, `order_number`) e reutilize as dimensões já criadas.
- Aproveite a modularidade: qualquer ajuste em `int_order_items__metrics` beneficia ambas as fatos.
- Use *tags* para diferenciar fatos diários vs. em lote (`tags: ["fact", "transactions"]`).
