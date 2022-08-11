# 7.4 Dimensões Junk

Quando nos deparamos com dimensões que possuem poucos valores únicos (baixa cardinalidade) e não são utilizadas com tanta frequência nas tabelas de fatos, podemos otimizar nosso DW utilizando as dimensões Junk, isto é, uma tabela de dimensões onde a chave é a composição de diferentes dimensões que não tem necessariamente relação entre si. Um exemplo de tabela de dimensão junk pode ser de cores (azul, vermelho, amarelo,preto) e tamanhos (P,M,G,GG). Para evitar a criação de tabelas com atributo único e de baixa cardinalidade, podemos juntá-las utilizando apenas um atributo de chave para a combinação das dimensões:

| SK_COR_TAM | COR      | TAMANHO |
|------------|----------|---------|
| 1          | Azul     | PP      |
| 2          | Vermelho | PP      |
| 3          | Amarelo  | PP      |
| (...)      | (...)    | (...)   |