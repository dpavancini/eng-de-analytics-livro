# 7.1 Tipo de Chaves

Já falamos sobre chaves primárias e chaves estrangeiras  e sua importância em estruturas de dados e em bancos de dados especificamente. Para fins de projetos de BI/DW, alguns tipos de chaves são relevantes:

- **Chave Natural ou de Negócio**: é uma chave de um sistema ou banco de dados que identifica um registro de forma única.  Em muitos casos é simplesmente chamada de ID ou  CÓDIGO. Essas chaves entram na tabela dimensão como chaves de negócio mas não devem  ser usadas como chaves da dimensão. Para isso usaremos as chaves de dimensão.

- **Chave Primária vs Candidata vs Alternativa**: é possível que na modelagem não seja possível determinar a priori qual/quais as chaves primárias de uma tabela fonte. Neste primeiro momento, todo atributo único pode ser uma chave candidata. Após definirmos uma chave como primária, as demais tornam-se chaves alternativas.  No exemplo da  Tabela XX, a coluna ID seria a chave primária e o nome uma chave alternativa.

- **Chave  Surrogate (SK)**: uma prática desejada  para criar a chave de dimensão é utilizar uma chave que  não tem nenhum significado de negócio mas serve para gerar combinações únicas de atributos, a chamada chave surrogate. Existem algumas formas de criá-la:
  - Chave Composta:  quando  fazemos uma composição de diferentes colunas na tabela fonte, ela é também chamada de chave composta. Um ponto positivo é que possível extrair algum significado dessa chave, porém nem sempre é fácil garantir que as combinações sejam únicas.

  **Exemplo de Chave Composta**
  - Chave incremental: uma chave auto-gerada pelo sistema de forma incremental. É o exemplo da Tabela XX, onde a chave é uma sequência de valores inteiros. Um possível problema dessa chave na prática é que há uma limitação de  valores possíveis em tabelas muito grandes.
  - Chave Hasheada: outra forma de gerar uma chave única a partir de diferentes campos de dimensões é utilizar uma função hash que transforma diferentes valores em uma cadeia de caracteres única. Se por um lado essa chave pode causar um pouco de estranheza para um usuário de negócio, o ponto positivo é que ela permite virtualmente infinitas combinações.

- **Chave Estrangeira (FK)**: uma chave estrangeira é a chave em uma tabela de fatos que aponta para uma SK de uma tabela de dimensão.