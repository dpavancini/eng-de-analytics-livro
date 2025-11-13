(databricks_dbt)=
# Capítulo 12.2 - Como configurar o ambiente dbt Core para Databricks

Este guia mostra como configurar o dbt Core para se conectar ao Databricks.

## 1. Instale o dbt Core e o adaptador Databricks

Recomendado: use um ambiente virtual (venv/conda/pipx). No terminal, execute:
```
pip install dbt-databricks
```

## 2. Inicialize um projeto dbt

No diretório desejado, execute:
```
dbt init nome_do_projeto
```

## 3. Como encontrar as credenciais no Databricks

Para obter as credenciais necessárias para configurar o `profiles.yml`, siga os passos abaixo:

1. No menu lateral do Databricks, clique em **SQL Warehouses**.
2. Selecione o **Serverless Starter Warehouse**.

```{figure} ../../../assets/img/12_15_sql_warehouses.png
:name: sql_warehouses
Acesse "SQL Warehouses" no menu lateral
```

3. Clique em **Connection details**, selecione a aba **dbt** e clique em **Generate New Token** para gerar um novo token de acesso.

```{figure} ../../../assets/img/12_16_dbt_generate_token.png
:name: dbt_generate_token
Selecione "dbt" e clique em "Generate New Token"
```

Copie o **Host**, **HTTP Path** e o **Token** gerados para usar na configuração do seu `profiles.yml`.

## 4. Configure o arquivo `profiles.yml`

O arquivo `profiles.yml` geralmente fica em `C:\Users\SEU_USUARIO\.dbt\profiles.yml` no Windows.

Exemplo de configuração para Databricks (use variáveis de ambiente para segredos):

```yaml
default:
  target: dev
  outputs:
    dev:
      type: databricks
      schema: default
      host: <HOST_COPIADO>
      http_path: <HTTP_PATH_COPIADO>
      token: <TOKEN_COPIADO>
```

> **Atenção:** Nunca compartilhe seu token de acesso publicamente.

## 5. Teste a conexão

No terminal, execute:
```
dbt debug
```

## 6. Execute seus modelos dbt

Para rodar os modelos:
```
dbt run
```

## Referências

- [Documentação oficial do dbt](https://docs.getdbt.com/docs/core)
- [Documentação do dbt-databricks](https://docs.databricks.com/en/integrations/dbt/index.html)