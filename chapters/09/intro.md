(fatos)=
# Capítulo 9 - Fatos

Vimos no capítulo anterior que a modelagem dimensional é baseada em dois conceitos: fatos e dimensões. Neste capítulo vamos entender o primeiro deles e como identificá-los na hora de construir um *data warehouse*.

Os Fatos (do inglês *facts*) são eventos ou medidas geradas no processo de negócio da empresa. Ex. Venda, Boleto emitido, Chamado de Suporte, etc. Em geral, uma tabela fato contém apenas chaves estrangeiras e medidas. 

Medidas (do inglês *measures*) são métricas ou medidas relevantes para a tabela fato. Ex. Unidades Vendidas, Preço. O grão ou granularidade de uma tabela fato é dado pela combinação das suas dimensões e deve ser o mesmo para todas as medidas.


|   FK_Dia   | FK_Cidade | FK_Cliente | FK_Produto | Unid. Vendidas | Valor |
|:----------:|:---------:|------------|------------|----------------|-------|
| 2019-01-01 | 10        | 5          | 2          | 1              | 200   |
| 2019-01-01 | 30        | 15         | 2          | 2              | 400   |
| 2019-01-02 | 10        | 5          | 2          | 1              | 200   |
