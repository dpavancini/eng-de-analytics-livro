# 2.2 Volume

Dados surgem a cada clique, transação ou interação digital. Para o Engenheiro de Analytics, o problema raramente é “não ter dados”, e sim priorizar o que merece virar produto analítico. Ambientes na nuvem tornaram o armazenamento barato, porém trouxeram novos dilemas: manter custos previsíveis, definir camadas de historização e projetar modelos que continuem performando à medida que os volumes crescem.

O maior crescimento está nos dados não estruturados — vídeos, áudios, texto livre —, mas as decisões de negócio do dia a dia ainda dependem majoritariamente de dados estruturados. Eles estão em CRMs, ERPs, planilhas e sistemas transacionais, acessados via bancos de dados relacionais ou APIs SaaS. Dominar como esses dados são modelados, versionados e extraídos é o ponto de partida para qualquer iniciativa analítica relevante.

## Estrutura dos dados

Dados podem estar armazenados de diferentes formas em um sistema computacional. É comum diferenciar a forma como eles estão estruturados em:

* **dados estruturados:** tipos bem definidos e consistentes. 
Ex: dados numéricos, categóricos armazenados em um banco de dados.

* **dados semiestruturados:** geralmente armazenados em formato chave-valor sem um esquema e tipo definidos.  
Ex: JSON, XML.

* **dados não estruturados:** todo o resto.
Ex.: imagens, áudios, e-mails, dados de sensores, textos sem tipo definido.

### Classificação de volume de dados

À medida que aumenta o volume de dados processados e armazenados por um banco de dados, diferentes desafios técnicos e tecnologias se tornam necessárias. 

Embora não exista uma classificação precisa quanto ao volume de dados, nós podemos sugerir uma classificação conforme abaixo:

* **small data (kb  - 100s Mb)**: cabem em arquivos, planilhas, etc. e são consultados em memória.
* **medium data (100s Mb - 100s Gb)**: armazenados em bancos de dados tradicionais, podem ter algumas dezenas de Gigabytes, mas ainda podem ser consultados em memória na maioria dos casos. 
* **big data (>100s Gb):** estruturados ou não estruturados, precisam ser armazenados em grandes servidores, geralmente na nuvem.

### Métodos de armazenamento de dados

Quando uma empresa começa a extrapolar os limites de planilhas ou de bancos transacionais, a primeira decisão arquitetural costuma ser onde armazenar e organizar os dados analíticos. Entre as opções mais comuns estão *data warehouses*, *data lakes* e, mais recentemente, arquiteturas híbridas chamadas de *lakehouses*. A escolha não precisa ser excludente: cada abordagem atende a necessidades específicas e, na prática, é comum combiná-las.

**Mas afinal, o que são data lakes, data warehouses e lakehouses?**
* **Data warehouse (DW)**: funciona como um armazém estruturado e otimizado para consultas analíticas. Ele centraliza dados de múltiplas fontes — ERPs, CRMs, planilhas, sistemas financeiros — aplicando transformações que garantem consistência e performance. Serviços como Snowflake, BigQuery, Redshift ou Azure Synapse popularizaram o modelo ao oferecer elasticidade de armazenamento e processamento, além de recursos nativos de governança e segurança. A principal vantagem do DW é entregar dados prontos para negócios com latência previsível.

* **Data lake**: pode ser imaginado como um grande lago onde dados de qualquer formato (estruturados, semiestruturados ou não estruturados) são depositados em sua forma quase bruta. Ele costuma ser construído sobre armazenamentos de objetos como Amazon S3, Azure Data Lake ou Google Cloud Storage. Por aceitar todos os formatos, o data lake é ideal para cenários exploratórios, projetos de machine learning, IA generativa, análises de logs e arquivamento de alto volume. Em contrapartida, exige governança e catálogos bem definidos para que o conteúdo não se torne um “pântano de dados”.

* **Lakehouse**: surgiu para unir as vantagens dos dois mundos. Tecnologias como Delta Lake, Apache Iceberg e Apache Hudi fornecem transações ACID, versionamento e gerenciamento de tabelas sobre um data lake, permitindo que dados brutos, refinados e prontos para consumo coexistam no mesmo ambiente, porém com governança mais próxima de um DW. Esse modelo facilita workloads mistos: ciência de dados, análises ad-hoc e dashboards usando a mesma fonte controlada. O Databricks funciona também como um Lakehouse.

### Estratégias para o Engenheiro de Analytics

Ao projetar a arquitetura de dados, é essencial equilibrar o valor que ela gerará para o negócio com o custo e a complexidade de mantê-la. Mesmo quando se opta por um único serviço na nuvem, é importante avaliar o nível de maturidade analítica e o tipo de decisão que se deseja habilitar. Empresas em estágio inicial podem obter ótimo retorno começando com um data warehouse gerenciado e ferramentas de ingestão automatizada (como Fivetran, Airbyte ou Stitch), evoluindo gradualmente para camadas históricas e arquiteturas mais sofisticadas à medida que o volume e a maturidade de uso dos dados aumentam. Essa evolução progressiva tende a gerar resultados mais sustentáveis do que tentativas de adotar soluções complexas sem estar preparado para extrair seu real valor.