# 4.2 Tipos de Dados

Ao contrário das planilhas, bancos de dados exigem disciplina com os tipos de dados para garantir integridade e desempenho. Cada coluna possui um tipo que define como os valores são armazenados, comparados e indexados. Compreender essas diferenças evita bugs sutis (como ordenar números armazenados como texto) e ajuda a escolher a representação correta para métricas, datas e atributos categóricos.

## Categorias principais

| Tipo             | Definição                                                            | Exemplos e variantes comuns                           |
|------------------|----------------------------------------------------------------------|-------------------------------------------------------|
| Character/String | Armazena cadeias de texto                                            | `CHAR`, `VARCHAR`, `TEXT`, `NVARCHAR`                 |
| Numérico         | Representa números inteiros ou com casas decimais                    | `INT`, `BIGINT`, `FLOAT`, `NUMERIC`, `DECIMAL`, `REAL` |
| Data/Hora        | Guarda datas, horários ou timestamps completos                       | `DATE`, `TIME`, `TIMESTAMP`, `DATETIME`, `INTERVAL`    |
| Booleano         | Indica valores lógicos verdadeiro/falso                              | `BOOLEAN`, `BIT`                                      |
| Binário          | Armazena sequências de bytes, normalmente para arquivos ou hashes    | `BINARY`, `VARBINARY`, `BYTEA`                        |
| Semiestruturado  | Permite dados flexíveis com chave-valor                               | `JSON`, `JSONB`, `XML`, `MAP`, `ARRAY`                |
| Outros           | Tipos específicos do banco (geográficos, variantes, monetários etc.) | `GEOGRAPHY`, `GEOMETRY`, `MONEY`, `UUID`, `STRUCT`    |

### Por que isso importa para analytics?

- **Performance**: colunas bem tipadas consomem menos espaço e facilitam compressão. Em warehouses colunares isso impacta diretamente custo e tempo de consulta.
- **Consistência**: usar `DATE` para datas e `TIMESTAMP` para registros históricos evita confusões como comparar strings `"2024-01-02"` com `"02/01/2024"`.
- **Validações**: testes automatizados ficam mais simples quando o tipo reflete o domínio esperado (por exemplo, números positivos para quantidade).
- **Integrações modernas**: warehouses na nuvem suportam tipos semiestruturados (JSON, Variant), permitindo explorar dados de eventos sem perder governança — mas é importante saber quando convertê-los para colunas tradicionais.

```{admonition} Boas práticas
:class: tip
- Evite `FLOAT` para valores monetários; prefira `DECIMAL(p,s)` com precisão adequada.  
- Converta datas e horários para tipos nativos (`DATE`/`TIMESTAMP`) o quanto antes.  
- Documente domínios de colunas (ex.: status) e converta em testes automatizados.
```

```{admonition} Exemplo de restrições → testes
:class: note
`customer_id` NOT NULL e UNIQUE; `order_date` DATE NOT NULL; `order_status` em (placed, shipped, delivered, cancelled).  
No dbt, converta cada regra em um teste (`not_null`, `unique`, `accepted_values`).
```

Como Engenheiro de Analytics, revise os tipos ao ingerir dados e ao modelar tabelas analíticas. Ajustes simples — como converter strings para inteiros ou escolher a precisão correta de um campo monetário — evitam bugs e tornam as transformações mais previsíveis.
