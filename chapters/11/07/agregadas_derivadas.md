# 11.7 Tabelas Agregadas e Derivadas

Ao utilizar tabelas de fatos no menor grão possível obtemos uma flexibilidade importante na arquitetura do DW. Por outro lado, é comum que tabelas de fatos reais possam ficar muito grandes (com milhões ou até bilhões de linhas) de modo que as consultas agregadas como (COUNT,AVG, SUM) nessas tabelas possam levar um tempo considerável. Esse tempo será ainda maior quando existir muitos JOINSs e consultas mais complexas.

Para amenizar o problema do tempo de consulta alto demais e otimizar o uso do DW, é comum criar **tabelas pré-agregadas** e tabelas resumo no processo de ETL.  Devemos tomar especial cuidado com medidas não-aditivas ou semi-aditivas nesta agregação, pois em geral não é possível retornar aos dados originais ou mesmo realizar agregações adicionais (ex, médias).

Outra otimização comum é a construção de **tabelas derivadas** que juntam fatos e dimensões geralmente consultadas em comum no BI ou análises de negócio. Essas tabelas servem dois objetivos principais: facilitar o entendimento pelos usuários de negóico e otimizar a performance da ferramenta de BI.

```{admonition} Importante
A possibilidade ou necessidade de construção de tabelas agregadas e derivadas dependerá da ferramenta de BI (ou outros produtos de dados que consomem o *Data Warehouse*). É sempre bom entender como cada ferramenta faz a conexão com os dados do *Data Warehouse* para escolher a melhor arquitetura.
```