(dimensoes)=
# Capítulo 10 - Dimensões

Dimensões  são informações de negócios que descrevem os fatos; por exemplo,  cidade, produtos, clientes, datas, etc. De forma geral, podem ser filtradas/agrupadas ou usadas como rótulos em Relatórios e Gráficos.  É comum que uma mesma Tabela Dimensão possa estar relacionada a muitas tabelas Fato, relação essa que é feita por um chave (código que representa uma informação).

Na MAS que descrevemos aqui é importante seguir o princípio de utilizar as mesmas dimensões entre todos os Data Marts, prática chamada de **Dimensões Conformadas**. Desta forma, a mesma Tabela Dimensão de produtos pode ser utilizada no Mart de Vendas e no Mart de Produção, por exemplo, facilitando a análise e cruzamentos.

Neste capítulo veremos alguns tipos de Dimensão mais encontrados em projetos de Analytics:

* Dimensão de Alteração Lenta
* *Role Playing Dimension*
* Dimensões degeneradas
* Dimensões Junk

Mas antes, vamos entender como a modelagem dimensional adapta os conceitos de chaves para o uso analítico.
