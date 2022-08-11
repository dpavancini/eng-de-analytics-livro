# 6.3 O esquema estrela

A implementação do modelo dimensional em um banco de dados relacional é chamada de esquema estrela (do inglês, star schema). O centro de um esquema estrela é composto por uma tabela fato que agrupa medidas de um processo de negócio específico (ex. pedidos). A tabela fato é relacionada por diferentes tabelas dimensão que agrupam dimensões relacionadas entre si (ex. clientes, locais, produtos). Diferente do banco de dados normalizado do capítulo 4, os esquemas estrela são em geral desnormalizados e apresentam redundância. No mundo de analytics, a facilidade de consulta é mais importante que ganhos marginais de desempenho do banco de dados.

Os esquemas estrela são desenhados para responder perguntas de negócios de áreas específicas da empresa. Ao conjunto de esquemas estrela de áreas específicas é dado o nome de Data Mart. Uma empresa pode, por exemplo, possuir um data mart dos processos da área comercial, outro da produção, marketing, financeiro etc. O grau de compatibilidade entre diferentes marts depende da forma como o data warehouse foi desenvolvido e também pode variar entre as diferentes arquiteturas de data warehouses.

Para cada tabela dimensão é gerada uma chave única, em geral sem significado de negócio, chamada de surrogate key, ou em geral, SK. Nas tabelas fato, essas chaves são tratadas como chaves estrangeiras para as tabelas dimensão e sua combinação define o grão, ou granularidade, da tabela fato. Em geral, as tabelas dimensão não possuem chaves estrangeiras de modo que um esquema estrela só possui um nível de relacionamentos ou JOINS, facilitando as análises de negócio ad-hoc e por ferramentas de BI.

```{figure} ../../../assets/img/esquema_estrela.png
:name: esquema_estrela

Um esquema estrela para vendas contém fatos e dimensões
```


Note que o uso do esquema estrela evita o uso de subqueries para a grande maioria dos casos analíticos. No exemplo abaixo, a consulta de vendas por mês, cidade, representante e produto é facilmente construída em SQL (nomes de colunas foram alterados para replicar o padrão de banco de dados):

```SQL
SELECT
	datas.mes,
	locais.cidade,
	produto.nome_do_produto,
	representante.nome_do_representante,
	SUM(fato_vendas.valor_total)
FROM
	datas,
	locais,
	produto,
	representante,
	fato_vendas
WHERE
	datas.chave_data = fato_vendas.chave_data
	AND locais.chave_local = fato_vendas.chave_local
	AND produto.chave_produto = fato_vendas.chave_produto
	AND representante.chave_representante = fato_vendas.chave_representante
```

Em alguns casos pode ser necessária a inclusão de tabelas normalizadas em um data mart. Quando isso ocorre, o esquema resultante é chamado de modelo *snowflake*. Existem ainda outros tipos de tabelas como bridge e hierarquias que respondem a problemas práticos que não são completamente satisfeitos pelo esquema estrela tradicional. Em geral, a omissão ou utilização de outras estruturas no design do data warehouse possuem prós e contras e precisam ser avaliadas caso a caso pelo analista.