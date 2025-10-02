# 4.1 Tipos de Bancos de Dados

Embora existam muitos tipos de Bancos de Dados criados ao longo dos anos, atualmente apenas um punhado são utilizados massivamente nas organizações:

| Tipo de Banco de Dados | Características | Aplicações Comuns |
| :--- | :--- | :--- |
| **Relacional - SQL** | Organiza dados em tabelas com colunas e linhas. Usa chaves para estabelecer **relacionamentos** entre as tabelas e exige um **esquema fixo** e predefinido. Ideal para dados estruturados. | MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database, SQLite |
| **Não Relacional - NoSQL** | Não seguem o modelo de tabelas e relacionamentos. São mais flexíveis, com **esquemas dinâmicos**, e escalam horizontalmente. Ideais para dados voláteis ou de grande volume. | (Subdivididos abaixo) |
| **Documento (NoSQL)** | Armazena dados em **documentos** (geralmente em formato JSON ou BSON). Oferece alta flexibilidade e é ótimo para catálogos de produtos, sistemas de gerenciamento de conteúdo e aplicações móveis. | MongoDB, CouchDB, Couchbase, Amazon DynamoDB |
| **Chave-Valor (NoSQL)** | O modelo mais simples, armazenando dados como um dicionário, onde cada item tem uma **chave única** e um valor associado. É extremamente rápido e escalável para operações simples. | Redis, Memcached, Riak, Amazon DynamoDB |
| **Coluna (NoSQL)** | Organiza os dados em colunas em vez de linhas. É ideal para **armazenar e consultar grandes volumes de dados de forma massiva**, como em Big Data e análise de dados. | Apache Cassandra, Apache HBase, Google Bigtable |
| **Grafo (NoSQL)** | Representa os dados em uma rede de **nós (vértices)** e **conexões (arestas)**. É ideal para dados altamente interconectados, como redes sociais, modelos de recomendação e detecção de fraudes. | Neo4j, ArangoDB, Amazon Neptune, OrientDB |