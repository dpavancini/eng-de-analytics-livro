# O papel do Data Warehouse no Modern Analytics Stack

O data warehouse ocupa lugar central nas arquiteturas modernas de analytics. Tradicionalmente, a construção de um DW era exclusividade de grandes corporações que possuíam os recursos financeiros e técnicos para investir nos servidores dedicados e profissionais especializados necessários para construir DWs e as infra-estruturas de ETL adjacentes. O surgimento dos cloud data warehouses (CDW) trouxe uma revolução no mercado de analytics, pois possibilitou que empresas de qualquer porte possam construir infra-estruturas modernas de forma incremental e utilizando ferramentas de amplo acesso.

Entre as principais características dos CDWs que permitem seu uso em grande escala para analytics estão:
- O uso de tecnologias em nuvem permite centralizar dados de diferentes fontes e sistemas em um repositório único, gerando uma "única fonte de verdade" e de amplo acesso pela organização,
- Os CDWs em geral são baseados na arquitetura MPP (do inglês, massive parallel processing), uma tecnologia de armazenamento distribuído que permite o processamento de grandes volumes de dados em um tempo reduzido, 
- A capacidade de processamento permite centralizar a etapa de transformação de dados no próprio DW através do ELT e usando uma única linguagem, o SQL. Essa mudança em relação ao ETL tradicional democratiza o uso e desenvolvimento do DW e é base do surgimento da área de analytics engineering.
- Serviços na nuvem em geral são escaláveis e precificados no sistema pay-as-you-go. Isso significa que se tornou possível começar pequeno e crescer o DW com um custo previsível, em contraponto aos investimentos milionários necessários antigamente. 
- Ferramentas de BI, governança de dados e Data Discovery foram desenvolvidas especificamente para as arquiteturas de analytics centralizadas em cloud data warehouses. 

Além do Cloud Data Warehouse, o MAS conta com uma série de ferramentas que facilitam e melhoram os processos de consolidação e visualização de dados. Nós trataremos desses processos nas partes 3 e 4 do livro, respectivamente.