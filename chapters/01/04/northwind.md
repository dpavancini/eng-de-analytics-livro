## 1.4 Estudo de caso: Northwind Traders

Um dos  objetivos deste livro  é mostrar na prática a aplicação de técnicas, ferramentas e conceitos modernos de analytics. Para isso, utilizaremos como base uma empresa fictícia, a Northwind Traders, e um banco de dados fictício muito utilizado para ensino de bancos de dados. Nosso objetivo é, ao final do livro, termos projetado e criado uma infraestrutura de analytics completa para a Northwind, desde a extração dos dados até a visualização em uma ferramenta de BI moderna.

### Contexto
A Northwind Traders é uma loja fictícia que gerencia pedidos, produtos, clientes, fornecedores e muitos outros aspectos de uma pequena empresa. Hoje, ela possui cerca de 30 funcionários e um faturamento mensal de 1 milhão e meio de reais. Seus clientes e fornecedores estão distribuídos em diversos países. Seus principais produtos são alimentos, bebidas e utilidades domésticas.

A Northwind possui relatórios feitos em planilhas sob demanda. Quando a empresa era pequena, esse formato funcionava, mas agora, com o crescimento acelerado, os dados de diferentes áreas começaram a não bater e as reuniões começaram a ficar mais conflituosas. A empresa também quer entender melhor seus dados para aumentar o ticket médio e reduzir o churn, dois objetivos considerados estratégicos a médio prazo.

O CEO da Northwind, Tony Stark, está convencido de que dados são a chave para o crescimento da empresa e, agora, quer ter uma visão integrada de todos os dados em um só lugar. No entanto, o gerente de TI, John Snow, é receoso sobre a dificuldade técnica, os custos e prazos para esse projeto. Pior, John já participou de projetos de BI no passado usando ferramentas de grandes empresas de tecnologia que não tiveram o sucesso esperado. A gerente comercial da empresa, Maria Antonieta, embora muito competente na sua área, não conhece o mundo de dados e de BI, e ainda não conseguiu chegar em uma conclusão sobre o projeto. Por outro lado, o recém-contratado gerente de inovação, Pedro Pedreiro, também está apostando alto no projeto para tornar a Northwind uma empresa data driven.

O banco de dados do ERP da empresa é um sistema PostgreSQL em um servidor nuvem. Além disso, a Northwind utiliza um CRM da Salesforce e um sistema de contabilidade da ContaAzul. Atualmente, não possui um BI, mas estaria aberta a utilizar ferramentas como Tableau, Data Studio, PowerBI, entre outras.

Você vai atuar como Engenheiro de Analytics na Northwind e sua tarefa é estruturar uma infraestrutura de analytics completa utilizando os conceitos e as ferramentas adequadas para essa tarefa. Para isso, serão necessárias algumas etapas ao longo do caminho. Cada etapa corresponde a um capítulo deste livro, que finaliza sempre com um desafio prático.

```{note}
Os dados e estudos de caso também estão disponíveis no [repositório]() do Livro. 
```