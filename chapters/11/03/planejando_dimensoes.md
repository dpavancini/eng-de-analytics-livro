# 11.3 Planejando as dimensões

Uma técnica útil para ajudar a desenhar os  modelos é utilizar a Tabela de Planejamento de Dimensões onde conseguimos identificar as Tabelas Fato que precisamos criar, suas medidas e dimensões conformadas. Neste momento é importante definir qual o grão das Tabelas Fato que faz mais sentido para o projeto e garantir que todas as medidas em uma tabela estejam neste mesmo grão. Via de regra, queremos modelar no menor grão possível, pois embora seja possível criar tabelas derivadas em níveis maiores de agrupamento o inverso é raramente verdadeiro. 

```{table} Exemplo de Tabela de Planejamento de Dimensões
| Área de Negócio | Fato               | Medidas                                          | Dia | Produto | Cliente | Matéria-Prima | Fornecedor |
|-----------------|--------------------|--------------------------------------------------|-----|---------|---------|---------------|------------|
| Comercial       | Pedidos            | qtde_vendida, preço, valor_total, desconto       | X   | X       | X       |               |            |
| Produção        | Ordens de Produção | qtde_a_produzir, qtde_produzida, tempo_medio     | X   | X       |         |               | X          |
| Suprimentos     | Compras de MP      | quantidade_comprada, preço_compra, tempo_entrega | X   |         |         | X             | X          |
```
