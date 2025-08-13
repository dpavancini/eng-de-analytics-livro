# 9.2 Tipos de Tabelas Fato

Existem três tipos principais de Tabelas Fato:

-  **Transacional**: O grão é definido ao nível de um registro individual, como um contrato ou transação.

| **FK_Dia** | **FK_Cidade** | **FK_Cliente** | **FK_Produto** | **ID_Contrato** | **Unid. Vendidas** | **Valor** |
|------------|---------------|----------------|----------------|-----------------|--------------------|-----------|
| 2019-01-01 | 10            | 5              | 2              | A1052           | 1                  | 200       |
| 2019-01-01 | 30            | 15             | 2              | A30152          | 2                  | 400       |
| 2019-01-02 | 10            | 5              | 2              | B1052           | 1                  | 200       |

**Tabela 6.2. Tabela Fato Transacional**

- **Snapshot Periódico**: O grão é definido ao nível de algum período específico, como dia, semana, etc.

| **FK_Dia** | **FK_Cidade** | **FK_Cliente** | **FK_Produto** | **Unidades** | **Valor_Total** | **Media_Desconto** |
|------------|---------------|----------------|----------------|--------------|-----------------|--------------------|
| 2019-01-01 | 10            | 5              | 2              | 1            | 800             | 7.75%              |
| 2019-01-01 | 30            | 15             | 2              | 2            | 2000            | 10%                |
| 2019-01-02 | 10            | 5              | 2              | 1            | 1000            | 11%                |

**Tabela 6.3. Tabela Fato de Snapshot Periódico**

- **Snapshot Acumulativo**: O grão representa um processo que tem um início e fim claros, por exemplo, um atendimento de suporte ou um chamado de seguro.

| **FK_Dia_Inicio** | **FK_Dia_Fim** | **FK_Cliente** | **FK_Motivo** | **Tempo_Dias** | **Valor_Total** |
|-------------------|----------------|----------------|---------------|----------------|-----------------|
| 2019-01-01        | 10             | 5              | 2             | 1              | 800             |
| 2019-01-01        | 30             | 15             | 2             | 2              | 2000            |
| 2019-01-02        | 10             | 5              | 2             | 1              | 1000            |

**Tabela 6.4. Tabela Fato de Snapshot Acumulativo**