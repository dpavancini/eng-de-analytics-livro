# 16.4 Criando a primeira dimensão (Produtos)

Vamos construir o fluxo completo `source → staging → intermediate → dimensão` usando produtos como exemplo. A mesma lógica será repetida nas demais tabelas.

## Conectando fontes

O arquivo `models/staging/erp/_source_erp.yml` descreve cada tabela do catálogo `raw.erp_northwind`:

```yaml
version: 2

sources:
  - name: erp
    database: raw
    schema: erp_northwind
    tables:
      - name: products
        description: Catálogo de produtos da Northwind.
        columns:
          - name: id
            tests: [unique, not_null]
          - name: productname
            description: Nome exibido para clientes.
```

## Boas práticas em modelos `stg_`

- Uma CTE para leitura (`source_products`) e outra para renomear (`renamed`).
- Conversão de tipos e padronização de nomes.
- Nenhuma regra de negócio complexa.

```sql
with source_products as (
    select * from {{ source('erp', 'products') }}
),
renamed as (
    select
        cast(id as int) as product_pk,
        cast(productname as string) as product_name,
        cast(quantityperunit as string) as quantity_per_unit,
        cast(unitprice as numeric(18,2)) as unit_price,
        cast(unitsinstock as int) as units_in_stock,
        cast(unitsonorder as int) as units_on_order,
        cast(reorderlevel as int) as reorder_level,
        discontinued as is_discontinued,
        cast(categoryid as int) as category_fk,
        cast(supplierid as int) as supplier_fk
    from source_products
)
select * from renamed
```

Crie `stg_erp__categories.sql` e `stg_erp__suppliers.sql` seguindo o mesmo padrão (renomeando colunas e ajustando tipos).

## Modelo intermediário

O arquivo `models/intermediate/int_products__enriched.sql` une as três *staging* e prepara a dimensão:

```sql
with products as (select * from {{ ref('stg_erp__products') }}),
categories as (select * from {{ ref('stg_erp__categories') }}),
suppliers as (select * from {{ ref('stg_erp__suppliers') }}),
enriched as (
    select
        products.product_pk,
        products.product_name,
        categories.category_name,
        suppliers.supplier_name,
        suppliers.supplier_city,
        suppliers.supplier_country,
        products.quantity_per_unit,
        products.unit_price,
        products.units_in_stock,
        products.units_on_order,
        products.reorder_level,
        products.is_discontinued
    from products
    left join categories on products.category_fk = categories.category_pk
    left join suppliers on products.supplier_fk = suppliers.supplier_pk
)
select * from enriched
```

## Dimensão `dim_products`

Em `models/marts/dim_products.sql` basta selecionar do intermediário:

```sql
select * from {{ ref('int_products__enriched') }}
```

No arquivo `dim_products.yml`, documente colunas, marque `product_pk` com `tests: [unique, not_null]` e descreva o propósito da dimensão. Com isso concluímos a primeira passagem completa da DAG.
