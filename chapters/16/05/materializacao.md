# 16.5 Materializações

Materialização é a decisão mais “pragmática” que você toma no dbt: **como o resultado de um modelo vai existir no seu warehouse**. O mesmo `select ...` pode virar uma **view**, uma **tabela**, uma **tabela incremental** (atualizada aos poucos) ou até não virar objeto nenhum (caso **ephemeral**). Essa escolha muda diretamente:

- **Performance** de consultas downstream (painéis, análises, modelos seguintes).
- **Custo de execução** do pipeline (reprocessar tudo vs. processar só o que mudou).
- **Frescor do dado** (o quão “ao vivo” ele fica quando consultado).
- **Manutenção** (simplicidade vs. complexidade operacional).

## Como o dbt “cria” um modelo

Pense assim: um arquivo `.sql` em `models/` vira um *asset* no seu DAG. A materialização determina **qual objeto** o dbt vai criar (ou não criar) e **como** ele atualiza esse objeto a cada execução:

- `view`: cria/atualiza uma view com o SQL do modelo.
- `table`: recria a tabela inteira em cada `dbt run` (por padrão).
- `incremental`: cria a tabela uma vez e, nas próximas execuções, aplica apenas inserções/atualizações conforme a estratégia.
- `ephemeral`: não cria objeto; o dbt adiciona o SQL como CTE no modelo downstream.

## Tipos de materialização

### `view`

É a materialização mais simples e a default. Use quando o modelo:

- É **leve** (transformações simples, baixo volume).
- Precisa ficar **sempre atualizado** (a view reflete o estado atual das tabelas base).
- Serve como camada de **padronização** (renomear colunas, cast de tipos, limpeza mínima).

O custo aparece quando a transformação fica pesada: como a view é recalculada no momento da consulta, camadas downstream podem ficar lentas se dependem de muitas views encadeadas.

### `table`

Materializa o resultado em uma tabela física. É a escolha quando você quer:

- Consultas **rápidas e previsíveis** para consumo (BI/analytics).
- Um “ponto de estabilização” no DAG, reduzindo recomputações.
- Isolar transformações caras (agregações, joins grandes) para não reexecutar a cada consulta.

O trade-off é que, por padrão, o dbt vai **reconstruir a tabela inteira** a cada execução — ótimo para dados menores, ruim para fatos muito grandes.

### `incremental`

É uma tabela que o dbt atualiza aos poucos: em vez de recriar tudo, ele processa somente “o que entrou/alterou” desde a última execução. Em geral, você usa incremental quando:

- O modelo é **grande** e cresce com o tempo (fatos por dia, eventos, transações).
- Você precisa reduzir o tempo de execução e custo, mantendo uma boa frequência de atualização.

Incremental exige que você defina uma lógica confiável de carga (por exemplo, um `unique_key` e uma coluna de data/atualização). Dependendo do adaptador, o dbt pode suportar estratégias como `append`, `merge` e `delete+insert` (os nomes e o suporte variam por warehouse).

### `ephemeral`

Ephemeral não cria objeto no banco: o dbt compila o modelo como uma CTE dentro do SQL do modelo que o referencia. É útil quando:

- Você quer **reutilizar** um trecho de SQL pequeno, sem “poluir” o warehouse com objetos.
- O modelo é um passo intermediário simples e só existe para legibilidade.

O cuidado é não exagerar: muitos ephemerals podem gerar consultas enormes e difíceis de otimizar, além de esconder custos (parece barato porque “não materializa”, mas o trabalho acontece em runtime no modelo final).

### Outras considerações

Vale notar que o dbt também “materializa” outros tipos de recursos: **seeds** viram tabelas carregadas a partir de CSV, e **snapshots** geram tabelas de histórico (mudanças ao longo do tempo). Apesar de não serem models `.sql` comuns, eles seguem o mesmo princípio: decidir como e onde o resultado vai existir no warehouse.

