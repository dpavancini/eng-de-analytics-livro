# 1.4 Estudo de caso: Northwind Traders

No capítulo anterior discutimos as responsabilidades do Engenheiro de Analytics. Agora, vamos ver como aplicar essas responsabilidades na prática, utilizando um estudo de caso fictício, mas muito utilizado em ensino de bancos de dados: a **Northwind Traders**.  

Nosso objetivo é, ao final do livro, termos projetado e criado uma **infraestrutura de analytics completa** para a Northwind, desde a extração dos dados até a visualização em uma ferramenta de BI moderna.  

---

## Contexto

A Northwind Traders é uma empresa fictícia que gerencia pedidos, produtos, clientes, fornecedores e outros aspectos de uma pequena organização comercial. Atualmente, possui cerca de 30 funcionários e um faturamento mensal de aproximadamente 1,5 milhão de reais. Seus clientes e fornecedores estão distribuídos em diversos países, com foco em alimentos, bebidas e utilidades domésticas.  

Até então, a Northwind produz relatórios sob demanda em planilhas. Esse formato funcionava enquanto a empresa era menor, mas com o crescimento acelerado os dados começaram a se tornar inconsistentes entre áreas e as reuniões cada vez mais conflituosas.  

Além disso, a liderança tem dois objetivos estratégicos de médio prazo:  
- aumentar o **ticket médio**;  
- reduzir o **churn** (perda de clientes).  

O CEO da Northwind, Tony Stark, está convencido de que dados são a chave para o crescimento. Ele quer uma visão integrada de todos os dados em um só lugar. Já o gerente de TI, John Snow, teme os custos, prazos e a complexidade técnica. Ele também carrega experiências negativas de projetos anteriores de BI que não entregaram o esperado. Do lado comercial, Maria Antonieta é competente em sua área, mas não tem familiaridade com conceitos de dados e BI, e por isso não consegue opinar com clareza sobre o projeto. Por outro lado, o recém-contratado gerente de inovação, Pedro Pedreiro, aposta alto na iniciativa para transformar a Northwind em uma empresa *data-driven*.  

---

## Sistemas atuais

- **ERP**: banco PostgreSQL em servidor na nuvem;  
- **CRM**: Salesforce;  
- **Contabilidade**: ContaAzul;  
- **BI**: ainda inexistente, mas aberta a ferramentas como Tableau, Power BI e Looker Studio.  

---

## Seu papel

Você será o **Engenheiro de Analytics da Northwind**. Sua missão é **estruturar uma infraestrutura completa de dados**, aplicando os conceitos apresentados neste livro: ingestão, modelagem, transformação, métricas e visualizações.  

Cada capítulo corresponderá a uma etapa dessa construção e terminará com um **desafio prático**, simulando situações reais de projeto.  

### Premissas do projeto

- Escopo inicial em lote (batch) com atualização diária;    
- Consumo principal via Databricks SQL e ferramenta de BI;  
- Governança e catálogo via Unity Catalog;  
- Custos e performance monitorados, mas sem otimizações prematuras;  
- Foco em ELT (extrair/carregar primeiro; transformar no warehouse/lakehouse).  

```{note}
Os dados e estudos de caso estão disponíveis no repositório do livro: https://github.com/dpavancini/eng-de-analytics-livro
```
