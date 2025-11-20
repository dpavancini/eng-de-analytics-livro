# 16.3 Configurando o projeto e carregando as seeds

1. **Clone o repositório**
   ```bash
   git clone https://github.com/engdeanalytics/northwind.git
   cd northwind
   git checkout recursos
   ```
2. **Instale as dependências**
   ```bash
   pip install dbt-databricks
   dbt deps
   ```
3. **Configure o profile** (Databricks como exemplo):
   ```yaml
   northwind:
     target: dev
     outputs:
       dev:
         type: databricks
         host: adb-XXXX.azuredatabricks.net
         http_path: /sql/1.0/warehouses/<ID>
         token: dapiXXXXXXXXXXXXXXXX
         catalog: raw
         schema: erp_northwind
   ```
4. **Carregue as seeds** – elas populam o catálogo `raw.erp_northwind`.
   ```bash
   dbt seed --select erp_northwind
   ```

> As seeds já contemplam as tabelas `categories`, `products`, `customers`, `orders`, `orders_detail`, `employees`, `shippers` e `suppliers`. Ao final do comando confirme se o Databricks/Snowflake contém os dados brutos; são eles que alimentam nossos `sources`.
