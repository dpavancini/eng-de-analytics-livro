# 4.4 Trabalhando com índices

Índices são estruturas auxiliares que aceleram consultas ao apontar diretamente para a localização física dos dados. Pense neles como um sumário que evita que o banco precise ler todas as páginas de um livro para encontrar uma informação específica. Para o Engenheiro de Analytics, compreender índices é útil tanto para debugar consultas lentas em sistemas transacionais quanto para decidir se vale a pena solicitá-los em fontes de dados operacionais.

## Por que índices existem?

Quando o motor recebe uma consulta (`SELECT * FROM pedidos WHERE id = 123`), ele precisa descobrir em qual página de armazenamento esse registro está. Sem índice, o banco realiza um *full table scan*: lê página por página até encontrar a linha desejada. Com índices (geralmente implementados via árvores B+), o banco mantém um mapa ordenado dos valores e consegue chegar ao resultado em poucas operações.

```{figure} ../../../assets/img/blocos_sql.png
:name: blocos_relacional

Em bancos de dados tradicionais, os blocos armazenam linhas da tabela.
```

## Onde índices ajudam — e onde atrapalham

- **Sistemas transacionais (OLTP)**: ganham muito com índices em chaves primárias e colunas usadas em filtros ou *joins*. Isso reduz latência de APIs, sistemas ERP e aplicações web.
- **Ambientes analíticos (OLAP)**: agregam milhões de linhas de poucas colunas. Nesses casos, índices tradicionais trazem pouco benefício, pois a consulta acaba lendo grande parte da tabela. Warehouses modernos utilizam outras estratégias (particionamento, clustering).
- **Custos de escrita**: criar um índice acelera leituras, mas torna inserções e atualizações mais lentas, já que a estrutura precisa ser atualizada. É preciso equilibrar esse trade-off com times de produto.

```{figure} ../../../assets/img/blocos_colunar.png
:name: blocos_colunar

Bancos colunares armazenam colunas de forma sequencial.
```

## Tendências atuais

- **Índices automáticos**: serviços gerenciados como Aurora, BigQuery, Databricks e Snowflake sugerem ou mantêm estatísticas atualizadas para você, reduzindo o trabalho manual.
- **Clusters e *sort keys***: warehouses colunares permitem definir colunas de ordenação que aceleram filtros e *joins* sem precisar de índices tradicionais.

Quando estiver depurando uma consulta lenta, avalie se o gargalo está na origem transacional ou no warehouse. Muitas vezes, uma conversa com o time de engenharia de dados para ajustar índices e particionamento na fonte do warehouse resolve o problema mais rapidamente do que tentar “otimizar SQL” sem contexto.

```{admonition} Databricks em OLAP
:class: tip
Em Databricks SQL Warehouse (Delta), índices tradicionais não são a alavanca principal. Prefira: particionamento por colunas de filtro, `OPTIMIZE` para compactação, `ZORDER` para acelerar buscas seletivas, estatísticas atualizadas e evitar “small files” ao ingerir.
```
