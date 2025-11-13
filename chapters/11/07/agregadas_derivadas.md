# 11.7 Tabelas Agregadas e Derivadas

Ao utilizar tabelas de fatos no menor grão possível, obtemos uma flexibilidade importante na arquitetura do DW. Por outro lado, é comum que tabelas de fatos reais fiquem muito grandes (com milhões ou até bilhões de linhas), de modo que consultas agregadas nessas tabelas (como `COUNT`, `AVG`, `SUM`) podem levar um tempo considerável. Esse tempo será ainda maior quando existirem muitos `JOINs` e consultas mais complexas.

Para amenizar o problema do tempo de consulta muito alto e otimizar o uso do DW, é comum criar **tabelas pré-agregadas** e tabelas resumo no processo de ETL. Devemos tomar especial cuidado com medidas não aditivas ou semiaditivas nesta agregação, pois, em geral, não é possível retornar aos dados originais, ou mesmo realizar agregações adicionais (ex.: médias).

Outra otimização comum é a construção de **tabelas derivadas**, que juntam fatos e dimensões geralmente consultadas em conjunto no BI ou em análises de negócio. Essas tabelas servem a dois objetivos principais: facilitar o entendimento pelos usuários de negócio e otimizar a performance da ferramenta de BI.

```{admonition} Importante
A possibilidade ou necessidade de construção de tabelas agregadas e derivadas dependerá da ferramenta de BI (ou outros produtos de dados que consomem o *Data Warehouse*). É sempre bom entender como cada ferramenta faz a conexão com os dados do *Data Warehouse* para escolher a melhor arquitetura.
```

```{admonition} Dicas práticas
- Nomeie e documente a granularidade das agregações (ex.: `fct_vendas_dia_produto_loja`). Evite agregar além do que o consumo precisa.
- Mantenha a fato transacional como fonte de verdade. Use agregadas para acelerar consultas frequentes e previsíveis.
- Para métricas não aditivas, agregue com o agregador correto (média ponderada, último valor do período para semiaditivas) e documente a regra.
- Considere uma camada semântica de métricas para garantir consistência entre fontes de consumo diferentes.
```
