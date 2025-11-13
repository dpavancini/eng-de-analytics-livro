# 10.3 Dimensões degeneradas

Em projetos reais de BI/DW é comum que surjam casos nos quais há atributos que parecem não se encaixar em nenhum conceito de fatos e dimensões padrões como os apresentados anteriormente. Um exemplo comum ocorre em tabelas de Faturas onde há campos que não são medidas, mas são únicos para cada fatura. Vamos supor um modelo conceitual simples com algumas dimensões comuns em faturas:

```{figure} ../../../assets/img/fig_dim_degenerada_0.png
:name: fig_dim_degenerada_0
```

Apesar de simples, esse exemplo gera alguns desafios para o modelador. É comum que uma fatura contenha diferentes linhas que representam cada item e, geralmente, cada produto contido na fatura. Como o grão da tabela de fato passa a ser o da linha da fatura e não o da fatura em si, é comum que se tentem algumas alternativas de modelagem que acabam se mostrando insatisfatórias:

## Alternativa 1: Tabela de Dimensão Detalhada

Um caminho comum que pode ser tentado é criar uma tabela de dimensão de faturas que incluiria todas as dimensões relacionadas à fatura propriamente dita. O problema dessa abordagem é que a tabela de dimensão cresce proporcionalmente à tabela de fato (devido ao ID_FATURA na tabela abaixo) e pode se tornar muito grande, o que prejudica o desempenho do DW e deve ser evitado.

```{figure} ../../../assets/img/fig_dim_degenerada_1.png
:name: fig_dim_degenerada_1

```

## Alternativa 2: Múltiplas tabelas de Fatos

Outra possibilidade é desenhar duas tabelas de fatos, uma para a fatura e outra para as linhas de fatura, que se ligam por meio de uma relação um-para-muitos. Novamente, temos o problema de um JOIN entre duas tabelas muito grandes (*fact_fatura* e *fact_fatura_linha*) o que impacta no desempenho do Data Warehouse. Além disso, geralmente não é recomendado realizar JOIN entre tabelas de fatos devido a seus diferentes grãos.

```{figure} ../../../assets/img/fig_dim_degenerada_2.png
:name: fig_dim_degenerada_2

```

## Alternativa 3: Dimensões degeneradas

A terceira e melhor forma de modelar entidades como Faturas é por meio do uso de dimensões degeneradas, isto é, dimensões que aparecem somente na tabela de fato sem uma tabela de dimensão correspondente. No exemplo abaixo, a tabela *fact_fatura_linha* tem como chave a Fatura e o Número da Linha, ambas dimensões degeneradas.

```{figure} ../../../assets/img/fig_dim_degenerada_3.png
:name: fig_dim_degenerada_3

```

```{admonition} Quando usar
Use dimensões degeneradas para identificadores de transações que só fazem sentido no contexto da própria fato (ex.: número da fatura, número do pedido, número do bilhete). Elas possibilitam rastreabilidade sem criar uma dimensão gigantesca e redundante.
```
