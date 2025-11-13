# 8.1 O papel do Data Warehouse no Modern Data Stack

O data warehouse ocupa uma posição central nas arquiteturas modernas de analytics. No passado, sua construção era restrita a grandes corporações, que podiam arcar com altos investimentos em servidores dedicados, infraestrutura de ETL e equipes altamente especializadas. Com o surgimento dos cloud data warehouses (CDW), esse cenário mudou: agora empresas de qualquer porte podem desenvolver infraestruturas analíticas modernas de forma incremental, escalável e com acesso a ferramentas amplamente disponíveis.

Entre as principais características dos CDWs que permitem seu uso em grande escala para analytics estão:
- Os CDWs em geral são baseados na arquitetura MPP (do inglês, Massive Parallel Processing), uma tecnologia de armazenamento distribuído que permite o processamento de grandes volumes de dados em um tempo reduzido. Graças a esse poder de processamento, tornou-se possível concentrar as transformações dentro do próprio DW, via ELT e em uma única linguagem: SQL. Esse novo modelo democratizou o uso do DW e estabeleceu as bases da disciplina de analytics engineering.
- O uso de tecnologias em nuvem permite centralizar dados de diferentes fontes e sistemas em um repositório único, gerando uma "única fonte de verdade" e de amplo acesso pela organização.
- Serviços na nuvem em geral são escaláveis e precificados no sistema pay-as-you-go. Isso significa que se tornou possível começar pequeno e expandir o DW com um custo previsível, em contraponto aos investimentos milionários necessários antigamente. 
- Ferramentas de BI, governança de dados e Data Discovery foram desenvolvidas especificamente para as arquiteturas de analytics centralizadas em cloud data warehouses. 

Além do cloud data warehouse, o MDS conta com uma série de ferramentas que facilitam e melhoram os processos de consolidação e visualização de dados. Nós trataremos desses processos nas partes 3 e 4 do livro, respectivamente.

```{admonition} Medallion architecture em 30 segundos
Organize os dados em camadas lógicas: Bronze (brutos), Prata (limpos e integrados) e Ouro (marts e métricas). Essa separação ajuda na governança, na performance e na colaboração entre domínios.
```