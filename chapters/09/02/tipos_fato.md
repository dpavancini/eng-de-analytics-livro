# 9.2 Tipos de Tabelas Fato

Existem três tipos principais de tabelas fato. Escolher o tipo correto depende da natureza do processo e da forma como as métricas evoluem no tempo.

-  Transacional: o grão é o evento atômico (ex.: item do pedido, pagamento, clique). Excelente para análises detalhadas e flexíveis.

| **FK_Dia** | **FK_Cidade** | **FK_Cliente** | **FK_Produto** | **ID_Contrato** | **Unid. Vendidas** | **Valor** |
|------------|---------------|----------------|----------------|-----------------|--------------------|-----------|
| 2019-01-01 | 10            | 5              | 2              | A1052           | 1                  | 200       |
| 2019-01-01 | 30            | 15             | 2              | A30152          | 2                  | 400       |
| 2019-01-02 | 10            | 5              | 2              | B1052           | 1                  | 200       |

Exemplo — Fato Transacional

- Snapshot Periódico: captura o estado em cortes regulares (dia, semana, mês). Útil para saldos/semiaditivos (estoque, assinantes ativos) e KPIs de fechamento.

| **FK_Dia** | **FK_Cidade** | **FK_Cliente** | **FK_Produto** | **Unidades** | **Valor_Total** | **Media_Desconto** |
|------------|---------------|----------------|----------------|--------------|-----------------|--------------------|
| 2019-01-01 | 10            | 5              | 2              | 1            | 800             | 7.75%              |
| 2019-01-01 | 30            | 15             | 2              | 2            | 2000            | 10%                |
| 2019-01-02 | 10            | 5              | 2              | 1            | 1000            | 11%                |

Exemplo — Fato de Snapshot Periódico

- Snapshot Acumulativo: acompanha um processo com início e fim (pipeline de vendas, atendimento de suporte). Inclui múltiplas chaves de data (início, etapas, término) para calcular tempos de ciclo e funis.

| **FK_Dia_Inicio** | **FK_Dia_Fim** | **FK_Cliente** | **FK_Motivo** | **Tempo_Dias** | **Valor_Total** |
|-------------------|----------------|----------------|---------------|----------------|-----------------|
| 2019-01-01        | 2019-01-02     | 5              | 2             | 1              | 800             |
| 2019-01-01        | 2019-01-03     | 15             | 2             | 2              | 2000            |
| 2019-01-02        | 2019-01-03     | 5              | 2             | 1              | 1000            |

Exemplo — Fato de Snapshot Acumulativo

Outros padrões úteis
- Fato sem medidas (factless fact): registra a ocorrência de um evento ou a cobertura (ex.: presença em um curso, elegibilidade de promoções). As “medidas” são contagens derivadas no consumo.
- Fato agregada: pré‑agrega uma transacional para melhorar performance em consultas frequentes (ex.: vendas por dia/produto/loja). Útil pontualmente; mantenha a transacional como fonte de verdade e documente regras para evitar dupla contagem.

```{admonition} Cuidado
Não misture grãos em uma mesma fato (ex.: itens e pedidos). Isso causa duplicidade e métricas inconsistentes. Se precisar de ambos, mantenha tabelas separadas e defina métricas claramente (e/ou use camada semântica para compor).
```
