(databricks)=
# Capítulo 12.1 - Configurando um Data Warehouse com Databricks

```{admonition} Atenção
Você precisará criar uma conta no [Databricks Free Edition](https://www.databricks.com/learn/free-edition) para essa parte do tutorial.

```{figure} ../../../assets/img/12_1_free_edition_databricks.png

Se você tiver interesse (e conhecimento) de simular um DW *on-premises*, pode configurar um banco de dados PostgreSQL em sua máquina local.
```

Ao criarmos a conta no Databricks Free Edition uma instância de 1 thread. Então é só ligarmos a instância e estará pronta para o uso. O pŕoximo passo é criarmos nossa credencial para poder utilizar em nossas ferramentas do {ref}`MDS<MDS>` como o [Hevo](https://hevodata.com/) e [dbt](https://www.getdbt.com/).

```{figure} ../../../assets/img/12_2_start_db_instance.png
:name: ativando_db

Ativando a Instância do Databricks
```

Para conectar dados de um database já existente no Databricks é necessário acessar __Catalog__ --> __Create Connection__.

```{figure} ../../../assets/img/12_3_create_connection.png
:name: criar_conexão_db

Acessando a criação de conexão
```

Preencha o nome da conexão (__Nothwind__) e selecione o tipo de conexão (no caso da Northwind usaremos o __PostgreSQL__) e avance para a proxima página

```{figure} ../../../assets/img/12_5_setup_connection_type.png
:name: configurar_tipo_conexao_db

Preenchendo o nome da conexão e selcionando o tipo de conexão
```

Um banco remoto da Northwind já está criado para uso neste livro, você pode realizar consultas neste banco via um cliente SQL como [Dbeaver](https://dbeaver.io/) e também pode utilizá-lo para extrair os dados nas etapas de ETL. As credenciais de acesso estão abaixo:

* **Host**: 35.239.223.162
* **Port**: 5432
* **User**: stitch_extract
* **Password**: etl_101_passwd
* **Database**: northwind

```{figure} ../../../assets/img/12_6_setup_authentication.png
:name: configurar_autenticacao_db

Preenchendo credenciais de conexão
```

Agora preenchemos os dados básicos para criar um Catalog no Databricks para termos acesso aos dados atraves dele, preenchendo o nome do Catalog, o Database que vamos conectar e testando a conexão.

```{figure} ../../../assets/img/12_7_setup_catalog_basics.png
:name: configurar_catalog_db

Configurando informações básicas para criação do Catalog
```

Se estiver desligado o warehouse precisamos iniciá-lo.

```{figure} ../../../assets/img/12_8_start_warehouse.png
:name: iniciar_warehouse_db

Inicia o server Warehouse
```

Precisamos testar a conexão com o database.

```{figure} ../../../assets/img/12_9_test_database_connection.png
```
```{figure} ../../../assets/img/12_10_test_database_connection.png
:name: testar_conexao_db

Testar conexão com o database
```

Agora é necessário permitir que os usuários tenham acesso ao database, por isso precisaremos usar o grant para adicionar as permissões necessárias.

```{figure} ../../../assets/img/12_11_grant_access.png
```
```{figure} ../../../assets/img/12_12_grant_access.png
:name: permitir_acessos_db

Permitir acessos para o database
```
```{admonition} Atenção
Como temos somente os nossos usuários do databricks podemos liberar acesso total, mas isso não é a melhor prática dentro de um projeto real.
```
```{figure} ../../../assets/img/12_13_grant_access.png
:name: confirmar_acessos_db

Confirma acessos para os usuários
```

É necessário criar uma tag para conseguirmos filtrar os catalogs.

```{figure} ../../../assets/img/12_14_create_metadata_tag.png
:name: criar_metadata_tag_db

Cria a tag para os metadados
```

Pronto! Você já tem um ambiente dbt Core configurado no Databricks e pode começar a desenvolver seus modelos de dados. A capacidade de processar dados em grande escala de forma segura, usando as melhores práticas de Engenharia de Dados, como variáveis de ambiente e versionamento com Git, garante um projeto robusto e escalável. E como o Databricks Free Edition não possui custos, ele é uma excelente plataforma para aprender e desenvolver projetos sem se preocupar com despesas inesperadas.

Caso o banco de dados fornecido não esteja disponível durante a execução deste tutorial, a alternativa recomendada é carregar as tabelas como seeds no dbt.