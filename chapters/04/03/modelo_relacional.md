# 4.3 Modelo Relacional

Entre os diferentes tipos de bancos de dados, a abordagem dominante desde os anos 1970 até hoje é o chamado Modelo Relacional. A maior parte dos dados estruturados gerada no mundo é armazenada em tabelas (chamadas relações) dentro de bancos de dados relacionais, que incluem produtos como o Oracle SQL, Microsoft SQL Server, MySQL, PostgreSQL e muito mais.

A tabela é o núcleo de qualquer banco de dados relacional. Uma tabela é uma estrutura simples de linha e colunas e é onde estão armazenados todos os dados de um banco de dados relacional. Cada linha de uma tabela representa um registro e  possui exatamente as mesmas colunas, ainda que não necessariamente possua informações em todas elas (podem ter valores nulos). As colunas representam atributos do objeto real que estamos modelando, por exemplo, nome de um cliente, saldo de uma conta, data de um registro. Cada coluna deve conter o mesmo tipo de atributo. A combinação de cada linha e coluna é um campo (equivalente à uma célula em uma planilha) e representa a menor unidade de um banco de dados.

```{figure} ../../../assets/img/db_engines.png
:name: analisar

O modelo relacional.
```

As tabelas se relacionam entre si através de **chaves**. Uma chave é um conjunto de um ou mais atributos que unicamente definem um registro. Por exemplo, um CPF pode ser uma chave de uma tabela de clientes, pois cada cliente só pode ter um CPF.  Se um novo cliente for inserido em uma tabela com um CPF que já existia nela previamente, o banco de dados não irá gravar esse novo registro pela restrição de unicidade. Esse conceito, embora simples, permite criar aplicações muito robustas. O relacionamento entre duas tabelas (não confundir com relações) é dado pelas **chaves primárias** (PK, do inglês *Primary Key*), que define a unicidade de todos os registros em uma tabela, e pelas **chaves estrangeiras** (FK, do inglês *Foreign Key*), que descreve o relacionamento de uma coluna com a chave primária de outra tabela. 

As definições do modelo relacional são baseadas na teoria dos predicados e na teoria dos conjuntos, e são manipuladas através da linguagem SQL (do inglês, *structured query language*). Embora cada banco de dados possua seu próprio “dialeto” de SQL, os conceitos principais são na sua grande maioria os mesmos entre si.  O SQL, por sua vez, é dividido em sub-linguagens que representam diferentes operações que queremos realizar em um banco de dados:

| Dialeto                                   | Tipo de Operação                                               | Cláusulas SQL                       |
|-------------------------------------------|----------------------------------------------------------------|-------------------------------------|
| Linguagem de Definição de Dados (DDL)     | Utilizado para criar, alterar e deletar objetos (ex. tabelas). | CREATE,  ALTER, DROP                |
| Linguagem  de Manipulação de Dados (DML)  | Possui comandos que interagem com os dados dentro das tabelas. | SELECT, INSERT, UPDATE, DELETE      |
| Linguagem  de Controle de Dados (DCL)     | Controla os aspectos de autorização de dados e acessos         | GRANT, REVOKE                       |
| Linguagem de Controle de Transações (DTL) | Controla as transações                                         | BEGIN TRANSACTION, COMMIT, ROLLBACK |

Na prática, o Engenheiro de Analytics precisa entender de forma mais avançada apenas as linguagens de manipulação de dados e de definição de dados enquanto as demais são dominadas por Engenheiros de Dados, Administradores de Banco de Dados e outros profissionais especializados.
