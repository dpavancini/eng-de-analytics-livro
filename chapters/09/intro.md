(fatos)=
# Capítulo 9 - Fatos

Vimos no capítulo anterior que a modelagem dimensional é baseada em dois conceitos: fatos e dimensões. Neste capítulo, vamos aprofundar o primeiro deles e como identificá‑lo corretamente para construir um data warehouse consistente e útil.

Fatos (do inglês, facts) representam eventos, ocorrências ou estados medidos em um processo de negócio. Exemplos: uma venda (item do pedido), um boleto emitido, uma visita ao site, um atendimento de suporte. Em geral, uma tabela fato contém chaves estrangeiras para dimensões e colunas numéricas (medidas) compatíveis com o seu grão.

Medidas (do inglês, measures) são os valores numéricos relevantes do processo: unidades vendidas, valor, custo, desconto, tempo de atendimento. O grão (granularidade) de uma tabela fato — o que cada linha representa — é definido pela combinação das dimensões. Todas as medidas da fato devem ser coerentes com esse grão.


|   FK_Dia   | FK_Cidade | FK_Cliente | FK_Produto | Unid. Vendidas | Valor |
|:----------:|:---------:|------------|------------|----------------|-------|
| 2019-01-01 | 10        | 5          | 2          | 1              | 200   |
| 2019-01-01 | 30        | 15         | 2          | 2              | 400   |
| 2019-01-02 | 10        | 5          | 2          | 1              | 200   |

```{admonition} Dica
Defina explicitamente o grão antes de modelar: “uma linha por item de pedido e data do pedido”, por exemplo. Isso guia as chaves, as medidas e evita ambiguidades e duplicações.
```

```{admonition} Cuidado
Evite armazenar taxas ou médias na tabela fato. Prefira manter medidas atômicas (quantidades, valores) e derivar médias/percentuais na camada semântica ou no consumo, no grão correto (ex.: média ponderada por quantidade).
```
