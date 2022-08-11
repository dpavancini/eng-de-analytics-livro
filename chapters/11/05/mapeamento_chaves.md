# 9.5 Mapeamento de Chaves

Durante a modelagem é importante que o se tome cuidado com o mapeamento das chaves naturais e chaves *surrogates* entre as tabelas-fonte e tabelas do DW. Como mencionado anteriormente, o ideal é não utilizar as chaves naturais na criação das tabelas Fato e Dimensão para isolar o DW de possíveis alterações nas tabelas fonte. Para fazer esse mapeamento devemos levar em conta os diferentes tipos de dimensões que estamos modelando e, no caso de dimensões SCD Tipo 2, os períodos onde as dimensões tem validade. Como as tabelas fontes são na maioria dos casos normalizadas, esses mapeamentos devem ser realizados na fase intermediária do processo de transformação e não devem aparecer no modelo final do DW.  No exemplo abaixo temos um modelo normalizado simples de uma tabela de Pedidos em um ERP:

```{figure} ../../../assets/img/modelo_normalizado_estrela.png
:name: modelo_normalizado_estrela
:height: 450px

Exemplo de Modelo Normalizado
```

Só temos um fato no modelo (Pedido) e pelo menos três tabelas Dimensão (cliente, cidade e  data). Já o status do pedido, por ser uma tabela de baixa cardinalidade e  por simplicidade, trataremos como uma dimensão degenerada. No esquema estrela só podemos ter um `JOIN` entre a tabela de fatos e dimensões, ou seja, temos que denormalizar as tabelas de dimensões. Fazemos isso utilizando uma tabela intermediária que chamamos de `stg_clientes`, onde o prefixo stg vem de *staging* (do inglês, intermediário):

```{figure} ../../../assets/img/mapeamento_staging.png
:name: stg_clientes
:height: 450px

Exemplo de Mapeamento na Camada *Staging*
```

Para criar a tabela de dimensão clientes precisamos levar em conta que as colunas `ENDERECO` e `COD_CIDADE` podem ser alteradas na tabela fonte do ERP. Mais ainda, a fim de manter a compatibilidade histórica resolvemos acompanhar esses atributos através de um SCD Tipo 2. Isso implica que precisamos de mais algumas colunas de metadados na tabela dim_cliente para indicar quando utilizar qual valor dessas colunas na tabela de fatos. Do mesmo modo, não podemos usar o `ID_CLIENTE` da fonte como chave da `dim_cliente` porque, entre outros motivos, vamos ter IDs duplicados para o mesmo cliente na tabela de dimensão, o que não pode ocorrer.  Devemos então utilizar uma chave *surrogate*:

```{figure} ../../../assets/img/mapeamento_dimensao.png
:name: mapeamento_dim_clientes

Exemplo de Mapeamento na Camada *Dimensão*
```