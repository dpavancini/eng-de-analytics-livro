# Capítulo 17 - Implementando com Lakeflow Declarative Pipelines

O Databricks Lakehouse evoluiu suas capacidades de transformação com o **Lakeflow Declarative Pipelines**. Neste capítulo repetiremos a modelagem feita no Capítulo 16, mas agora usando os recursos nativos do Databricks para orquestrar SQL e notebooks de maneira declarativa, mantendo as mesmas camadas (`stg`, `int`, `fct/dim`) e os princípios de DataOps estabelecidos anteriormente.

Você conhecerá o ciclo completo:

- Definição de *pipelines* declarativos com Lakeflow, descrevendo dependências entre tarefas SQL/Delta Live Tables.
- Configuração de ambientes (dev/qa/prod) usando *clusters* serverless e catálogos isolados.
- Inclusão de testes de qualidade, *monitoring* e *quality gates* nativos do Databricks.
- Integração com Git e Repos para versionamento do pipeline.

Assim como no capítulo anterior, a proposta é oferecer um guia prático inicial. Ajuste os exemplos à realidade do seu workspace conforme avançar.