## Boas práticas por camada (staging, intermediate e marts)

Uma convenção comum (e que usaremos no projeto) é diferenciar camadas por objetivo e escolher materializações coerentes com isso.

### Staging: normalmente `view`

Em *staging* nós “ajeitamos” o dado bruto: padronizamos nomes, tipos, chaves e pequenas limpezas. Em geral:

- Use `view` para manter a camada **leve e sempre atual**.
- Evite tabelas se o objetivo é só padronização (você paga para armazenar algo que poderia ser derivado facilmente).

### Intermediate: `view` por padrão, `table` quando vale a pena

Em *intermediate* ficam transformações que “costuram” o modelo analítico: joins, enriquecimentos e métricas intermediárias.

- Comece com `view` para iterar rápido.
- Promova para `table` quando o modelo é **caro** e é **reutilizado** por vários marts (isso evita recomputação em cascata).
- Modelos intermediários de fatos costumam ser `table` quando são pequenos/médios e `incremental` quando crescem muito e você quer atualizar frequentemente sem rebuild completo.

### Marts: normalmente `table`, e `incremental` para fatos grandes

Em *marts* vivem dimensões e fatos prontos para consumo.

- Dimensões (`dim_*`) costumam ser `table`: melhor performance e consumo estável.
- Fatos (`fct_*`) costumam ser `table` quando são pequenos/médios e `incremental` quando crescem muito e você quer atualizar frequentemente sem rebuild completo.

## Quando mudar de uma materialização para outra

Na prática, materialização é uma otimização guiada por sinais:

- **De `view` para `table`**: quando consultas downstream ficam lentas, o modelo virou “hub” do DAG (muito reaproveitado), ou o SQL ficou pesado (joins grandes, agregações). Materializar quebra a recomputação e estabiliza performance.
- **De `table` para `incremental`**: quando o rebuild completo ficou caro/lento e o dado tem um padrão claro de crescimento/atualização (por data, por chave única, por *updated_at*). Incremental reduz custo e tempo, mantendo o dataset completo.

## Aplicando no projeto (Northwind)

No dbt, você define a materialização com `materialized` via `{{ config(...) }}` dentro do próprio modelo ou de forma centralizada no `dbt_project.yml` (por pasta, com herança). Se você não configurar nada, o dbt usa **`view` como padrão** para models.

Para fins didáticos, aqui vamos focar em definir materializações **no próprio modelo**, usando o bloco `{{ config(...) }}`. Na seção seguinte veremos como aplicar as mesmas configurações via `dbt_project.yml` (e quando faz sentido centralizar).

Para os modelos que queremos manter como **views** (staging e intermediate), adicione o bloco abaixo no topo do arquivo:

```sql
{{
    config(
        materialized='view'
    )
}}
```
Para o modelo da camada **marts** (`dim_products.sql`), configure como **table**:

```sql
{{
    config(
        materialized='table'
    )
}}
```

Agora execute novamente o dbt com `dbt build` (ou `dbt run`), analise os logs e observe o que mudou. Em seguida, confira no Databricks (no seu schema de desenvolvimento) como os objetos foram criados. Quando você altera uma materialização, o dbt se encarrega de atualizar o tipo de objeto no *data warehouse/lakehouse*.

Importante: mesmo tendo adicionado explicitamente `materialized='view'` em *staging* e *intermediate*, isso não seria estritamente necessário aqui — o padrão do dbt já é materializar modelos como **view** quando nada é configurado.

Com isso, os modelos de *staging* (por exemplo, `models/staging/erp/stg_erp__categories.sql` e `models/staging/erp/stg_erp__products.sql`) ficam leves e fáceis de iterar. O modelo *intermediate* `models/intermediate/int_products__enriched.sql` também permanece como view, até o momento em que fizer sentido materializar por performance ou custo. Por fim, o modelo de *marts* `models/marts/dim_products.sql` vira uma tabela pronta para consumo.
