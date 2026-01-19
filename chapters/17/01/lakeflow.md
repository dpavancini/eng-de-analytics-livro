# 17.1 Reproduzindo as camadas com Lakeflow

Lakeflow Declarative Pipelines permitem que você descreva as transformações como um grafo de dependências. Cada tarefa pode rodar SQL, Delta Live Tables ou notebooks PySpark, com gerenciamento automático de orquestração, *retry* e monitoramento. A seguir resumimos como replicar o laboratório da Northwind nessa abordagem.

## 1. Configurar o pipeline

1. Acesse **Lakeflow → Pipelines → Create pipeline**.
2. Escolha o catálogo/`schema` alvo (por exemplo, `dev.northwind`).
3. Conecte o repositório Git com o projeto (o mesmo código usado no capítulo 16 pode ser referenciado via Repos).
4. Defina o modo de execução (**Triggered** para cargas agendadas ou **Continuous** para *streaming*).

## 2. Descrever camadas declarativas

Um único arquivo YAML (ex.: `pipeline.yml`) pode registrar as tarefas:

```yaml
targets:
  source_schema: raw.erp_northwind
  staging_schema: dev.stg
  mart_schema: dev.marts

tasks:
  - name: stg_orders
    type: sql
    file: models/staging/erp/stg_erp__orders.sql

  - name: int_orders_metrics
    type: sql
    file: models/intermediate/int_orders__metrics.sql
    depends_on: [stg_orders, stg_order_items]

  - name: fct_transactions
    type: sql
    file: models/marts/fct_transactions.sql
    depends_on: [int_order_items_metrics]
```

> Adapte a sintaxe ao padrão vigente do Lakeflow; o exemplo acima resume a ideia de declarar dependências, esquemas e materializações.

## 3. Aplicar testes e qualidade

- Use **Expectations** do Delta Live Tables/Lakeflow para garantir unicidade, nulos e relacionamentos.
- Configure *Quality Gates* para bloquear a publicação caso um teste falhe.
- Capture métricas de execução no painel do Lakeflow e envie alertas para Slack/Teams.

## 4. Operar com DataOps

- Versões do pipeline ficam atreladas ao commit Git; cada deploy referencia um SHA específico.
- Utilize ambientes diferentes duplicando o pipeline e apontando para catálogos distintos (`dev`, `qa`, `prod`).
- Combine Lakeflow com Jobs ou Workflows do Databricks para acionar pipelines em sequência e publicar dashboards no Databricks SQL.

## 5. Comparação com o capítulo 16

- **Camadas**: a mesma divisão `stg` → `int` → `fct/dim` é preservada; Lakeflow apenas substitui o dbt na orquestração.
- **Testes**: Lakeflow usa Expectations em vez de `dbt test`, mas os contratos continuam iguais.
- **Documentação/Linhagem**: o catálogo Unity Catalog + Lakeflow Monitoring fornece lineage automático; você ainda pode manter documentação no repositório Git.

Com isso você consegue oferecer às equipes duas opções coerentes: dbt (Capítulo 16) ou Lakeflow (este capítulo). Escolha a ferramenta que melhor se encaixa no stack da sua organização mantendo os mesmos princípios conceituais.
