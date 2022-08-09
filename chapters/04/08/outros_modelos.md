# 4.8 Outras classificações de modelagem de bancos de dados

Ao analisar a documentação de bancos de dados transacionais, essencial para o processo de planejamento do data warehouse que veremos na Parte 2 e principalmente para o ETL na Parte 3,  o engenheiro de analytics pode se deparar com diferentes níveis de detalhamento dos modelos de dados. Eles fazem parte das etapas de desenvolvimento de softwares em geral e podem ou não estar disponíveis para cada fonte de dados de um projeto de analytics.

## Modelagem Conceitual

O modelo conceitual estabelece entidades, atributos e seus relacionamentos. Este modelo abstrai a estrutura do banco de dados e se preocupa com a criação de um modelo do mundo real. Estes modelos criam um vocabulário comum para todos os usuários de dados.   

```{figure} ../../../assets/img/modelo_conceitual.png
:name: modelo_conceitual

O modelo conceitual é simplificado
```
Figura 4.10. O modelo conceitual é simplificado

## Modelagem Lógica

O modelo lógico acrescenta a estrutura dos elementos ao modelo conceitual, tipos dos atributos, etc. Também é feita uma normalização dos dados, geralmente a chamada 3a Forma Normal (3NF) de modo a criar um modelo de dados consistente e sem redundância.


```{figure} ../../../assets/img/modelo_logico.png
:name: modelo_logico

O modelo lógico mostra detalhes sobre as tabelas e relacionamentos
```

## Modelagem Física

O modelo físico descreve a implementação específica de cada banco de dados do modelo de dados. Esse modelo terá as chaves primárias e estrangeiras entre tabelas, tipos específicos de cada RDBMS, nomes de tabelas etc.

```{figure} ../../../assets/img/modelo_fisico.png
:name: modelo_fisico

O modelo físico apresenta os detalhes específicos de cada RDMS
```

