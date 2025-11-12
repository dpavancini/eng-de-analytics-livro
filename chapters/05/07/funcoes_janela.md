# 5.6 Funções de janela (Window Functions)

Funções de janela estendem o SQL além das agregações tradicionais. Diferente do `GROUP BY`, que “colapsa” linhas em um único resultado por grupo, uma função de janela calcula métricas por partição mantendo cada linha visível. Isso permite responder perguntas como:

- Qual a posição (ranking) de cada produto em receita dentro da sua categoria?
- Qual é o total acumulado de vendas até esta data?
- Como o valor deste mês compara com o mês anterior (variação, diferença)?
- Qual é a mediana ou percentil por cliente sem perder o detalhe linha a linha?

Sintaxe básica (varia por dialeto, mas a ideia é universal):

```sql
<funcao_agregadora_ou_analitica>() OVER (
  PARTITION BY <chaves_do_grupo>
  ORDER BY <campo_de_ordem>
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW -- opcional
)
```

Exemplo 1 — Top 3 produtos por receita em cada categoria (Northwind)

```sql
WITH receita_por_produto AS (
  SELECT p.CategoryID,
         p.ProductID,
         p.ProductName,
         SUM(od.UnitPrice * od.Quantity) AS receita
  FROM 'OrderDetail' od
  JOIN 'Product'      p ON p.ProductID = od.ProductID
  GROUP BY p.CategoryID, p.ProductID, p.ProductName
)
SELECT CategoryID,
       ProductID,
       ProductName,
       receita,
       ROW_NUMBER() OVER (
         PARTITION BY CategoryID ORDER BY receita DESC
       ) AS posicao
FROM receita_por_produto
QUALIFY posicao <= 3; -- use WHERE em dialetos sem QUALIFY encadeando uma subquery
```

Exemplo 2 — Total acumulado de vendas por mês

```sql
WITH subtotal_por_pedido AS (
  SELECT o.OrderID,
         STRFTIME('%Y-%m-01', o.OrderDate) AS mes, -- ajuste para seu dialeto
         SUM(od.UnitPrice * od.Quantity) AS subtotal
  FROM 'Order' o
  JOIN 'OrderDetail' od ON od.OrderID = o.OrderID
  GROUP BY o.OrderID, STRFTIME('%Y-%m-01', o.OrderDate)
)
SELECT mes,
       SUM(subtotal)                        AS vendas_mes,
       SUM(SUM(subtotal)) OVER (
         ORDER BY mes
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS vendas_acumuladas
FROM subtotal_por_pedido
GROUP BY mes
ORDER BY mes;
```

Exemplo 3 — Comparando com o mês anterior (LAG)

```sql
WITH vendas_mensais AS (
  SELECT STRFTIME('%Y-%m-01', o.OrderDate) AS mes,
         SUM(od.UnitPrice * od.Quantity)        AS vendas_mes
  FROM 'Order' o
  JOIN 'OrderDetail' od ON od.OrderID = o.OrderID
  GROUP BY STRFTIME('%Y-%m-01', o.OrderDate)
)
SELECT mes,
       vendas_mes,
       LAG(vendas_mes) OVER (ORDER BY mes)                 AS vendas_mes_anterior,
       vendas_mes - LAG(vendas_mes) OVER (ORDER BY mes)    AS delta,
       CASE WHEN LAG(vendas_mes) OVER (ORDER BY mes) IS NULL THEN NULL
            ELSE ROUND(100.0 * (vendas_mes - LAG(vendas_mes) OVER (ORDER BY mes))
                              / LAG(vendas_mes) OVER (ORDER BY mes), 2)
       END AS variacao_pct
FROM vendas_mensais
ORDER BY mes;
```

Quando usar e cuidados
- Prefira janelas quando precisar “olhar ao redor” de cada linha (rankings, acumulados, comparações) sem perder o detalhamento.
- Se o resultado pode ser pré‑agregado para toda a análise, `GROUP BY` costuma ser mais simples e performático.
- Funções de janela precisam de ordenação consistente; escolha colunas de ordenação estáveis e com sentido de negócio.
- Em pipelines analíticos, é comum encapsular lógicas de janelas em modelos do dbt (camada de marts), deixando notebooks e BI apenas consumirem os resultados consistentes.

```{admonition} Dica
Use janelas também para deduplicação e recência: `ROW_NUMBER() OVER (PARTITION BY id ORDER BY atualizado_em DESC)` e mantenha apenas `row_number = 1`.
```

```{note}
Dialetos e funções: nem todos os bancos implementam o mesmo conjunto de funções de janela. Ajuste sintaxe (por exemplo, `DATE_TRUNC`, `QUALIFY`) conforme BigQuery, Snowflake, Postgres, Databricks, etc.
```

Com essas técnicas, você ganha expressividade para construir métricas ricas (rankings, cohorts, médias móveis) mantendo rastreabilidade e performance na camada analítica.
