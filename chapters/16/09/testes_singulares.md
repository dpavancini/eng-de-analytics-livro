# 16.9 Testes singulares para fatos

Os testes genéricos validam estrutura, mas precisamos de **testes singulares** para garantir que métricas críticas continuam corretas. Eles são arquivos `.sql` em `tests/` que retornam linhas somente quando há erro.

## Exemplo: validar o faturamento de 2012

Arquivo `tests/tst_sales_in_2012.sql`:

```sql
/* Gross sales 2012 devem permanecer entre 230.784 e 230.785 */

with sales_in_2012 as (
    select sum(gross_total) as sum_gross_total
    from {{ ref('fct_transactions') }}
    where order_date between '2012-01-01' and '2012-12-31'
)

select sum_gross_total
from sales_in_2012
where sum_gross_total not between 230784.00 and 230785.00
```

Quando `dbt test` retorna zero linhas, o teste passou; qualquer resultado indica divergência. Use essa abordagem para:

- Validar totais de receita por mês ou região.
- Comparar contagens com relatórios certificados do negócio.
- Garantir que *flags* (ex.: `had_discount`) estejam coerentes com o percentual aplicado.

> Dica: documente no README dos testes de onde veio o número “verdadeiro” (sistema legado, planilha auditada, etc.). Isso facilita reproduções futuras.
