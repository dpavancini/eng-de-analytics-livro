(dimensoes)=
# Capítulo 10 - Dimensões

Dimensões são informações de negócios que descrevem os fatos; por exemplo, cidade, produtos, clientes, datas, etc. De forma geral, podem ser filtradas/agrupadas ou usadas como rótulos em relatórios e gráficos. É comum que uma mesma Tabela Dimensão possa estar relacionada a muitas tabelas Fato, relação essa que é feita por uma chave (código que representa uma informação).

No Modern Data Stack, é importante seguir o princípio de utilizar as mesmas dimensões entre todos os Data Marts, prática chamada de **Dimensões Conformadas**. Dessa forma, a mesma Tabela Dimensão de produtos pode ser utilizada no Mart de Vendas e no Mart de Produção, por exemplo, facilitando a análise e o cruzamento de dados.

Neste capítulo, veremos alguns tipos de dimensão mais encontrados em projetos de Analytics:

* Dimensão de Alteração Lenta
* *Role Playing Dimension*
* Dimensão Degenerada
* Dimensão Junk

Mas, antes, vamos entender como a modelagem dimensional adapta os conceitos de chaves para o uso analítico.