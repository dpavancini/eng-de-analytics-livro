# 7.3 Dimensões degeneradas

Em projetos reais de BI/DW é comum que surjam casos onde há atributos que parecem não se encaixar em nenhum conceito de fatos e dimensões padrões como os apresentados anteriormente. Um exemplo comum é em tabelas de Faturas onde há campos que não são medidas mas que são únicos entre cada fatura. Vamos supor um modelo conceitual simples abaixo com algumas dimensões comuns em faturas:

Figura 17. 

Apesar de simples, esse exemplo gera alguns desafios para o modelador. Isso porque é comum que uma fatura contenha diferentes linhas, que representam cada item e geralmente cada produto contido na fatura. Como o grão da tabela de fato passa a ser o da linha da fatura e não da fatura em si, é comum que algumas alternativas de modelagem sejam tentadas que acabam se mostrando insatisfatórias:


## Alternativa 1: Tabela de Dimensão Detalhada

Um caminho comum que pode ser tentado é criar uma tabela de dimensão de faturas que incluiria todas as dimensões relacionadas à fatura propriamente dita. O problema dessa abordagem é que a tabela de dimensão cresce proporcionalmente à tabela de fatos (devido ao ID_FATURA na tabela abaixo) e pode se tornar muito grande, o que prejudica o desempenho do DW e deve ser evitado.

Figura 18. 

## Alternativa 2: Múltiplas tabelas de Fatos
Uma outra possibilidade é desenhar duas tabelas de fatos, uma de fatura e uma de linhas de fatura, que se ligam em uma relação um-para-muitos.  De novo temos o problema de um JOIN entre duas tabelas muito grandes (fact_fatura e fact_fatura_linha) que impacta no desempenho do Data Warehouse. Além disso, é geralmente não recomendado realizar JOIN entre tabela de fatos devido à diferentes grãos.

Figura 19. 

## Alternativa 3: Dimensões degeneradas

A terceira e melhor forma de modelar entidades como Faturas é através do uso de dimensões degeneradas, isto é, dimensões que aparecem somente na tabela de fatos sem uma tabela de dimensão correspondente. No exemplo abaixo, a tabela de fact_fatura_linha tem como chave a Fatura e o Número da Linha, ambas dimensões degeneradas.

Figura 20. 
