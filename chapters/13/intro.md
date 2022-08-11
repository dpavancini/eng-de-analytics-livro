# Capítulo 13 -  Introdução ao ETL e ELT

Nos últimos capítulos, aprendemos o que são bancos de dados e sua linguagem, o SQL. Também aprendemos que existem bancos de dados especializados para consultas chamados de Data Warehouses e que eles são criados a partir de uma arquitetura de fatos e dimensões. Mas como fazemos para mover e transformar os dados brutos armazenados nos bancos de dados e outras fontes de dados das empresas para os *data warehouses*?

Neste capítulo, aprenderemos como sair da teoria para a prática através do processo de transformação de dados entre fontes distintas chamado de ETL.

## O que é o ETL?

ETL (do inglês, *extract-transform-load*) é o processo sistemático de extrair, transformar, limpar e carregar os dados brutos em um banco de dados ou outro local para visualização ou consumo por outra aplicação. Cada letra da sigla significa uma de suas etapas:

- *Extract*: recuperar dados brutos de uma ou mais fontes e salvá-los em um repositório de dados único 
- *Transform*: estruturar, enriquecer, limpar e converter dados brutos para um modelo de dados final.
- *Load*: carregar os dados transformados para um data warehouse ou repositório de dados para utilização em uma ferramenta de BI.

A sigla ETL não apenas lista suas as etapas, mas também representa a ordem em que tradicionalmente essas etapas são realizadas em um projeto. Na Abordagem Moderna de Analytics, no entanto, uma outra abordagem é proposta chamada de ELT, em que primeiro os dados brutos são carregados para um Data Warehouse e depois transformados dentro do próprio DW. Para evitar confusões e manter o padrão da abordagem moderna de analytics, usaremos a sigla ELT para denotar o processo como um todo.

## O ELT

Embora existam algumas diferenças de arquitetura e ferramentas utilizadas nos processos de ELT modernos, o quadro geral é o mesmo: na etapa de Extração, ferramentas especializadas permitem “mover” dados de centenas de fontes como ERPs, CRMs, bancos de dados, REST APIs etc. diretamente para um Data Warehouse na nuvem ou on-premises com um baixo custo técnico. Desta forma, a etapa de *Load* é feita simultaneamente à extração. Dentro do DW, a transformação de dados é feita através de scripts SQL ou ferramentas visuais que 

No diagrama abaixo vemos como a etapa de ELT se destaca na arquitetura geral do {ref}`MAS<MAS>`:


```{figure} ../../assets/img/etl_mas.png
:name: etl_mas
:height: 450px

Exemplo da etapa de ETL no MAS
```

Na prática, o processo de ELT é onde a maior parte do trabalho é realizado em um projeto de Analytics. Em projetos de menor complexidade, um Engenheiro de Analytics pode ser responsável pelo fluxo completo: desde a coleta de dados até a entrega final. Em projetos mais críticos, é comum que essa responsabilidade seja dividida entre os Engenheiros de Analytics e Engenheiros de Dados.

Nas próximas seções vamos apresentar o processo de ELT passo a passo, contextualizando com as etapas apresentadas em outras seções do livro. Esses processos serão detalhados nos próximos capítulos, incluindo exemplos práticos de aplicação. Vamos lá?

## O Processo de ELT

O processo de ETL ({numref}`processo_elt`) se inicia com o problema de negócio: precisamos ter dados confiáveis para utilização na tomada de decisão. Esse problema é o norte de todo o projeto de Analytics ainda que apareça em diferentes "sabores" a depender do cliente ou metodologia utilizada. Vendo dessa forma, percebemos que a maior parte dos conceitos e ferramentas apresentadas neste livro como parte da "caixa de ferramentas" de um Engenheiro de Analytics são necessárias mas não suficientes para um projeto de analytics de sucesso. O real valor será calculado a partir da qualidade e disponibilidade da informação disponível para o usuário final dos dados: o tomador de decisão.


