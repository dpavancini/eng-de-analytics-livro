(processo_elt)=
# 13.3 O Processo de ELT

O processo de ELT  se inicia com o problema de negócio: precisamos ter dados confiáveis para utilização na tomada de decisão. Esse problema é o norte de todo o projeto de Analytics ainda que apareça em diferentes "sabores" a depender do cliente ou metodologia utilizada. Vendo dessa forma, percebemos que a maior parte dos conceitos e ferramentas apresentadas neste livro como parte da "caixa de ferramentas" de um Engenheiro de Analytics são necessárias mas não suficientes para um projeto de analytics de sucesso. O real valor será calculado a partir da qualidade e disponibilidade da informação disponível para o usuário final dos dados: o tomador de decisão.


```{figure} ../../../assets/img/processo_elt.png
:name: processo_elt_fig
:height: 450px

Etapas do Processo de ELT
```

Assim, o processo de ELT é na verdade muito mais amplo que apenas extrair os dados das fontes transacionais e disponibilizá-los em um *data warehouse*. De fato, ele engloba todas as etapas de desenvolvimento de uma infraestrutura moderna de analytics: desde o planejamento dos requisitos de negócio, até a entrega final dos dados através de tabelas ou *dashboards*. 

## Planejamento

O planejamento é essencial para alinhar os objetivos de negócio com a implementação técnica. As etapas de planejamento no entanto não são feitas pensando em entregar um planejamento completo do projeto, mas sim **de forma incremental** e incluindo o necessário para a implementação de cada pequena etapa.

### Entendimento do Problema

Na etapa de **Entendimento do Problema**, nosso objetivo é obter o máximo de informações sobre os problemas de negócio que devem ser resolvidos com o projeto. Para isso, precisamos solitar aos times de negócio e *stakeholders* informações relevantes para o entendimento dos dados, tais como planilhas, consultas, relatórios e dashboards. Entre as informações que queremos obter estão:

* Background da empresa
* Objetivos estratégicos
* Expectativas com o projeto
* Principais KPIs (indicadores) relacionados ao projeto
* "Donos" dos indicadores ou stakeholders que devem ser consultados
* Valores de referência para validação posterior
* Fluxo de decisão: quem usa os indicadores, quando e para quê.


### Mapeamento de Dados

A partir das necessidades de negócio identificadas, precisamos avaliar a disponibilidade de dados. Nem sempre os dados identificados pelos usuários de negócio são de fácil acesso, ou mesmo acessáveis em primeiro lugar. Além disso, é comum que a forma com que os dados brutos estão armazenados fisicamente seja bem diferente do formato com que os dados são acessados pela interface dos sistemas empresariais ou relatórios.

Para realizar o mapeamento de dados utilizamos técnicas como {ref}`diagramas ERD<modelagem_bd>`, planilhas e outros documentos. O importante é conseguir mapear quais dados estão disponíveis e onde estão de uma forma mais conceitual, sem entrar em muitos detalhes ainda. 

### Elaboração do Modelo Conceitual do DW

O próximo passo é desenharmos (ou atualizarmos) o modelo conceitual do *data warehouse* que estamos desenvolvendo. Como já falamos no {ref}`modelagem_dw`, precisamos desenhar as tabelas Fato e Dimensão apropriadas e o relacionamento entre elas, tomando especial atenção na conformidade entre dimensões.

## Ingestão de Dados

Definido **quais** dados precisamos e **onde** buscá-los, precisamos realizar a Ingestão de dados para nosso *Data Warehouse*. Isto é, extrair esses dados das fontes transacionais e disponibizá-los na camada bruta do *data warehouse*. Falaremos de forma detalhada sobre essa etapa no {ref}`ingestao`.

## Transformação

Na etapa de transformação é que os dados brutos, extraído diretamente dos diferentes sistemas da empresa, são lapidados e transformados em dados prontos para serem utilizados na tomada de decisão. É nesta **etapa que reside o maior esforço e valor gerado da Engenharia de Analytics.** Veremos quais as principais tarefas, boas práticas e ferramentas práticas no {ref}`transformacao`.

### Entrega Final

Seguindo as {ref}`boas práticas de programação<boas_praticas>`), somente disponibilizaremos os novos dados pro usuário final depois de realizar testes, documentação e outras tarefas comuns no processo de ***deploy*** de softwares. Ao final do processo, os novos dados ficam disponibilizados no ambiente "produção" do data warehouse para serem transformados em informação e geração de valor de negócio.

No próximoa capítulo vamos detalhar o processo de ingestão de dados, a etapa inicial do ELT. Vamos lá?