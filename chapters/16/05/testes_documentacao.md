# 16.5 Adicionando testes e documentação

Testes e documentação vivem lado a lado nos arquivos `schema.yml`. Eles funcionam como contratos que protegem o pipeline.

## Testes genéricos

- **Fontes**: valide chaves naturais assim que os dados chegam (`unique`, `not_null`, `relationships`).
- **Staging/intermediate**: garanta que as transformações não geram duplicidades.
- **Marts**: todas as dimensões devem ter chaves únicas; fatos devem testar colunas de relacionamento.

```yaml
version: 2

models:
  - name: dim_products
    description: Dimensão de produtos da Northwind.
    columns:
      - name: product_pk
        tests:
          - unique
          - not_null
      - name: supplier_name
        description: Nome da empresa fornecedora.

sources:
  - name: erp
    tables:
      - name: orders_detail
        tests:
          - dbt_utils.unique_combination_of_columns:
              combination_of_columns: [orderid, productid]
```

## Documentação (`docs blocks`)

Comente os modelos usando blocos `docs` para reutilizar descrições:

```sql
{{ docs("dim_products_context") }}

select * from {{ ref('int_products__enriched') }}
```

```markdown
{% docs dim_products_context %}
A `dim_products` agrega atributos do catálogo, fornecedores e categorias. Ela é usada pelos dashboards de vendas e estoque.
{% enddocs %}
```

## Boas práticas

1. **Teste o quanto antes**: quanto mais à esquerda na DAG, mais cedo você pega inconsistências.
2. **Chaves únicas e não nulas**: toda dimensão ou fato precisa garantir integridade das chaves `*_pk` e `*_fk`.
3. **Documentação viva**: rode `dbt docs generate && dbt docs serve` após cada merge para atualizar o catálogo.
