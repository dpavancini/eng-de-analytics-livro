## Veracidade

Talvez o desafio que gere o maior esforço na análise de dados seja garantir que os dados de diferentes fontes de dados e  processados de diferentes formas mantenham sua integridade, isto é, representam os valores e as regras de negócio que necessitamos que eles tenham. Se não confiamos nos dados, não confiamos nas análises feitas a partir deles.

Para garantir a integridade no processamento de dados, é importante manter um processo claro, como este:
* **definir claramente o que são dados limpos**:  no processamento de dados, há sempre uma troca entre um  nível aceitável de erro ou perda de informação.
* **conhecer a linhagem dos dados**: entender as fontes de dados e as etapas do processo de ETL permite identificar possíveis causas de erro.
* **entender o valor dos dados originais**: em cada domínio de negócio, há diferentes definições do valor dos dados brutos ou agregados. Podemos agregar os dados de vendas por mês? Precisamos manter todos os dados?  
* **validar as regras de negócio**: em cada empresa, é essencial validar as regras de negócio utilizadas para que os números finais e as análises façam sentido. E se novas regras forem utilizadas, os tomadores de decisão precisam entender o motivo e aprová-las.

Quando tratamos de bancos de dados ou dados estruturados em geral, há alguns tipos de restrições de integridade que devemos levar em consideração[^wiki]:

* **integridade de entidade** diz respeito ao conceito de chave primária; é uma regra que afirma que cada tabela deve ter uma chave primária e que a coluna ou as colunas escolhidas para serem a chave primária devem ser únicas e não nulas.

* **integridade referencial** diz respeito ao conceito de chave estrangeira; essa regra estabelece que qualquer valor de chave estrangeira pode ser apenas em um de dois estados: normalmente, o valor de chave primária de alguma tabela ou, ocasionalmente, dependendo das regras do proprietário dos dados, null; nesse último caso, afirma-se explicitamente que não há relação entre os objetos representados no banco de dados ou que essa relação é desconhecida.

* **integridade de domínio** especifica que as colunas de uma tabela em um banco de dados relacional devem ser declaradas em um domínio definido; a principal unidade de dados no modelo de dados relacionais é o item de dados; tais itens são considerados atômicos/indivisíveis; um domínio é um conjunto de valores do mesmo tipo; os domínios são, portanto, conjuntos/faixas de valores a partir dos quais os valores reais são adicionados às colunas de uma tabela.


[^wiki]: Disponível em: https://pt.wikipedia.org/wiki/Integridade_de_dados.