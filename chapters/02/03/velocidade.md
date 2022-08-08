# 2.3 Velocidade

A evolução do uso de dispositivos móveis, IoT, redes sociais etc. gerou um grande desafio para coletar e processar esse enorme volume de dados com a velocidade necessária. A coleta e o processamento de dados é parte da área de processamento de dados, que também vem sendo objeto de grandes inovações de processos e ferramentas nos últimos anos.

Um dos grandes problemas na área de processamento de dados é entender qual ferramenta é indicada para cada problema para evitar uma arquitetura que, depois, não atenda às necessidades do projeto ou que seja demasiadamente complexa, gerando gastos de desenvolvimento desnecessários.

Para facilitar o entendimento do problema, as tarefas de processamento de dados são geralmente divididas em duas grandes categorias: 

* **em lotes (*batch*)**: processamento de grandes lotes de dados em intervalos programados (ex. uma vez por dia) ou periódicos (sem hora definida); ideal para dados que não se alteram muito ou em que as fontes de dados não permitem consultas em tempo real.
* **em tempo-real(*streaming*)**: atualização de pequenos pacotes de dados conforme o evento ocorreu (real time) ou em curtos intervalos de tempo (near real time), como uma ativação de uma tag de acompanhamento em um website ou uma nova venda realizada em e-commerce.
  
|                 | Processamento em lotes                                                                                | Processamento streaming                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Características | Grande volume de dados Implementação mais fácil Programado ou periódico Ideal para análises complexas | Pequenos pacotes de dados Implementação complexa Tempo real ou quase Ideal para métricas simples |
| Tipo de dados   | Banco de dados,  arquivos                                                                             | Eventos, IoT, vídeo                                                                              |
| Aplicações      | Apache Spark, AWS Batch, AWS Glue, Apache Hadoop, dbt                                                 | Apache Kafka, Apache Flink, Apache Spark Streaming, Amazon Kinesis                               |

