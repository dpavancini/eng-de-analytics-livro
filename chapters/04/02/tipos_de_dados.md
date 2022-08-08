## 4.2 Tipos de Dados

Diferente de planilhas, bancos de dados em geral não permitem misturar diferentes tipos de dados em uma mesma coluna.  Ao manipular e consultar bancos de dados é necessário entender quais os tipos de dados de cada coluna e assim saber as operações que podem ser realizadas com eles. Mas afinal, o que são tipos de dados?

Em computação, tipos de dados são uma combinação de valores e operações que permitem ao computador entender como armazenar esses dados na memória. Variantes de um tipo de dados podem diferir quanto ao tamanho máximo do dado que permitem armazenar, precisão, formato aceito, entre outros.  Em bancos de dados, é comum que cada coluna ou atributo tenha um único tipo, sendo os mais comuns:


| Tipo             | Definição                                                           | Variantes Comuns                   |
|------------------|---------------------------------------------------------------------|------------------------------------|
| Character/String | Armazena caracteres textuais                                        | Char, Varchar, Text                |
| Numeric          | Armazena valores numéricos                                          | Int, Float, Numeric ,Decimal, Real |
| Date/time        | Armazena valores de data e hora                                     | Date, Time, Datetime               |
| Binary           | Armazena valores binários (0 e 1s)                                  | Binary                             |
| Outros           | Armazena objetos variados como imagens, áudios, JSON, entre outros. | Blob, XML, JSON                    |