# 8.2 O Modelo Dimensional

Como já introduzimos brevemente no {ref}`banco_dados`, o modelo dimensional surgiu como alternativa ao tradicional modelo Entidade-Relacionamento dos bancos de dados transacionais para facilitar a criação de bancos de dados analíticos. Esses sistemas precisam responder a perguntas sobre os processos de negócio a partir da consulta de muitos dados simultaneamente, ao contrário do banco transacional, que se preocupa com a leitura e a escrita de muitas pequenas transações. A modelagem dimensional aborda as necessidades específicas da análise dos processos de negócio a partir de um princípio muito simples: a análise de como eles são medidos.

Naturalmente, o primeiro passo do modelo dimensional é identificar como os processos de negócio de uma empresa são medidos. Em geral, processos de negócio comuns como vendas, produção, controle de estoque, etc. possuem medidas (ou indicadores) semelhantes entre diferentes empresas. A identificação das necessidades específicas de cada projeto geralmente se dá através de perguntas comuns em relatórios, gráficos e outros processos gerenciais:

- Qual o total vendido por filial?
- Qual o estoque disponível no armazém X?
- Qual o canal com a melhor taxa de conversão de leads em janeiro?

Cada pergunta acima busca responder a algo sobre um processo específico (vendas, estoque, marketing) através de medidas como soma de vendas, saldo de estoque, ou taxas de conversão. Na “linguagem dimensional”, processos de negócio e suas medidas são fatos. Em geral, quando vistos de forma isolada, os fatos não trazem muita informação. Dizer que uma loja vendeu 100 unidades ou que o estoque é de 50 unidades só é útil quando algum contexto é dado. Em geral, é fácil identificar o contexto em perguntas de negócios pelas preposições que detalham ou filtram as medidas. No exemplo acima, “total vendido” é detalhado “por filial”, enquanto que, nas demais perguntas, o estoque é filtrado “no armazém X” e somente a taxa de conversão de marketing “em janeiro” é de interesse na análise. Atributos que detalham ou filtram fatos são chamados de dimensões na modelagem dimensional. 

```{figure} ../../../assets/img/fatos_dimensoes.png
:name: fatos_dimensoes

Geralmente é possível  identificar fatos e dimensões em relatórios
```

Apesar de simples, fatos e dimensões permitem modelar processos de negócio complexos para o uso em relatórios, ferramentas de BI e outras aplicações. Nem sempre é simples identificar o que são fatos e dimensões, ou mesmo o que define um processo de negócio ou um agrupamento de dimensões semelhantes. A este processo de identificar os fatos e dimensões que deverão se tornar tabelas no data warehouse dá-se o nome de modelagem dimensional. Seu desenvolvimento envolve não somente tecnologia, mas um pensamento abrangente de como utilizar os dados e a informação para a tomada de decisão, e o Analytics Engineer é a peça fundamental que une as necessidades de negócio ao desenvolvimento físico do data warehouse.