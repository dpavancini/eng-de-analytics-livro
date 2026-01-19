# 16.11 Deploy com dbt Platform

Até aqui você rodou o projeto no seu ambiente de desenvolvimento pelo Studio do dbt. O próximo passo é colocar o pipeline para rodar de forma automática em um ambiente controlado: o **deploy** no dbt Platform.

Um ponto fundamental: tudo o que você quer executar em produção precisa estar na branch `main` (ou seja, revisado e com *merge* feito). É essa branch que o dbt usará como “fonte de verdade” para publicar dados no ambiente produtivo e alimentar as ferramentas de consumo.

## Criando o environment `produção`

No dbt Platform, o *environment* define **para onde** o dbt vai publicar os modelos (catálogo + schema) e **como** ele vai se conectar (credenciais) ao *data warehouse/lakehouse*. Para criar:

1. Vá em **Orchestration** → **Environments** → **Create environment**.
2. Em **Name**, coloque `Produção`.
3. Em **Deployment type**, selecione **Production**. O **Environment type** já estará como **Deployment**.
4. Em **Connection**, escolha o Databricks.
5. Em **Catalog**, coloque `prod`.
6. Em **Token**, informe o seu token (você pode criar um novo se quiser separar credenciais por ambiente).
7. Em **Schema**, coloque `prod`. Esse será o *target schema* que o dbt usará nesse ambiente — assim como você já tem um schema de desenvolvimento (por exemplo, `dbt_<nome_do_developer>`).

Com isso, o dbt Platform consegue se conectar ao Databricks usando o token e publicar os modelos no schema `prod`.

## Criando o job de deployment: `Job Diário`

Com o environment criado, o próximo passo é automatizar a execução:

1. Vá em **Orchestration** → **Jobs** → **Create job** → **Deploy job**.
2. Em **Job name**, coloque `Job Diário`.
3. Em **Environment**, selecione `Produção`.
4. Em **Commands**, use apenas:

```bash
dbt build
```

Não vamos configurar agendamento aqui porque é apenas uma demonstração. É em **Schedule** que você define quando e como esse job deve iniciar (por exemplo, diariamente em um horário fixo).

O comando `dbt build` é uma escolha prática para jobs de produção porque executa, em sequência:

- `dbt run` (materializa os modelos)
- `dbt test` (roda os testes)
- `dbt seed` (quando aplicável, se estiver no fluxo)
- `dbt snapshot` (quando aplicável, se estiver no fluxo)

Depois de criar o job, execute-o uma vez. Observe como os passos são executados e faça o *debug* caso algo falhe (conexão, permissões, SQL, testes etc.).

Ao final, confira no Databricks como os modelos foram materializados a partir da branch `main`. Repare como a separação por *catalog/schema* ajuda a distinguir claramente desenvolvimento e produção.
