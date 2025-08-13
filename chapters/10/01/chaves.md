# 10.1 Tipos de Chaves

Já falamos sobre chaves primárias e estrangeiras, e sobre sua importância em estruturas de dados e em bancos de dados especificamente. Para fins de projetos de BI/DW, alguns tipos de chaves são relevantes.

## Chave Natural ou de Negócio

É uma chave de um sistema ou banco de dados que identifica um registro de forma única. Em muitos casos, é simplesmente chamada de ID ou CÓDIGO. Essas chaves entram na tabela dimensão como chaves de negócio, mas não devem ser usadas como chaves da dimensão. Para isso, utilizam-se as chaves de dimensão.

```{table} A coluna ID é uma chave natural ou de negócio.
| ID  | Nome            | Cidade         |
|-----|-----------------|----------------|
| 20  | João da Silva   | Rio de Janeiro |
| 25  | Carla Santos    | Curitiba       |
| 30  | Roberto Almeida | São Paulo      |
```

```{table} Na tabela dimensão, uma nova chave é criada.
| ID da dimensão | ID Cliente | Nome            | Cidade         |
|----------------|------------|-----------------|----------------|
| 1              | 20         | João da Silva   | Rio de Janeiro |
| 2              | 25         | Carla Santos    | Curitiba       |
| 3              | 30         | Roberto Almeida | São Paulo      |
```

## Chave Primária vs. Candidata vs. Alternativa

É possível que, na modelagem, não seja possível determinar a priori qual ou quais são as chaves primárias de uma tabela fonte. Neste primeiro momento, todo atributo único pode ser uma chave candidata. Após definirmos uma chave como primária, as demais tornam-se chaves alternativas. No exemplo da tabela acima, a coluna ID seria a chave primária e o nome, uma chave alternativa.

## Chave Surrogate (SK)

Uma prática recomendada para criar a chave de dimensão é utilizar uma chave que não tem nenhum significado de negócio, mas serve para gerar combinações únicas de atributos: a chamada chave surrogate. Existem algumas formas de criá-la:

  - **Chave composta**: quando se faz uma composição de diferentes colunas na tabela fonte, ela é também chamada de chave composta. Um ponto positivo é que é possível extrair algum significado dessa chave, porém nem sempre é fácil garantir que as combinações sejam únicas.

  - **Chave incremental**: uma chave autogerada pelo sistema de forma incremental. É o exemplo da tabela acima, onde a chave é uma sequência de valores inteiros. Um possível problema dessa chave na prática é que há uma limitação de  valores possíveis em tabelas muito grandes.

  - **Chave hasheada**: outra forma de gerar uma chave única a partir de diferentes campos das dimensões é utilizar uma função hash que transforma diferentes valores em uma cadeia de caracteres única. Se por um lado essa chave pode causar um pouco de estranheza para um usuário de negócio, o ponto positivo é que ela permite virtualmente infinitas combinações.

## Chave Estrangeira (FK)

Uma chave estrangeira é a chave em uma tabela de fatos que aponta para uma SK de uma tabela de dimensão.