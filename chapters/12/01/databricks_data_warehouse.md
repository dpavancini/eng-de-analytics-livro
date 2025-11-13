(databricks)=
# Capítulo 12.1 - Configurando um Data Warehouse com Databricks

```{admonition} Atenção
Você precisará criar uma conta no [Databricks Free Edition](https://www.databricks.com/learn/free-edition) para essa parte do tutorial.

```{figure} ../../../assets/img/12_1_free_edition_databricks.png

Se você tiver interesse (e conhecimento) de simular um DW on‑premises, pode configurar um banco de dados PostgreSQL em sua máquina local.
```

Ao criar a conta no Free Edition, você terá um warehouse básico (1 thread). Ligue o warehouse e ele estará pronto para uso. O próximo passo é criar credenciais para uso em ferramentas do {ref}`MDS<MDS>` como o [dbt](https://www.getdbt.com/) e conectores de ingestão.

```{figure} ../../../assets/img/12_2_start_db_instance.png
:name: ativando_db

Ativando a Instância do Databricks
```

Para conectar dados de um banco já existente (neste exemplo, PostgreSQL com Northwind), acesse Catalog → Create Connection.

```{figure} ../../../assets/img/12_3_create_connection.png
:name: criar_conexão_db

Acessando a criação de conexão
```

Preencha o nome da conexão (Northwind) e selecione o tipo de conexão (PostgreSQL). Avance para a próxima página.

```{figure} ../../../assets/img/12_5_setup_connection_type.png
:name: configurar_tipo_conexao_db

Preenchendo o nome da conexão e selecionando o tipo de conexão
```

Um banco remoto da Northwind já está criado para uso neste livro. Você pode consultá‑lo via um cliente SQL como [DBeaver](https://dbeaver.io/) e também utilizá‑lo para extrair dados nas etapas de ingestão/ELT. As credenciais de acesso estão abaixo (uso didático):

* **Host**: 35.239.223.162
* **Port**: 5432
* **User**: stitch_extract
* **Password**: etl_101_passwd
* **Database**: northwind

```{figure} ../../../assets/img/12_6_setup_authentication.png
:name: configurar_autenticacao_db

Preenchendo credenciais de conexão
```

Agora preencha os dados básicos para criar um Catalog no Databricks (Unity Catalog) e ter acesso aos dados pela conexão: informe o nome do Catalog, selecione o Database a conectar e teste a conexão.

```{figure} ../../../assets/img/12_7_setup_catalog_basics.png
:name: configurar_catalog_db

Configurando informações básicas para criação do Catalog
```

Se o warehouse estiver desligado, inicie‑o.

```{figure} ../../../assets/img/12_8_start_warehouse.png
:name: iniciar_warehouse_db

Inicia o server Warehouse
```

Teste a conexão com o database.

```{figure} ../../../assets/img/12_9_test_database_connection.png
```
```{figure} ../../../assets/img/12_10_test_database_connection.png
:name: testar_conexao_db

Testar conexão com o database
```

Agora é necessário permitir que usuários tenham acesso ao database. Use GRANTs para adicionar as permissões necessárias (princípio do menor privilégio).

```{figure} ../../../assets/img/12_11_grant_access.png
```
```{figure} ../../../assets/img/12_12_grant_access.png
:name: permitir_acessos_db

Permitir acessos para o database
```
```{admonition} Atenção
Como aqui usamos apenas usuários do ambiente de exemplo, é possível liberar acesso amplo. Em projetos reais, aplique papéis (Unity Catalog), segredos e políticas de acesso com granularidade.
```
```{figure} ../../../assets/img/12_13_grant_access.png
:name: confirmar_acessos_db

Confirma acessos para os usuários
```

Crie uma tag para facilitar o filtro e a alocação de custos por catálogo/projeto.

```{figure} ../../../assets/img/12_14_create_metadata_tag.png
:name: criar_metadata_tag_db

Cria a tag para os metadados
```

Pronto! Você já tem um ambiente dbt Core configurado no Databricks e pode começar a desenvolver seus modelos de dados. A capacidade de processar dados em grande escala de forma segura, usando as melhores práticas de Engenharia de Dados, como variáveis de ambiente e versionamento com Git, garante um projeto robusto e escalável. E como o Databricks Free Edition não possui custos, ele é uma excelente plataforma para aprender e desenvolver projetos sem se preocupar com despesas inesperadas.

Caso o banco de dados fornecido não esteja disponível durante a execução deste tutorial, a alternativa recomendada é carregar as tabelas como seeds no dbt.