```{figure} ../../assets/img/processo_elt.png
:name: processo_elt
:height: 450px

Etapas do Processo de ELT
```

Assim, o processo de ELT é na verdade muito mais amplo que apenas extrair os dados das fontes transacionais e disponibilizá-los em um *data warehouse*. De fato, ele engloba todas as etapas de desenvolvimento de uma infraestrutura moderna de analytics: desde o planejamento dos requisitos de negócio, até a entrega final dos dados através de tabelas ou *dashboards*. 

### Planejamento

O planejamento é essencial para alinhar os objetivos de negócio com a implementação técnica. As etapas de planejamento no entanto não são feitas pensando em entregar um planejamento completo do projeto, mas sim **de forma incremental** e incluindo o necessário para a implementação de cada pequena etapa.

#### Entendimento do Problema

Na etapa de **Entendimento do Problema**, nosso objetivo é obter o máximo de informações sobre os problemas de negócio que devem ser resolvidos com o projeto. Para isso, precisamos solitar aos times de negócio e *stakeholders* informações relevantes para o entendimento dos dados, tais como planilhas, consultas, relatórios e dashboards. Entre as informações que queremos obter estão:

* Background da empresa
* Objetivos estratégicos
* Expectativas com o projeto
* Principais KPIs (indicadores) relacionados ao projeto
* "Donos" dos indicadores ou stakeholders que devem ser consultados
* Valores de referência para validação posterior
* Fluxo de decisão: quem usa os indicadores, quando e para quê.


#### Mapeamento de Dados

A partir das necessidades de negócio identificadas, precisamos avaliar a disponibilidade de dados. Nem sempre os dados identificados pelos usuários de negócio são de fácil acesso, ou mesmo acessáveis em primeiro lugar. Além disso, é comum que a forma com que os dados brutos estão armazenados fisicamente seja bem diferente do formato com que os dados são acessados pela interface dos sistemas empresariais ou relatórios.

Para realizar o mapeamento de dados utilizamos técnicas como {ref}`diagramas ERD<modelagem_bd>`, planilhas e outros documentos. O importante é conseguir mapear quais dados estão disponíveis e onde estão de uma forma mais conceitual, sem entrar em muitos detalhes ainda. 

#### Elaboração do Modelo Conceitual do DW

O próximo passo é desenharmos (ou atualizarmos) o modelo conceitual do *data warehouse* que estamos desenvolvendo. Como já falamos no {ref}`modelagem_dw`, precisamos desenhar as tabelas Fato e Dimensão apropriadas e o relacionamento entre elas, tomando especial atenção na conformidade entre dimensões.

### Ingestão de Dados

Definido **quais** dados precisamos e **onde** buscá-los, precisamos realizar a Ingestão de dados para nosso *Data Warehouse*. Isto é, extrair esses dados das fontes transacionais e disponibizá-los na camada bruta do *data warehouse*. Falaremos de forma detalhada sobre essa etapa no {ref}`ingestao_dados`.

### Transformação

Na etapa de transformação é que os dados brutos, extraído diretamente dos diferentes sistemas da empresa, são lapidados e transformados em dados prontos para serem utilizados na tomada de decisão. É nesta **etapa que reside o maior esforço e valor gerado da Engenharia de Analytics.** Veremos quais as principais tarefas, boas práticas e ferramentas práticas no {ref}`transformacao`.

### Entrega Final

Seguindo as {ref}`boas práticas de programação<boas_praticas>`), somente disponibilizaremos os novos dados pro usuário final depois de realizar testes, documentação e outras tarefas comuns no processo de ***deploy*** de softwares. Ao final do processo, os novos dados ficam disponibilizados no ambiente "produção" do data warehouse para serem transformados em informação e geração de valor de negócio. Para entender melhor esse processo, passaremos pelas etapas comuns do processo de entrega no {ref}`data_ops`.


## Leia Mais

Nathan Marz and James Warren. 2015. Big Data: Principles and best practices of scalable realtime data systems (1st. ed.). Manning Publications Co., USA