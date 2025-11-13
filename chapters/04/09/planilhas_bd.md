# 4.9 Planilhas vs. bancos de dados SQL: quais as diferenças?

Planilhas eletrônicas (Excel, Google Sheets) convivem com bancos de dados em praticamente todas as empresas. Ambos apresentam dados em linhas e colunas, mas servem a propósitos distintos. No entanto, existem diferenças fundamentais entre os dois que impactam diretamente a confiabilidade e o desempenho.

## Consistência

- **Planilhas**: permitem misturar textos, números e fórmulas na mesma coluna. Ótimo para prototipar, porém arriscado para manter dados críticos para operação.
- **Bancos SQL**: aplicam tipos de dados e validam entradas automaticamente. Inserções inválidas resultam em erros, preservando a integridade.

## Reprodutibilidade

- **Planilhas**: para realizar consultas ou transformações em uma planilha, é necessário descrever manualmente cada passo. O resultado final (os dados) e o processo utilizado se misturam, sem um padrão claro de reprodução. Dependendo das operações realizadas, pode ser impossível retornar ao estado inicial dos dados. Além disso, para compartilhar a análise, é preciso enviar o próprio arquivo da planilha.
- **Bancos SQL**: Em SQL, descrevemos o que queremos consultar, e o banco de dados se encarrega de decidir como executar a consulta. Essa separação entre a camada de processamento e a camada de dados permite compartilhar apenas as instruções (por exemplo, um simples arquivo .sql), mantendo os dados protegidos e garantindo reprodutibilidade muito superior à das planilhas.

## Relacionamentos

- **Planilhas**: Em planilhas usadas como “bancos de dados informais”, é comum recorrer a funções como PROCV() ou ÍNDICE(CORRESP()) para simular chaves estrangeiras. Embora funcionem em casos simples, essas soluções são frágeis — aumentam o risco de erros, dados sem correspondência e resultados inconsistentes. De modo geral, quando o uso dessas funções se torna recorrente, é um claro sinal de que o cenário já exige um banco de dados relacional.
- **Bancos SQL**: Um dos pilares dos bancos de dados relacionais é o uso de chaves para conectar informações. Por exemplo, cada fatura em uma tabela de faturas se relaciona a um único cliente em uma tabela de clientes por meio de uma chave estrangeira. Esses relacionamentos formais facilitam consultas, evitam duplicidades e garantem a consistência dos dados.

## Performance e volume

- **Planilhas**: têm limite prático de desempenho (milhares ou poucas centenas de milhares de linhas). Operações complexas ficam lentas e instáveis.
- **Bancos SQL**: foram projetados para milhões ou bilhões de registros, com índices, particionamento e execução paralela.

## Colaboração e governança

- **Planilhas**: são fáceis de compartilhar, mas difíceis de controlar. Alterações simultâneas podem gerar conflitos e versões divergentes.
- **Bancos SQL**: permitem permissões granulares, logs de auditoria, replicação e *backups* automáticos.

```{admonition} Reprodutibilidade e versionamento
:class: note
Consultas e transformações versionadas (ex.: dbt + Git) melhoram rastreabilidade, colaboração e auditoria, algo difícil de sustentar apenas com planilhas compartilhadas.
```
