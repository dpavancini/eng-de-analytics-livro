# 10.1 Tipos de Chaves

Já falamos sobre chaves primárias e estrangeiras, e sobre sua importância em estruturas de dados e em bancos de dados especificamente. Para fins de projetos de BI/DW, alguns tipos de chaves são relevantes.

## Chave Natural ou de Negócio

É uma chave de um sistema ou banco de dados que identifica um registro de forma única. Em muitos casos, é simplesmente chamada de `ID` ou `CÓDIGO`. Essas chaves entram na tabela dimensão como chaves de negócio, mas não devem ser usadas como chaves da dimensão. Para isso, utilizam-se as chaves de dimensão.

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

  - **Chave incremental**: uma chave autogerada pelo sistema de forma incremental (IDENTITY/SEQUENCE). Simples, performática e curta. Prefira `BIGINT` para evitar limites práticos em tabelas grandes.

  - **Chave hasheada**: gere um hash estável a partir da(s) chave(s) de negócio e, se necessário, de atributos relevantes. Útil para integração entre domínios e em engines sem `SEQUENCE`. Com hashes de 128/256 bits, colisões são improváveis para nossos volumes.

## Chave Estrangeira (FK)

Uma chave estrangeira é a chave em uma tabela de fatos que aponta para a SK de uma tabela de dimensão. Em SCD Tipo 2, a FK aponta para a versão vigente da dimensão no momento do evento — preservando histórico.

```{admonition} Boas práticas
- Prefira SK inteiras (BIGINT) por performance e tamanho; exponha a chave de negócio como coluna separada.
- Em SCD2, mantenha colunas padrão: `valid_from`, `valid_to`, `is_current` e, opcionalmente, `load_ts`, `source_system`.
- Teste unicidade na dimensão: `unique` em SK e em (`business_key`, `valid_from`) para SCD2; teste `relationships` entre fatos e dimensões.
```
