# 10.2 Dimensão de Alteração Lenta  (SCD)


Normalmente é preferível que as dimensões sejam imutáveis, isto é, que o mesmo código 100 em uma tabela de Clientes, por exemplo, diga respeito ao cliente João Fulano. Uma das dificuldades do analytics engineer é que em geral nós não temos controle sobre as fontes de dados (ERP, por exemplo) e não é raro que haja `UPDATEs` nas tabelas originais que alterem as chaves naturais de uma informação. Dimensões que se alteram ao longo do tempo são chamadas de Dimensão de Alteração Lenta (do inglês, *Slow Changing Dimensions*) ou simplesmente SCDs. 

Para facilitar a implementação, alguns tipos de SCDs que abrangem a grande maioria dos casos práticos já foram definidos pela indústria. Vamos ver quais são?

## SCD Tipo 0

Não atualiza uma dimensão se o valor na tabela fonte se altera. Neste caso, o estado da tabela de dimensão fica desatualizada em relação aos dados na fonte. 

```{table} Tabela Clientes
| ID Cliente | Nome          | Cidade         |
|------------|---------------|----------------|
| 20         | João da Silva | Rio de Janeiro |
```

```{table} Tabela Dim Clientes
| SK Cliente | ID Cliente | Nome          | Cidade (SCD Tipo 0) |
|------------|------------|---------------|---------------------|
| 1          | 20         | João da Silva | Rio de Janeiro      |
```

```{table} O cliente 20 **muda de endereço** e a Cidade **é alterada na tabela fonte**:
| ID Cliente | Nome          | Cidade   |
|------------|---------------|----------|
| 20         | João da Silva | Curitiba |
```

```{table} A tabela dimensão **não se altera**:
| SK Cliente | ID Cliente | Nome          | Cidade (SCD Tipo 0) |
|------------|------------|---------------|---------------------|
| 1          | 20         | João da Silva | Rio de Janeiro      |
```

## SCD Tipo 1

Atualiza uma dimensão se o valor na tabela fonte se altera sem manter o valor anterior. Neste caso, o estado da tabela de dimensão fica atualizado em relação aos dados na fonte, porém não temos mais os dados históricos:

```{table} Tabela Clientes
| ID Cliente | Nome          | Cidade         |
|------------|---------------|----------------|
| 20         | João da Silva | Rio de Janeiro |
```

```{table} Tabela Dim Clientes
| SK Cliente | ID Cliente | Nome          | Cidade (SCD Tipo 1) |
|------------|------------|---------------|---------------------|
| 1          | 20         | João da Silva | Rio de Janeiro      |
```

```{table} O cliente 20 **muda de endereço** e a Cidade **é alterada** na tabela fonte:

| ID Cliente | Nome          | Cidade   |
|------------|---------------|----------|
| 20         | João da Silva | Curitiba |
```

```{table} A tabela de dimensão se altera **sem manter o registro anterior**:

| SK Cliente | ID Cliente | Nome          | Cidade (SCD Tipo 1) |
|------------|------------|---------------|---------------------|
| 1          | 20         | João da Silva | Curitiba            |
```

## SCD Tipo 2 

Uma dimensão com SCD Tipo 2 tem registrada as alterações ocorridas na tabela fonte e os períodos onde cada valor da dimensão foi efetivo, além do valor mais atual. Esse é o **tipo recomendado na maioria dos casos**, pois permite criar uma visão histórica de alterações nos dados.

```{table} Tabela Clientes
| ID Cliente | Nome          | Cidade         | Modificado |
|------------|---------------|----------------|------------|
| 20         | João da Silva | Rio de Janeiro | 10/04/2015 |

```

```{table} Tabela Clientes
| SK Cliente | Efetivo    | Expirado | Atual | ID Cliente | Nome          | Cidade (SCD Tipo 2) |
|------------|------------|----------|-------|------------|---------------|---------------------|
| 1          | 10/04/2015 | NULL     | 1     | 20         | João da Silva | Rio de Janeiro      |
```

Após uma mudança na tabela fonte, adicionamos um novo registro na tabela de dimensões e anotamos a validade do registro antigo até a data de modificação. Note que a chave SK da dimensão se altera, mesmo que a chave natural não tenha sido alterada. Assim conseguimos ter consistência e ao mesmo tempo preservar imutabilidade dos dados:

```{table} Tabela Clientes (atualizada)
| ID Cliente | Nome          | Cidade    | Modificado |
|------------|---------------|-----------|------------|
| 20         | João da Silva | São Paulo | 8/06/2016  |
```

```{table} Tabela Dim Clientes (atualizada)
| SK Cliente | Efetivo    | Expirado  | Atual | ID Cliente | Nome          | Cidade (SCD Tipo 2) |
|------------|------------|-----------|-------|------------|---------------|---------------------|
| 1          | 10/04/2015 | 8/06/2016 | 0     | 20         | João da Silva | Rio de Janeiro      |
| 2          | 8/06/2016  | NULL      | 1     | 20         | João da Silva | São Paulo           |
```

## SCD Híbrida 

Podem existir casos onde queremos adotar diferentes SCDs para diferentes atributos. Poderíamos por exemplo querer saber o histórico completo das Cidades de um cliente (SCD Tipo 2 ) mas só nos importamos com o nome mais atual desse cliente, já que mudanças de nomes seriam provavelmente para corrigir algum erro de digitação (SCD Tipo 1). Neste caso, chamamos essa tabela de dimensão de SCD Híbrida
