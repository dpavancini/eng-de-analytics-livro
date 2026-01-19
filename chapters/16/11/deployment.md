# 16.12 Deploy com dbt Platform

Até aqui você rodou o projeto localmente no seu ambiente de desenvolvimento através do *IDE* do dbt. O próximo passo é colocar o pipeline para rodar de forma automática em um ambiente controlado: **um deploy** no dbt Platform. Lembrem-se que todas os seus desenvolvimentos precisam ter sido publicadas (feito o merge) para a branch `main`. Essa será a branch de produção que escreverá os dados no ambiente produtivo para as ferramentas de consumo.

## Criando o environment `produção`

No dbt Platform, o *environment* é onde você define **para onde** o dbt vai publicar os modelos (catálogo + schema) e **como** ele vai se conectar (credenciais) com o data warehouse. Para criar:

1. Vá em **Orchestration** → **Environments** → **Create environment**.
2. Em **Name**, coloque `Produção`.
3. Em **Deployment type**, selecione **Production**. O **Environment type** já estará como **Deployment**.
4. Em **Connection** escolha o Databricks.
5. Em **Catalog**, coloque `prod`.
6. Em **Token**, coloque o seu token. Você pode criar um novo se desejar para o environment.
5. Em **Schema**, coloque `prod` esse vai ser o target schema que o dbt vai utilizar para esse ambiente, assim como você tem o seu que é dbt_<nome do developer>.

Com isso, o dbt Platform consegue se conectar ao Databricks usando o token e publicar os modelos no schema `prod`.

## Criando o job de deployment: `Job Diário`

Com o environment criado, o próximo passo é automatizar a execução:

1. Vá em **Orchestration** → **Jobs** → **Create job** → **Deploy job**.
2. Em **Job name**, coloque `Job Diário`.
3. Em **Environment**, selecione `produção`.
4. Em **Commands**, use apenas:

```bash
dbt build
```

Não vamos por um intervalo de tempo para o job rodar porque isso é so uma demostração, mas é em **Schedule**, que voce tem diversas opções para escolher como esse job deve ser iniciado.

O comando `dbt build` é uma escolha prática para jobs de produção porque executa, em sequência:

- `dbt run` (materializa os modelos)
- `dbt test` (roda os testes)
- `dbt seed` (quando aplicável, se estiver no fluxo)
- `dbt snapshot` (quando aplicável, se estiver no fluxo)

Após o job ser criado execute ele uma única vez. Observe como os passoes são executados. Após o job ser executado com sucesso (debug caso houver problemas) vá no databricks e olhe como os modelos foram materializados com sucesso a partir da branch main. Perceba a separação dos ambientes dentro do databricks.
