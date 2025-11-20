# 16.10 Estruturando o `dbt_project.yml`

O `dbt_project.yml` consolida convenções de materialização, schemas e tags. Usaremos três camadas com schemas separados:

```yaml
name: dbt_northwind
version: 1.0.0
config-version: 2
profile: northwind

models:
  dbt_northwind:
    staging:
      +materialized: view
      +schema: stg
      +tags: ["stg"]

    intermediate:
      +materialized: view
      +schema: int
      +tags: ["int"]

    marts:
      +materialized: table
      +schema: marts
      +tags: ["marts"]
```

Recomendações adicionais:

- **Overrides por modelo**: use `{{ config(materialized='incremental', unique_key='order_item_sk') }}` nas fatos se quiser ganhos de performance.
- **Snapshots e seeds**: mantenha diretórios dedicados (`snapshots/`, `seeds/erp_northwind`) para facilitar o `dbt build`.
- **Nomes autoexplicativos**: `stg_erp__`, `int_`, `dim_`, `fct_` ajudam a leitura do DAG e a aplicação de filtros (`dbt run --select fct_*`).
