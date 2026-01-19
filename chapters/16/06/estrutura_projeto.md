# 16.6 Configurações de Projeto

O `dbt_project.yml` é o arquivo central de configuração de um projeto dbt. É por ele que o dbt identifica o projeto, define metadados (como `name`, `version` e `profile`) e aplica configurações **globalmente**. Tudo o que você declara aqui vira regra padrão do projeto e pode ser **herdado** por diretórios e modelos, evitando repetição de `{{ config(...) }}` em dezenas de arquivos.

Além de metadados, é nele que você configura (por projeto, pasta ou até por modelo) comportamentos como:

- **Models**: materialização (`view`, `table`, `incremental`), `schema`/`database`, `tags`, `enabled`, entre outros.
- **Tests**: severidade/padrões de testes (`warn`/`error`), onde armazenar falhas (`store_failures`) e configurações aplicadas por pasta.
- **Sources**: padrões para fontes (por exemplo, `loaded_at_field`, *freshness*, `tags`) e configurações por grupo de fontes.

Uma prática importante é usar a **estrutura de pastas** dentro de `models/` para agrupar configurações. Como o YAML é hierárquico, configurações definidas para uma pasta (por exemplo, `staging/`) valem para todos os modelos ali dentro e podem ser sobrescritas em níveis mais específicos (subpastas) ou em um modelo individual. Isso mantém o projeto consistente e transforma o `dbt_project.yml` em um “ponto único de verdade” para as convenções do time.

```yaml
models:
  dbt_northwind:
    intermediate:
      +materialized: view
      +schema: int

    marts:
      +materialized: table
      +schema: marts

    staging:
      +materialized: view
      +schema: stg
      erp:
```
O `+` na frente de algumas chaves é uma convenção do dbt no `dbt_project.yml` para indicar “isto é uma **config**”. Em seções como `models:`, o YAML é hierárquico: chaves **sem** `+` são interpretadas como nomes de pastas/subpastas (ou modelos) dentro de `models/`, enquanto chaves **com** `+` são tratadas como configurações equivalentes ao que você escreveria com `{{ config(...) }}` (por exemplo, `+materialized`, `+schema`, `+tags`, `+enabled`). Isso evita ambiguidade e deixa claro o que é **estrutura do projeto** (pastas) versus o que é **configuração** aplicada naquele nível.

Agora execute novamente o dbt com `dbt build` (ou `dbt run`), analise os logs e observe o que mudou. Em seguida, confira no Databricks (no seu schema de desenvolvimento) como os objetos foram criados. Perceba que, ao definir `schema` por pasta, as camadas de transformação também ficam separadas por schema no Databricks.

## `dbt_project.yml` vs `{{ config(...) }}`: onde colocar cada configuração

Na seção anterior (16.5, `materializacao.md`), nós colocamos `{{ config(materialized=...) }}` dentro de **cada modelo** principalmente por um motivo didático: era a forma mais direta de enxergar “o que o dbt faz” quando você muda a materialização. Em um projeto real, porém, repetir configuração em dezenas de arquivos tende a gerar:

- **inconsistência** (alguém esquece de configurar um modelo novo),
- **drift** (o time muda um padrão e precisa editar muitos arquivos),
- e **baixa legibilidade** (muito boilerplate no topo de cada `.sql`).

A regra prática mais eficiente costuma ser:

- **Padrões por pasta no `dbt_project.yml`** (o padrão do time).
- **Exceções por modelo via `{{ config(...) }}`** (ajustes pontuais onde faz sentido).

### Quando configurar no `dbt_project.yml`

Use o `dbt_project.yml` quando a configuração:

- Vale para **uma camada inteira** (ex.: `staging/`, `intermediate/`, `marts/`) ou para uma **subpasta**.
- É um **padrão estável** do time (materialização padrão, schema padrão, tags por domínio, etc.).
- Precisa ser **fácil de manter e auditar** em um único lugar.

Exemplo: definir materialização e schema por camada/pasta (como no trecho acima) evita repetir `materialized` e `schema` em cada modelo e deixa claro o “contrato” de cada diretório.

### Quando configurar dentro do modelo (`{{ config(...) }}`)

Use `{{ config(...) }}` dentro do modelo quando a configuração:

- É uma **exceção real**, aplicada a **um modelo específico** (ou a pouquíssimos).
- Depende de uma **decisão pontual de performance/custo** (otimização guiada pelo uso real).
- É algo “inerente” ao modelo, como parâmetros de incremental (ex.: `unique_key`, estratégia) ou outras configs específicas do adaptador.

Um exemplo comum: você mantém `marts/` como `table` por padrão no `dbt_project.yml`, mas quando um fato cresce demais, um próximo passo é sobrescrever **um modelo específico** para `incremental`. Por exemplo, se `fct_transactions` ficar muito grande, você pode ajustar apenas esse modelo:

```sql
{{
    config(
        materialized='incremental',
        unique_key='order_item_sk',
    )
}}

select ...
```

Essa combinação de “padrões por pasta” (no `dbt_project.yml`) com “exceções por modelo” (via `config`) é uma das formas mais eficientes de manter o projeto consistente e, ao mesmo tempo, otimizar pontos críticos conforme o uso real aparece.

## Recap

- Use o `dbt_project.yml` como “fonte única de verdade” para padrões por camada/pasta (materialização, schema, tags e convenções).
- Use `{{ config(...) }}` apenas quando houver uma exceção clara (por exemplo, um fato que precise virar `incremental`).
- Prefira consistência e previsibilidade: isso reduz *drift* e facilita manutenção, revisão de código e depuração.
