# 2.3 Velocidade

Dispositivos móveis, IoT, SaaS e produtos digitais geram expectativas de atualização quase imediata. Ainda assim, nem todo dado precisa (ou consegue) chegar em tempo real. O desafio do Engenheiro de Analytics está em equilibrar urgência de negócio, capacidade técnica e custo operacional para definir o ritmo certo de cada pipeline.

### Padrões de processamento

* **Lotes (*batch*)**: executados em janelas definidas (diárias, horárias, semanais). Excelente para métricas financeiras, relatórios operacionais e integrações com fontes que não fornecem eventos contínuos. Orquestradores como Airflow, Dagster ou Prefect ajudam a gerenciar dependências e SLAs.
* **Micro-batch**: execuções frequentes com lotes pequenos, comuns em cargas CDC (*change data capture*), rodando a cada poucos minutos.
* **Streaming / Near real-time**: eventos processados continuamente ou com latência de segundos. Usado para monitorar fraudes, alimentar *feature stores* ou acionar automações de marketing. Tecnologias incluem Kafka, Flink, Spark Structured Streaming, Kinesis e Pub/Sub.

|                 | Processamento em lotes                                                                                    | Processamento streaming                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Características | Grandes volumes, dependências claras, menor complexidade operacional                                      | Eventos granulares, latência baixa, necessidade de observabilidade constante                      |
| Tipo de dados   | Bancos transacionais, arquivos, APIs agendadas                                                            | Eventos web/mobile, logs, sensores                                                                |
| Aplicações      | dbt, Databricks Jobs, AWS Glue, Airflow, Fivetran, cargas SQL incrementais                                | Kafka, Flink, Spark Structured Streaming, Amazon Kinesis                                          |

### Estratégias para o Engenheiro de Analytics

- Alinhe SLAs com o negócio: defina claramente qual atraso é aceitável para cada métrica; muitas vezes “quase em tempo real” significa poucos minutos.
- Combine arquiteturas: use streaming para detectar eventos críticos e consolide em lotes para análises históricas e reconciliações.
- Invista em observabilidade: monitore tempos de execução, *lag* de filas e *throughput* de tabelas materializadas.
- Modele para atualizações frequentes: prefira cargas incrementais, *upserts* e *merge statements*, evitando recriar tabelas completas quando o intervalo entre execuções for curto.
