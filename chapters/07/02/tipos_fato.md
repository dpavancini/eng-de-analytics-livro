## Tipos de Tabelas Fato

Existem três tipos principais de tabelas Fato:
-  Transacional: o grão é definido ao nível de um registro individual como um contrato ou transação.

| **FK_Dia** | **FK_Cidade** | **FK_Cliente** | **FK_Produto** | **ID_Contrato** | **Unid. Vendidas** | **Valor** |
|------------|---------------|----------------|----------------|-----------------|--------------------|-----------|
| 2019-01-01 | 10            | 5              | 2              | A1052           | 1                  | 200       |
| 2019-01-01 | 30            | 15             | 2              | A30152          | 2                  | 400       |
| 2019-01-02 | 10            | 5              | 2              | B1052           | 1                  | 200       |

**Tabela 6.2. Tabela Fato Transacional**

- Snapshot Periódico: grão definido ao nível de algum período específico, como dia, semana, etc.

| **FK_Dia** | **FK_Cidade** | **FK_Cliente** | **FK_Produto** | **unidades** | **valor_total** | **media_desconto** |
|------------|---------------|----------------|----------------|--------------|-----------------|--------------------|
| 2019-01-01 | 10            | 5              | 2              | 1            | 800             | 7.75%              |
| 2019-01-01 | 30            | 15             | 2              | 2            | 2000            | 10%                |
| 2019-01-02 | 10            | 5              | 2              | 1            | 1000            | 11%                |
**Tabela 6.3. Tabela Fato de Snapshot Periódico**

- Snapshot Acumulativo: grão é um processo que tem um início e fim claro, por exemplo um atendimento de suporte ou um chamado de seguro.

| **FK_Dia_inicio** | **FK_dia_fim** | **FK_Cliente** | **FK_Motivo** | **tempo_dias** | **valor_total** |
|-------------------|----------------|----------------|---------------|----------------|-----------------|
| 2019-01-01        | 10             | 5              | 2             | 1              | 800             |
| 2019-01-01        | 30             | 15             | 2             | 2              | 2000            |
| 2019-01-02        | 10             | 5              | 2             | 1              | 1000            |

**Tabela 6.4. Tabela Fato de Snapshot Acumulativo**