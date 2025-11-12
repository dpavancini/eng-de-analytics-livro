# 6.1 Boas práticas de programação

Antes de qualquer ferramenta, a qualidade de um projeto de analytics depende de código claro, previsível e reutilizável. As práticas abaixo valem para SQL, Python, dbt ou notebooks — e são a base para colaboração, testes e automação.

Sempre que escrevemos código, ele será lido muitas vezes depois (inclusive por você no futuro). Otimize para leitura e manutenção, não para “escrever rápido”.

## Nomenclatura e organização

- Use nomes descritivos para variáveis, funções e arquivos (evite `x`, `tmp` e `final.sql`).
- Prefira funções pequenas que fazem uma coisa bem definida; componha funções maiores a partir delas.
- No SQL, padronize alias e prefixos: `dim_`, `fct_`, `stg_` ajudam a entender o papel das tabelas.

## Formatação e estilo

- Siga guias de estilo: Python com [PEP8](https://peps.python.org/pep-0008/) e SQL com um guia consistente (indentação, regras para keywords, quebras de linha). Veja um exemplo em [Indicium SQL Style Guide](https://bitbucket.org/indiciumtech/indicium-code-style/src/master/sql_style_guide.md). Ferramentas como `black`, `ruff` e `sqlfluff` ajudam a padronizar.
- Prefira expressões explícitas a “truques” compactos.

## Comente, comente, comente!

As linguagens de programação em geral permitem escrever comentários no código que não serão executados. Esses comentários permitem ao leitor entender o objetivo do que foi feito e possíveis limitações. Muitas vezes ao desenvolver não prestamos atenção aos comentários para entregar um código mais rapidamente, mas isso terá um custo alto no futuro!

```sql Exemplo de comentário em SQL

/*Selecione todas as colunas da minha_tabela:*/

SELECT * FROM minha_tabela -- Este é outro comentário em SQL
```

```python Exemplo de comentário em Python

# Este é um comentário em Python
my_var = 5
other_var = 10

def sum_var(x,y):
    ''' Este é outro comentário em Python chamado docstrings '''
    return x + y

sum_var(my_var, other_var)

```

## DRY

Outro princípio importante em programação é o princípio DRY (do inglês, *don't repeat yourself*). Como o próprio nome já diz, devemos sempre evitar a repetição de trechos de código que já foram utilizados anteriormente. Para isso, fazemos uso de variáveis,códigos modulares, entre outras técnicas. Na prática, algumas linguagens como o SQL não facilitam muito a escrita de códigos DRY mas de qualquer forma devemos sempre tentar evitar repetições desnecessárias.

## KISS

Em programação devemos sempre buscar o código mais simples possível que atenda aos objetivos do que estamos desenvolvendo. Uma forma de lembrar esse princípio é através do termo ["Keep it simple stupid" (ou KISS)](https://en.wikipedia.org/wiki/KISS_principle).


## Portabilidade

Evite caminhos “hard-coded” e dependências do ambiente local. Prefira caminhos relativos, variáveis de ambiente e arquivos de configuração. Isso facilita reproduzir o projeto em outra máquina ou no CI/CD.

```python Exemplo com caminho hard-coded (evitar)
import pandas as pd

tabela = pd.read_excel("C:/PC do Joao/planilha1.xlsx")
```

```python Exemplo portátil com caminho relativo
import os
import pandas as pd

base_dir = os.getcwd()  # ou use Path(__file__).parent para scripts
nome_arquivo = "planilha1.xlsx"

tabela = pd.read_excel(os.path.join(base_dir, nome_arquivo))
```

## Tratamento de erros e logs

- Trate exceções previsíveis e registre logs úteis (contexto, inputs-chave). Evite engolir erros silenciosamente.
- Estruture logs por etapa do pipeline (ingestão, transformação, carga) para facilitar debugging.

## Configuração e segredos

- Separe configuração de código: use arquivos `.env`, variáveis de ambiente ou um gerenciador de segredos (ex.: Vault) — nunca faça commit de senhas.
- Versione configurações “template” (ex.: `.env.example`) e documente chaves obrigatórias.
