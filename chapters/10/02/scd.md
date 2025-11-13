# 10.2 Dimensão de Alteração Lenta (SCD)

Idealmente, dimensões seriam estáticas: o código de cliente “100” sempre representaria o mesmo registro. Na prática, fontes operacionais (ERPs, CRMs) mudam dados e, às vezes, até chaves naturais. Para lidar com essas mudanças, usamos Dimensões de Alteração Lenta (Slowly Changing Dimensions — SCDs), que definem estratégias para atualizar/registrar histórico nas dimensões.

Para facilitar a implementação, alguns tipos de SCDs que abrangem a grande maioria dos casos práticos já foram definidos pela indústria. Vamos ver quais são?

## SCD Tipo 0

Não atualiza uma dimensão se o valor na tabela fonte se altera. Neste caso, o estado da tabela de dimensão fica desatualizado em relação aos dados na fonte. 

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

Atualiza uma dimensão se o valor na tabela fonte se altera, sem manter o valor anterior. Neste caso, o estado da tabela de dimensão fica atualizado em relação aos dados na fonte, porém não temos mais os dados históricos:

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

Uma dimensão com SCD Tipo 2 tem registradas as alterações ocorridas na tabela fonte e os períodos em que cada valor da dimensão esteve vigente, além do valor mais atual. Esse é o **tipo recomendado na maioria dos casos**, pois permite criar uma visão histórica das alterações nos dados.

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

Após uma mudança na tabela fonte, adicionamos um novo registro na tabela de dimensões e anotamos a validade do registro antigo até a data de modificação. Note que a chave SK da dimensão se altera, mesmo que a chave natural não tenha sido alterada. Assim, conseguimos manter a consistência e, ao mesmo tempo, preservar a imutabilidade dos dados:

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

Podem existir casos em que queremos adotar diferentes SCDs para diferentes atributos. Por exemplo, manter histórico completo da Cidade (Tipo 2) e sobrescrever o Nome (Tipo 1) quando mudanças são apenas correções. Chamamos essa dimensão de SCD híbrida.

```{admonition} Colunas padrão e testes
Em SCD Tipo 2, padronize colunas: `valid_from`, `valid_to`, `is_current` (0/1). Teste que não há sobreposição de períodos para a mesma `business_key` e que existe exatamente uma linha `is_current = 1` por `business_key`.
```

```{admonition} Implementação no MDS
Em dbt, SCD2 é muitas vezes implementado com modelos do tipo snapshot.
```
