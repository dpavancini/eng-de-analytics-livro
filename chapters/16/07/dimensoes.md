# 16.7 Criando as demais dimensões

Depois da *dim* de produtos, replicamos o padrão para clientes, funcionários e transportadoras. A lógica é:

1. **Staging dedicada** para cada tabela do ERP (`stg_erp__customers`, `stg_erp__employees`, `stg_erp__shippers`).
2. **Intermediárias** quando precisamos enriquecer dados (ex.: self-join de funcionários para descobrir o gerente).
3. **Dimensões finais** materializadas como tabelas.

### Exemplo resumido (`int_employee__self_join_for_manager.sql`)

```sql
with employees as (
    select * from {{ ref('stg_erp__employees') }}
),
self_joined as (
    select
        e.employee_pk,
        e.employee_name,
        e.employee_title,
        m.employee_name as manager_name,
        e.employee_hire_date,
        e.employee_city,
        e.employee_country
    from employees e
    left join employees m on e.manager_fk = m.employee_pk
)
select * from self_joined
```

### Dicas para acelerar

- **Mapeie colunas obrigatórias** diretamente do modelo dimensional planejado (Cap. 15).
- **Use macros para colunas repetidas** (por exemplo, `macro address_fields(model_alias)`).
- **Documente e teste à medida que cria** – cada dimensão deve sair pronta para consumo com `tests` e `docs` preenchidos.
