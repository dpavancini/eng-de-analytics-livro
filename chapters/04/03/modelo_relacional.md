# 4.3 Modelo Relacional

Desde a década de 1970, o modelo relacional domina o cenário de dados estruturados. É nele que residem boa parte das aplicações transacionais, sistemas legados e até warehouses modernos. Entender seus fundamentos é essencial para navegar pelas fontes que alimentam um data warehouse e para escrever consultas consistentes.

## Estrutura básica

Uma tabela relacional organiza dados em linhas (registros) e colunas (atributos). Cada linha representa uma ocorrência de uma entidade (cliente, pedido, pagamento) e cada coluna descreve uma característica desse objeto. Assim como em uma planilha, a interseção entre linha e coluna forma um campo; diferente da planilha, o tipo de dado é rigidamente controlado e quem garante a consistência é o SGBD.

```{figure} ../../../assets/img/04_03_db_engines.png
:name: analisar

O modelo relacional.
```

Tabelas se conectam por meio de **chaves**:

- **Chave primária (PK, do inglês *Primary Key*)**: identifica unicamente cada linha de uma tabela. Ex.: `customer_id`.
- **Chave estrangeira (FK, do inglês *Foreign Key*)**: cria o vínculo entre tabelas ao referenciar a PK de outra tabela. Ex.: `orders.customer_id` apontando para `customers.customer_id`.

Com essas relações, conseguimos garantir integridade referencial, evitar duplicidade de registros e construir consultas que cruzam múltiplas tabelas via `JOIN`.

**Nota:** Em alguns cenários, especialmente em tabelas fato ou tabelas de relacionamento, a chave primária é composta pela combinação de duas ou mais colunas. Ao unir atributos como `order_id` e `product_id`, por exemplo, garantimos a unicidade de cada ocorrência sem necessariamente precisar de uma coluna artificial.

## SQL e suas sub-linguagens

O modelo relacional é manipulado por SQL (*Structured Query Language*). Apesar dos “dialetos” específicos de cada banco (PostgreSQL, MySQL, SQL Server), a base da linguagem permanece consistente e se divide em quatro grupos principais:

| Subconjunto                               | Objetivo                                                          | Comandos típicos                    |
|-------------------------------------------|-------------------------------------------------------------------|-------------------------------------|
| Linguagem de Definição de Dados (DDL)     | Criar, alterar e remover objetos                                  | `CREATE`, `ALTER`, `DROP`           |
| Linguagem de Manipulação de Dados (DML)   | Inserir, consultar e alterar registros                            | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| Linguagem de Controle de Dados (DCL)      | Conceder ou revogar privilégios                                   | `GRANT`, `REVOKE`                   |
| Linguagem de Controle de Transações (TCL) | Garantir atomicidade e consistência de transações                 | `BEGIN`, `COMMIT`, `ROLLBACK`       |

Para analytics engineering, o foco recai em DDL e DML — afinal, criamos tabelas, *views* e modelos, além de ler e transformar dados. Ainda assim, é útil entender permissões (DCL) e transações (TCL), especialmente quando colaboramos com times de engenharia de dados ou administradores de banco.
