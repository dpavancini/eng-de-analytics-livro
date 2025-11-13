# 7.2 Arquitetura de Referência

O framework de referência do MDS serve para exemplificar as funções de cada módulo do MDS de modo a auxiliar o entendimento e construção de arquiteturas derivadas. É importante notar que as funções detalhadas abaixo podem ser executadas por uma única ferramenta ou serem parte de um conjunto de funcionalidades (ex. um Data Warehouse Cloud como o Databricks inclui Armazenamento, Processamento (VMs), APIs, Controle de Acesso e Motor de BigData em uma única ferramenta).

## Componentes

Nesta seção apresentamos rapidamente o objetivo de cada componente da arquitetura de referência do MDS e exemplos de ferramenta que o implementa. Para uma outra lista de ferramentas veja esse [link](https://snowplowanalytics.com/blog/2021/05/12/modern-data-stack/).

Os componentes mais comuns (**Core**) em implementações de MDS são apresentados em vermelho no diagrama ao final desta seção. Já os componentes que aparecem em projetos sob demanda estão em amarelo.

```{figure} ../../../assets/img/mas_referencia.png
:name: mds_referencia

Arquitetura de referência do Modern Data Stack
```

### Fontes de Dados

As fontes de dados geralmente são determinadas pela infraestrutura do cliente e são premissas da arquitetura. No entanto, em alguns casos a implementação pode envolver a configuração ou adequação de alguma fonte de dados também.

**Core**
Os componentes de fontes de dados mais comuns são:

- **Banco de Dados**: são as fontes de dados mais comuns em [sistemas legados](https://www.objective.com.br/insights/sistemas-legados/) e parte essencial da grande maioria dos softwares empresariais. Podem ser divididos em bancos de dados relacionais (SQL) ou não-relacionais (NoSQL). Em geral são acessados via conexões do tipo JDBC ou ODBC. Em alguns projetos pode ser necessário realizar uma cópia completa do banco de dados, procedimento chamado de **clonagem**.

- **API**: APIs, ou mais precisamente **REST APIs**, são o protocolo de comunicação entre sistemas mais utilizado atualmente. Quando acessamos uma API, o sistema original é protegido por essa nova camada de comunicação, de modo que não temos acesso ao banco de dados original. Neste tipo de integração, é possível que parte dos dados necessários não esteja disponível na API e precise ser desenvolvido pelo cliente.

**Sob Demanda**
Os componentes de fontes de dados menos usuais são:

- **Eventos**: fontes de eventos coletam ações em sistemas em tempo real, por exemplo, cliques em um website ou utilização de um app. Algumas fontes de eventos são configuradas por sistemas SaaS (como [Google Analytics 4](https://support.google.com/analytics/answer/10089681?hl=pt-BR)), outras podem ser desenvolvidas de forma personalizada para cada projeto (ex. [Snowplow](https://snowplowanalytics.com/)) ou de forma híbrida (ex. CDP).

- **Logs**: são fontes de dados que utilizam os logs de aplicações. Podem ser coletadas em tempo real ou não.

- **IoT**: são fontes de dados de equipamentos físicos como máquinas, sensores etc. Em geral, processadas em tempo real.

### Camada de Ingestão

A camada de ingestão inclui componentes responsáveis por extrair dados das fontes de dados e carregar em um outro ambiente (como um data lake e data warehouse). Essa camada também é conhecida pelos termos *Extract-load* dentro do MDS.

**Core**
Os componentes da camada de ingestão mais comuns são:

- **Ingestão em lotes**: é o processo de extrair um grande volume de dados de uma ou mais fontes em um intervalo específico (ex. a cada 24 horas) ou cronograma (ex. todo dia às 2:00AM). Neste tipo de integração, a plataforma de dados **busca os dados** na fonte de forma ativa.

**Sob Demanda**
Os componentes da camada de ingestão menos usuais são:

- **Ingestão em streaming**: é o processo de ingestão de dados em tempo real, necessário para fontes de dados de Eventos, IoT e Logs em geral. Neste tipo de ingestão, a plataforma de dados recebe os dados de forma **passiva** através de um sistema que "escuta" eventos (ex. [Apache Kafka]() ou [Google PubSub]()).

### Camada de Transformação

A camada de transformação é responsável por processar e armazenar os dados extraídos as fontes de dados originais até seu formato final para consumo pelos produtos de dados.

**Core**
Os componentes da camada de transformação mais comuns são:

- **Data Warehouse**: o data warehouse é um banco de dados analítico capaz de armazenar, processar e disponibilizar enorme volume de dados para a tomada de decisão. Ele pode ser desenvolvido de uma forma que abstrai suas partes mais técnicas e disponibiliza somente a interface necessária para construção dos modelos (isto é, tabelas) como é o caso dos  Cloud Data Warehouses ([Databricks](), [Google BigQuery](), [Amazon Redshift](), [Azure Synapse]() e [Snowflake]()) ou ter uma arquitetura mais flexível que também é chamada de [Data Lakehouse](). Na visão do MDS, o Data Warehouse não serve apenas como um banco de dados bruto mas precisa ser modelado para atender aos requisitos de cada cliente, tarefa que fica a cargo da [Engenharia de Analytics]().

- **Processamento em Lotes**: responsável por executar a transformação de dados brutos em dados modelados. Salvo exceções, o processamento ocorre dentro do Data Warehouse (ELT). Em alguns projetos esse processamento pode ser separado do armazenamento, como em [Lakehouses]() ou com engines como o Databricks.

- **Modelagem de Dados**: para realizar a modelagem de dados, isto é, a aplicação de regras de negócio, transformações, construção de tabelas etc. utilizamos a ferramenta [dbt]() dentro do MDS. Essa ferramenta **não processa dados diretamente** mas envia instruções (em SQL) para o componente de processamento em lotes da plataforma.


**Sob Demanda**
Os componentes da camada de transformação menos usuais são:

- **Data Lake**: um data lake é um repositório de dados com armazenamento virtualmente infinito que permite guardar qualquer tipo de arquivo digital. Ele pode ou não estar presente no MDS conforme a necessidade e criticidade do projeto.

- **Processamento Streaming**: projetos que possuem fontes de dados em tempo real necessitam de um componente de processamento de dados em streaming, que consegue processar os dados à medida que chegam na plataforma de dados. O Databricks, por exemplo, oferece recursos robustos para esse tipo de processamento. 

- **Desenvolvimento de AI & ML**: o desenvolvimento de modelos de AI & ML só é previsto em projetos com uma plataforma de dados mais desenvolvida, devido à visão de tratar modelos como software. Para o desenvolvimento de modelos é prevista a utilização de Notebook gerenciados na nuvem ([Amazon SageMaker](), [Google Vertex](), etc) ou através de um PaaS como a [Databricks](). O desenvolvimento e deploy dos modelos deve seguir um processo de MLOps bem estruturado e para isso recomendamos o uso do [framework Kedro]().


### Camada de Disponibilização

Também chamada de *serving layer*, essa camada é em geral invisível e parte das ferramentas utilizadas pelo MDS. No entanto, em projetos mais complexos pode ser necessário separar componentes que disponibilizam dados e serviços dos componentes que os constroem.

**Core**

Os componentes da camada de Disponibilização mais comuns são:

- **Data Marts:** disponibilizam as tabelas finais do processo de ELT de forma estruturada, documentada e otimizada para consulta por produtos de dados e analistas. Em geral, são servidos pelo próprio Data Warehouse.

- **Camada Semântica (Metrics Layer):** define métricas reutilizáveis e consistentes (dimensões, granularidade, políticas de cálculo) expostas para BI e outras aplicações. Exemplos: LookML, dbt metrics/MetricFlow, semantic layers dedicadas.

- **APIs:** APIs são interfaces de comunicação entre os produtos de dados e ambientes externos com a plataforma de dados e incluem interfaces padronizadas (como conexões JDBC com o DW) e APIs gateways que podem ser necessários por questões de desempenho e segurança de cada projeto. 

**Sob Demanda**
Os componentes da camada de Disponibilização menos usuais são:

- **Motor de Big Data**: motor de big data (ou *Big Data Query Engines*) permitem consultar grandes volumes de dados armazenados no Data Lake sem a necessidade de um Data Warehouse. Podem existir em projetos maiores onde há a necessidade desse tipo de acesso direto utilizando ferramentas como o [Athena](), [Presto]() e [Dremio](). O Databricks também se enquadra nesta categoria.

### Camada de Produtos

A camada de Produtos é a camada que expõe produtos de dados para consumidores externos à plataforma de dados como analistas de dados, outras aplicações etc. Na arquitetura MDS os produtos de dados devem **necessariamente** ser construídos em cima de uma plataforma de dados que exponha os componentes estruturais necessários para sua construção.

**Core**
Os componentes da camada de Produtos mais comuns são:

- **Self-service BI**: ferramentas para construção de visualizações e exploração de dados, essenciais para suportar decisões. Exemplos incluem [Power BI](), [Tableau](), [Metabase](), [Mode](), [Looker]().

**Sob Demanda**
Os componentes da camada de Produtos menos usuais são:

- **Reporting**: inclui ferramentas que permitem a construção e automação do envio de relatórios.

- **Data Apps:** aplicativos (web ou mobile) que interagem com dados e modelos de IA.

- **Reverse ETL**: envia dados da plataforma (via APIs) de volta para sistemas operacionais (ex.: CRM/Marketing), ativando segmentos, classificações (ex.: RFV) e atributos.

- **AI & ML**: componentes para inferência e serving de modelos. Em LLMs, inclua orquestração de prompts, embeddings e busca vetorial (RAG) quando necessário.

### Infra & Orquestração

Esta camada disponibiliza recursos para o funcionamento da plataforma de dados. Em versões do MDS mais simples, seus componentes estão em geral embutidos em ferramentas gerenciadas e não são diretamente acessáveis.

**Core**
Os componentes da camada de Infra & Orquestração mais comuns são:

- **Orquestração**: componente responsável por orquestrar a execução dos demais componentes da plataforma. Pode ser uma ferramenta dedicada (ex. [Apache Airflow]()) ou parte de outros componentes (ex. execução por intervalos ou periódica).

- **Compute & Storage**: inclui componentes mais próximos do bare metal ou virtualizações de recursos de computação (ex.: VMs) e armazenamento. Em arquiteturas MDS menos complexas esses recursos não são acessíveis diretamente.

- **Redes**: componentes de comunicação de rede (IPs, grupos de segurança, sub-redes). Em arquiteturas MDS menos complexas esses recursos não são acessíveis diretamente.

- **Controle de Acesso**: componentes que permitem gerenciar o acesso à plataforma de dados (ex. IAM).

**Sob Demanda**
Os componentes da camada de Infra & Orquestração menos usuais são:

- **Monitoramento**: componentes que monitoram os recursos da plataforma como consumo de dados, faturamento, etc.

- **Container Registry**: registro de imagens Docker para deploy.

- **IaC**: Infrastructure as Code para modularizar e gerenciar infraestrutura (ex.: [Terraform]()).

- **Kubernetes**: é um sistema de orquestração de contêineres open-source que automatiza a implantação, o dimensionamento e a gestão de aplicações em contêineres.

### Operações
Esta camada cobre operação do desenvolvimento: repositório de código, pipelines de CI/CD e alertas.

**Core**
Os componentes da camada de Operações mais comuns são:

- **VCS**: controle de versão (ex.: [Git](), [Bitbucket](), [GitLab]()). É componente core no MDS para tratar Analytics como Código.

**Sob Demanda**
Os componentes da camada de Operações menos usuais são:

- **CI/CD**: componentes responsáveis por CI/CD são utilizados para garantir boas práticas de DevOps. Em geral, em arquiteturas MDS menos complexas esses recursos não são acessáveis diretamente.

- **Alertas**: componentes de alertas verificam o sucesso das integrações e outros avisos. Em geral, em arquiteturas MDS menos complexas esses recursos não são acessáveis diretamente.

### Governança

**Core**
Os componentes da camada de Governança mais comuns são:

- **Documentação**: componentes responsáveis por disponibilizar e manter atualizada a documentação de códigos, processos e dados (ex.: dbt docs, Wiki, Confluence).

- **Segurança**: componentes responsáveis por garantir a segurança da plataforma e monitorar uso de dados pessoais/sensíveis. Em arquiteturas MDS menos complexas esses recursos nem sempre são expostos diretamente.

- **Qualidade de Dados**: testes e observabilidade (ex.: testes no dbt, [Great Expectations]()).

- **Catálogo de Dados**: catálogo e documentação (inclui linhagem). Pode ser parte de outro componente (ex.: dbt docs) ou ferramenta específica (ex.: [OpenMetadata]()). 

**Sob Demanda**
Os componentes da camada de Governança menos usuais são:

- **Gestão de Metadados**: componente responsável por gerenciar metadados dos demais componentes (ex.: [Backstage]()). Em arquiteturas MDS menos complexas esses recursos nem sempre são expostos diretamente.

- **Model Reporting**: componente responsável por monitorar e reportar resultados de modelos de Machine Learning (ex. [MLFlow]()).
