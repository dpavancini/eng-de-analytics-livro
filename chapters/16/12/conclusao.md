# 16.12 Conclusão e próximos passos

Neste capítulo percorremos um fluxo completo de construção de *analytics* com dbt usando a Northwind como laboratório:

1. Estruturamos o projeto em camadas (`staging`, `intermediate`, `marts`) e entendemos como isso melhora reuso e testabilidade.
2. Rodamos os comandos essenciais (`run`, `test`, `build`) e carregamos os dados via *seeds*.
3. Criamos dimensões e fatos, separando regras de cálculo na camada `intermediate` e “publicando” no mart.
4. Aplicamos testes genéricos e documentação para transformar o pipeline em um contrato do dado.
5. Usamos pacotes (como `dbt_utils`) para acelerar padrões recorrentes (macros e testes).
6. Validamos métricas com testes singulares e organizamos configurações com o `dbt_project.yml`.
7. Estruturamos um deploy no dbt Platform com *environments* e *jobs*.

Para aprofundar:

- Experimente materializações incrementais em fatos grandes e compare tempo/custo de execução.
- Configure *jobs* agendados no dbt Platform por meio de *environments* do tipo deployment.
- Explore pacotes adicionais (por exemplo, `dbt_expectations`, `elementary`) e *exposures* para conectar dashboards à linhagem.

No Capítulo 17 repetiremos a mesma jornada com o Lakeflow Declarative Pipelines, comparando as diferenças de implementação dentro do ecossistema Databricks.
