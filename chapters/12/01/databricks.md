(databricks)=
# Capítulo 12.1 - Configurando um Data Warehouse com Databricks

```{admonition} Atenção
Você precisará criar uma conta no [Databricks](https://www.databricks.com/learn/free-edition) para essa parte do tutorial. O Databricks oferece uma edição gratuita para experimentar as principais funcionalidades da plataforma, suficiente para o que será apresentado neste livro.
```

Nos próximos passos você vai deixar o ambiente pronto para ser usado com o dbt na Seção 12.3. Mantenha esta página aberta para ir marcando o checklist.

1. **Crie a conta**
   - Cadastre-se no Free Edition.
   - Assim que o workspace for criado você terá acesso ao _Serverless Starter Warehouse_. Esse warehouse será suficiente para todas as demonstrações deste capítulo.

2. **Organize os catálogos**
   - No menu lateral selecione **Catalog**.
   - Crie três catálogos: `raw`, `dev` e `prod`.
   - A regra é simples: `raw` para dados brutos, `dev` para desenvolvimento e `prod` para produção, garantindo isolamento entre ambientes.

3. **Gere os Access Tokens para o dbt**
   - No canto superior direito clique no ícone do usuário → **Settings** → **Developer**.
   - Em **Access Tokens**, selecione **Manage** e crie um token: `dbt-developer`.
   - Copie o token e guarde em um local seguro; ele não será exibido novamente. Caso perca, basta gerar um novo.

4. **Recupere os dados de conexão do warehouse**
   - No menu lateral clique em **Compute** e abra o `Serverless Starter Warehouse`.
   - Acesse a aba **Connection details** e copie o **Server Hostname** e o **HTTP Path**. Esses valores serão usados pelo dbt para enviar as queries SQL ao Databricks.

Depois de concluir essas etapas você já terá todos os insumos necessários do Databricks para configurar o dbt na Seção 12.3.
