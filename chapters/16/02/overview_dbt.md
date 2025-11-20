# 16.2 Panorama do dbt Cloud/Core (com foco em controle de versão)

O dbt trata transformações SQL como código versionado. Usando a CLI (*dbt Core*) ou o [dbt Cloud](https://www.getdbt.com/product/dbt-cloud/), o fluxo saudável começa no Git: branches pequenas, *pull requests* com testes e documentação, e automação via CI/CD.

## Interface e controle de versão

- **dbt Cloud IDE**: editor no navegador com DAG, terminal integrado e execução por ambiente (dev/prod). Cada projeto aponta para um repositório Git (GitHub, GitLab, Bitbucket).
- **Git como fonte de verdade**: todo ajuste nasce em uma branch e passa por PR. No Cloud, ao clicar em Run o IDE sugere criar/atualizar o commit na branch atual; a revisão acontece no provedor Git.
- **Commits pequenos e rastreáveis**: mantenha mudanças atômicas (modelo + schema.yml + teste + docs). Opcionalmente use _conventional commits_.
- **Artefatos**: cada execução gera `manifest.json` e `run_results.json`. Eles alimentam catálogos e monitoria (por ex.: Elementary, dbt-artifacts) e habilitam o “slim CI”.

### Fluxo típico no dbt Cloud IDE
1. Crie uma branch (`feature/dim-products`).
2. Edite modelos, `schema.yml` e docs.
3. Rode seleções específicas (veja abaixo). Ajuste até passar localmente/IDE.
4. Gere o commit a partir do IDE e abra o PR no Git.
5. CI executa `dbt build` no PR. Só faça merge após todos os testes.

## Executando e selecionando modelos

Selecione por nome, caminho, macros de seleção e tags:

```bash
# Execução básica
dbt run --select dim_products
dbt test --select source:erp stg_erp__orders+
dbt build --select fct_*+

# Seletores úteis
dbt build --select state:modified+   # modelos alterados e dependentes (slim CI)
dbt build --select tag:mart          # todos os modelos marcados com tag "mart"
```

No dbt Cloud, os mesmos filtros aparecem no painel lateral; em *Jobs*, configure steps (ex.: `dbt seed`, `dbt run`, `dbt test`) e agendamentos.

## Ambientes e credenciais

- **dbt Cloud**: configure o adapter (Databricks, Snowflake, BigQuery etc.), catálogo e schema por ambiente (dev/qa/prod). Cada environment tem variáveis e permissões próprias.
- **dbt Core**: use `~/.dbt/profiles.yml`. Exemplo (Databricks):

```yaml
northwind:
  target: dev
  outputs:
    dev:
      type: databricks
      host: adb-XXXX.azuredatabricks.net
      http_path: /sql/1.0/warehouses/abc
      token: dapiXXXXXXXX
      catalog: dev
      schema: stg
      threads: 4
```

Recomendações:
- Separe schemas por camada (`stg`, `int`, `marts`) no `dbt_project.yml`.
- Nunca versione segredos; use variáveis/Secrets no Cloud ou gerenciadores externos.

## CI/CD com foco em controle de versão

### dbt Cloud (Jobs com gatilho Git)
- Crie um Job “PR Build” com steps: `dbt deps` → `dbt build --select state:modified+ --defer --state <artefatos-prod>`.
- Configure o gatilho “On Pull Request” para executar em toda abertura/atualização de PR.
- Use _defer_ para comparar com o estado de produção (compila dependências não alteradas contra prod).

### GitHub Actions (exemplo Slim CI)

```yaml
name: dbt CI
on:
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      - run: pip install dbt-databricks
      - run: dbt deps
      # Baixe os artefatos de produção (manifest/run_results) para ./state antes
      - name: Build only modified
        run: dbt build --select state:modified+ --defer --state ./state
```

Notas:
- Para _slim CI_ funcionar, disponibilize o `manifest.json` de produção como artefato de pipeline (Cloud ou Actions).
- Exija que `dbt build` passe no PR antes do merge.

## Documentação e DAG

- Gere catálogo e linhagem com `dbt docs generate` e visualize com `dbt docs serve` (ou publique no dbt Cloud).
- Mantenha descrições atualizadas em `schema.yml` e use _docs blocks_ para contexto de negócio.

## Dicas práticas (controle de versão)
- Commits pequenos e fáceis de reverter.
- PRs com testes e documentação próximos à alteração “na esquerda da DAG”.
- Use _selectors_ para rodar apenas o necessário; economiza tempo e custo.
