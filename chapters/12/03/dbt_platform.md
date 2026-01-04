(dbt_platform)=
# Capítulo 12.3 - Finalizando a configuração do ambiente no dbt Platform

Chegou a hora de conectar tudo o que você preparou nas seções anteriores. Aqui você criará o projeto no dbt, apontará para o Databricks e ligará o repositório do GitHub com o fork da Northwind.

1. **Acesse o dbt e abra o assistente**
   - Entre no [dbt](https://cloud.getdbt.com/).
   - Se for sua primeira vez, siga o fluxo guiado de criação de conta.
   - Caso já possua conta, clique no nome da sua conta (canto inferior esquerdo) → **Create new account** e escolha um nome para seu projeto.

2. **Escolha a plataforma de dados**
   - No passo “Choose a data platform”, selecione **Databricks**.
   - O dbt carregará o formulário de conexão específico para o **Databricks**.

3. **Preencha as credenciais do Databricks**
   - **Host**: utilize o _Server Hostname_ copiado na Seção 12.1 (equivalente ao domínio do seu workspace, sem `https://` nem `/`). Ex.: `adb-1234567890123456.17.azuredatabricks.net`.
   - **HTTP Path**: insira o caminho do `Serverless Starter Warehouse`, algo como `/sql/1.0/warehouses/<warehouse-id>`, obtido na mesma seção.
   - **Token**: cole o token `dbt-developer` criado anteriormente (o `dbt-production` ficará reservado para o ambiente de produção).
   - **Catalog**: defina `dev` para manter o isolamento do ambiente de desenvolvimento.
   - (Opcional) Ajuste o **Schema** para algo único, como `dbt_<seu_usuario>`, e evite conflitos com outros praticantes.
   - Clique em **Test Connection** e confirme que o dbt consegue acessar o Databricks.

4. **Conecte o repositório GitHub**
   - Em “Select a repository”, escolha **GitHub**.
   - Autorize o dbt a acessar sua conta seguindo o fluxo OAuth.
   - Selecione o fork criado na Seção 12.2 (`https://github.com/<seu-usuario>/<nome-repo>`) e a branch principal (geralmente `main`).
   - Defina um nome para o projeto e confirme.

5. **Finalize e execute um teste rápido**
   - Revise o resumo exibido pelo dbt e clique em **Create Project**. A mensagem “Your project is ready!” confirma que tudo foi conectado.
   - Abra o **Studio (IDE)** no menu lateral.
   - No terminal de comando rode `dbt run` para verificar se tudo executa de forma correta. (Terminal de comando é a barra inferior)

Ao concluir esta seção você terá o ambiente Databricks + GitHub + dbt pronto para desenvolver os modelos apresentados no Capítulo 16.
