# 4.1 Tipos de Bancos de Dados

Ao desenhar uma arquitetura de dados moderna, precisamos equilibrar desempenho, flexibilidade e custo. Não existe um único banco de dados que resolva todos os problemas. A seguir, um panorama dos tipos mais utilizados hoje, com foco nas aplicações que aparecem no dia a dia de um Engenheiro de Analytics. Muitos serviços em nuvem oferecem versões gerenciadas dessas tecnologias, o que agiliza experimentação e reduz o esforço operacional.

| Tipo de Banco de Dados | Características | Aplicações Comuns |
| :--- | :--- | :--- |
| **Relacional - SQL** | Estrutura dados em tabelas com colunas e linhas, utiliza chaves para garantir relacionamentos e exige esquema bem definido. Ótimo para transações e relatórios consistentes. | PostgreSQL, MySQL, SQL Server, Oracle Database, MariaDB |
| **Não Relacional - NoSQL** | Não seguem o modelo tabular tradicional. Oferecem esquemas flexíveis e escalam horizontalmente com facilidade. Abaixo, os principais subtipos. |  |
| **Documento (NoSQL)** | Guarda dados em documentos (JSON/BSON). Ideal para conteúdos semi-estruturados e APIs que evoluem com frequência. | MongoDB, Couchbase, Firebase Firestore, Amazon DocumentDB |
| **Chave-Valor (NoSQL)** | Estrutura mais simples: pares chave e valor. Excelente para *caching*, sessões e *feature stores* de baixa latência. | Redis, Amazon DynamoDB (modo key-value), Aerospike |
| **Colunar (NoSQL)** | Armazena colunas de forma independente, suportando consultas analíticas em larga escala e dados de séries temporais. | Apache Cassandra, Apache HBase, Google Bigtable, ClickHouse |
| **Grafo (NoSQL)** | Modela redes com nós (vértices) e conexões (arestas). Útil para recomendações, fraudes, roteamento e dependências complexas. | Neo4j, Amazon Neptune, ArangoDB, TigerGraph |

Na prática, as equipes modernas combinam mais de um tipo de banco em suas plataformas. Por exemplo: um sistema transacional utiliza um banco relacional, mas replica eventos para um banco de documentos e consolida métricas em um data warehouse colunar. O Engenheiro de Analytics precisa entender essas diferenças para escolher as fontes corretas e projetar integrações sustentáveis.

## Bancos SQL: OLTP x OLAP

Dentro do universo relacional, vale distinguir os bancos projetados para transações (*OLTP - Online Transaction Processing*) dos bancos voltados à análise (*OLAP - Online Analytical Processing*). Ambos usam SQL e estruturas tabulares, porém foram otimizados para demandas distintas:

| Aspecto | OLTP | OLAP |
| :--- | :--- | :--- |
| Objetivo principal | Registrar operações em tempo real com baixa latência | Agregar e analisar grandes volumes históricos |
| Padrão de carga | Muitas operações curtas de `INSERT`/`UPDATE`/`DELETE` | Consultas de leitura complexas, com `JOIN`, agregações e varredura de grandes tabelas |
| Modelagem típica | Normalização para evitar redundância e garantir integridade | Modelos dimensionais ou esquemas wide para simplificar consultas |
| Arquitetura | Voltada a escrita e concorrência; índices transacionais | Armazenamento colunar, compressão e *massively parallel processing* |

**Exemplos de OLTP:** PostgreSQL, MySQL, SQL Server, Oracle Database — sustentam aplicações como ERPs, e-commerces e sistemas bancários.

**Exemplos de OLAP:** DataBricks Snowflake, Google BigQuery, Amazon Redshift, Azure Synapse — suportam *dashboards*, análises ad-hoc e modelos preditivos construídos sobre o histórico completo.

Em arquiteturas modernas, é comum sincronizar dados do ambiente OLTP para um repositório OLAP por meio de pipelines de extração de dados. Assim, preservamos a performance das aplicações transacionais enquanto garantimos uma base robusta para analytics.

No capítulo {ref}`dw`, vamos explorar essas diferenças com mais detalhes.