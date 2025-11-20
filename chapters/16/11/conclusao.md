# 16.11 Conclusão e próximos passos

Neste capítulo reproduzimos o fluxo completo do dbt usando a Northwind:

1. Entendemos o domínio e desenhamos o modelo estrela.
2. Exploramos a UI do dbt Cloud/Core e configuramos credenciais.
3. Carregamos as seeds e criamos camadas `stg`, `int` e `mart`.
4. Adicionamos testes genéricos, documentação e pacotes (`dbt_utils`).
5. Montamos dimensões, fatos, testes singulares e o `dbt_project.yml`.

Para aprofundar:

- Experimente materializações incrementais nas fatos.
- Configure *jobs* agendados no dbt Cloud ou no repositório Git (CI/CD).
- Explore pacotes adicionais (dbt_expectations, metrics, elementary) e exposures para conectar dashboards.

No Capítulo 17 repetiremos a mesma jornada com o Lakeflow Declarative Pipelines, comparando as diferenças de implementação dentro do ecossistema Databricks.
