
(dw)=
# Capítulo 8 - Data Warehouses

No Modern Data Stack, o Data Warehouse (DW) é o “cérebro analítico” da organização: concentra dados de várias fontes, processa consultas complexas com performance e expõe informações consistentes para produtos de dados e BI. Enquanto bancos transacionais (OLTP) são otimizados para muitas pequenas transações, o DW pertence ao mundo OLAP — consultas agregadas sobre grandes volumes, tipicamente em armazenamento colunar e com execução massivamente paralela (MPP).

Embora OLTP e DW, às vezes, usem tecnologias parecidas, a diferença prática está na modelagem e no padrão de acesso. Em bancos normalizados, otimizamos atualizações transacionais e consistência linha a linha. No DW, priorizamos leitura analítica: sumarizações, junções e filtros por vários eixos, em alto volume.

Exemplo: consultar o saldo de um cliente específico é simples e rápido em OLTP. Já responder “quantos clientes têm saldo acima de R$ 500,00?” exige varrer muitas linhas, calcular e agregar — algo natural para um DW bem modelado.

Com a nuvem, surgiram os cloud data warehouses e lakehouses que baratearam, escalaram e simplificaram a infraestrutura. Além de MPP e armazenamento colunar, muitos oferecem recursos como separação de computação e armazenamento, autoscaling, time travel, partição/clustering e integração nativa com ferramentas de dados. Lakehouses combinam tabelas transacionais e analíticas com formatos de tabela abertos (ex.: Delta Lake, Apache Iceberg), permitindo medallion architecture (bronze/prata/ouro).

Ao longo deste capítulo, conectamos conceitos clássicos (Kimball/Inmon) às práticas modernas (cloud, lakehouse, métricas/semântica) para construir modelos fáceis de entender e eficientes de consultar — porque no fim, analytics é sobre responder perguntas de negócio, não sobre tecnologia.

```{table}
|                      | **Banco de Dados Transacional**                                     | **Data Warehouse**                                                                              |
|----------------------|---------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| **Características**  | Alto volume de pequenas transações; consultas rápidas e pontuais    | Alto volume de dados; consultas complexas e agregadas; armazenamento colunar                    |
| **Estrutura**        | Normalizada                                                         | Denormalizada                                                                                   |
| **Tipo de consulta** | Qual o saldo do usuário com CPF xyz?                                | Quantos usuários possuem saldo maior que R$500,00?                                              |
| **Tecnologias**      | SQL Server, MySQL, Oracle Database, PostgreSQL                      | Databricks, BigQuery, Snowflake, Redshift                                                       |
```

```{admonition} Dica
No seu projeto, escolha primeiro o “como pensar” (modelagem, métricas e governança) antes do “onde rodar”. A maioria dos DWs modernos oferece capacidades semelhantes; o diferencial vem da clareza do modelo e da qualidade do processo.
```
