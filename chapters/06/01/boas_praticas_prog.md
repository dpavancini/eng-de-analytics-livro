# 6.1 Boas práticas de programação

Quando começamos a escrever um código, uma série de perguntas rapidamente surgem: como vamos chamar esse codigo? quais variáveis são necessárias? Como esse código vai ser utilizado? etc. Atualmente existem centenas ou até milhares de linguagens de programação, cada uma com suas características, melhores práticas e formatações esperadas. Obviamente que não conseguiremos falar de cada uma, e mesmo para uma linguagem específica como o Python existem dezenas de boas práticas (por exemplo, ver [PEP8](https://peps.python.org/pep-0008/)). No entanto, algumas boas práticas se repetem independentemente da linguagem.

Sempre que formos desenvolver um código precisamos lembrar que um mesmo pedaço de código pode ser escrito uma única vez, mas possivelmente ser lidos centenas ou até milhares de vezes. Dessa forma, ao escrever um código precisamos sempre pensar em nosso leitor imaginário (que muitas vezes será nós mesmos em alguns meses!).

## Comente, comente, comente!

As linguagens de progrmação em geral permitem escrever comentários no código que não serão executados. Esses comentários permitem ao leitor entender o objetivo do que foi feito e possíveis limitações. Muitas vezes ao desenvolver não prestamos atenção aos comentários para entregar um código mais rapidamente, mas isso custará caro no futuro!

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

Outro princípio importante em programação é o princípio DRY (do inglês, *don't repeat yourself*). Como o próprio nome já diz, devemos sempre evitar a repetição de trechos de código que já foram utilizados anteriormente. Para isso fazemos uso de variáveis, escrita de códigos modulares entre outras técnicas. Na prática, algumas linguagens como o SQL não facilitam muito a escrita de códigos DRY mas de qualquer forma devemos sempre tentar evitar repetições desnecessárias.

## KISS

Em programação devemos sempre buscar o código mais simples possível que atenda aos objetivos do que estamos desenvolvendo. Uma forma de lembrar esse rincípio é através do termo ["Keep it simple stupid" (ou KISS)](https://en.wikipedia.org/wiki/KISS_principle).


## Portabilidade

O princípio da **portabilidade** é possivelmente o princípio menos adotado em projetos de analytics. Quantas horas não perdemos em tentar reutilizar uma planilha ou um projeto de um colega que está recheado de referências para um arquivo "C:/PC do joão/planilha1.xlsx" e por aí vai. Ao desenvolver um projeto de código, devemos evitar variáveis "hard-coded" e garantir que o código irá rodar corretamente não importa onde ele estiver sendo executado.

```python Exemplo de importação com caminho "hard-coded"
import pandas as pd

tabela = pd.read_xlsx("C:/PC do joão/planilha1.xlsx")
```

```python Exemplo de importação com caminho relativo
import pandas as pd
import os
dados_dir = os.getcwd()
nome_arquivo = "planilha1.xlsx"

# Lê o arquivo da pasta onde o código é executado
tabela = pd.read_xlsx(dados_dir + nome_arquivo)
```
