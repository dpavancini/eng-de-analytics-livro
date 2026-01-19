# 9.1 Tipos de Medidas

Sempre que possível, prefira medidas aditivas: elas facilitam o entendimento, a composição de análises e a performance. Ainda assim, nem toda métrica pode (ou deve) ser somada em qualquer eixo. Três tipos clássicos ajudam a decidir como modelar e calcular:

- Aditivas: podem ser somadas ao longo de todas as dimensões. Ex.: unidades vendidas, valor de venda, custo.
- Semiaditivas: podem ser somadas ao longo de algumas dimensões, mas não do tempo. Ex.: saldo de estoque ao fim do dia; número de assinantes ativos em D+0.
- Não aditivas: não devem ser somadas; exigem agregadores específicos. Ex.: contagem distinta de clientes; taxas e médias.

Boas práticas por tipo
- Aditivas: mantenha atômicas no grão da fato. Ex.: em “item do pedido”, guarde `quantidade`, `preco_unit` e `valor = quantidade * preco_unit`.
- Semiaditivas: meça em “pontos no tempo” (snapshots) e agregue com último valor/maior valor por período, não com soma. Ex.: estoque diário → use o saldo do último dia do mês para o fechamento mensal.
- Não aditivas: calcule sob demanda no grão desejado. Ex.: “ticket médio” = SUM(valor)/COUNT(DISTINCT pedido) no período; “preço médio” = SUM(valor)/SUM(quantidade) (média ponderada), não média simples de `preco_unit`.

```{admonition} Dica
Evite pré‑calcular médias/percentuais na fato. Armazene componentes aditivos e derive métricas na camada semântica (ex.: dbt metrics/MetricFlow) ou no consumo, com o grão correto.
```
