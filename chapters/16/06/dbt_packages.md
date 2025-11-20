# 16.6 Aproveitando pacotes do dbt

Pacotes são bibliotecas reutilizáveis de macros, modelos e testes. Eles ficam definidos em `packages.yml` e são baixados via `dbt deps`.

## Instalando o `dbt_utils`

```yaml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.0.0", "<2.0.0"]
```

```bash
dbt deps
```

## Exemplo: teste de combinação única

Queremos garantir que `orders_detail` não possua linhas duplicadas por `(orderid, productid)`. Em `models/staging/erp/_source_erp.yml` adicionamos:

```yaml
sources:
  - name: erp
    tables:
      - name: orders_detail
        tests:
          - dbt_utils.unique_combination_of_columns:
              combination_of_columns:
                - orderid
                - productid
```

O `dbt_utils` compila o teste para SQL e acusa falhas caso o par apareça mais de uma vez. Pacotes também trazem macros úteis (`generate_surrogate_key`, `get_query_results_as_dict`, etc.) que evitam código repetido nas camadas intermediárias.
