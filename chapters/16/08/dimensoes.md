# 16.8 Criando as demais dimensões

Na seção seção 16.3 (primeira dimensão), modelamos a dimensão (`dim_products`) passando pelo fluxo completo `staging → intermediate → marts`. A partir daqui, vamos repetir o mesmo raciocínio para criar as demais dimensões do projeto da Northwind.

Vamos partir de um pressuposto importante: **toda a camada `staging` já está modelada** (modelos `stg_` com renome, tipagem e chaves definidas). O foco agora é apenas **da camada `intermediate` para frente**, ou seja, como publicar dimensões consistentes para consumo no *mart*. Para conferir sua camada `staging` cheque o repositório de exemplo do livro na branco `recursos`.

No blueprint dimensional do projeto, as dimensões restantes são:

- `dim_customers`
- `dim_shippers`
- `dim_employees` (com atenção para a hierarquia/auto-relação)

## Um princípio para decidir “se precisa de intermediate”

Uma regra prática: **se a dimensão for 1:1 com uma entidade do ERP e já estiver limpa no `staging`**, você pode publicá‑la diretamente em `marts` com um `select` do `stg_`.

Você cria um modelo `intermediate` quando precisa:

- **Enriquecer** a entidade com atributos de outras tabelas (via `join`).
- **Resolver hierarquias** (como o “funcionário → gerente”).
- **Centralizar regras reutilizáveis** por várias dimensões/fatos.

O motivo é de modelagem dimensional: **dimensões devem ser descritivas e fáceis de consumir**, e a complexidade (joins e regras) deve ficar “atrás” do contrato final, evitando que ferramentas de BI ou usuários tenham que recriar lógicas e correr o risco de duplicações.

## Dimensão de clientes (`dim_customers`)

A dimensão de clientes, neste projeto, é direta: a entidade `customers` já chega pronta no `stg_erp__customers`, com 1 linha por cliente e atributos descritivos (nome, contato, cidade, país, etc.).

Como não há enriquecimentos necessários, o modelo em `marts` funciona como uma “publicação” do contrato final:

`models/marts/dim_customers.sql`

```sql
with
    customers as (
        select *
        from {{ ref('stg_erp__customers') }}
    )

select *
from customers
```

Note que não fazemos `join` aqui. Isso preserva o grão da dimensão (1 linha por cliente) e mantém o relacionamento com as tabelas fato simples: fatos trazem `customer_fk`, e essa chave encontra exatamente 1 linha na dimensão.

## Dimensão de transportadoras (`dim_shippers`)

Transportadoras (`shippers`) também são diretas: 1 linha por transportadora, atributos simples e sem necessidade de enriquecimento no nosso *mart*.

`models/marts/dim_shippers.sql`

```sql
with
    shippers as (
        select *
        from {{ ref('stg_erp__shippers') }}
    )

select *
from shippers
```

## Dimensão de funcionários (`dim_employees`) e a hierarquia de gerência

Funcionários (`employees`) exigem um cuidado a mais: o ERP costuma armazenar a hierarquia usando uma **chave estrangeira auto-referenciada** (um funcionário aponta para outro funcionário como gerente).

Em modelo relacional isso é normalizado (uma tabela referenciando a si mesma). Em dimensional, costuma ser melhor **materializar atributos úteis** na própria dimensão (por exemplo, `manager_name`), para facilitar filtros e agrupamentos sem obrigar um auto-join no BI.

### Modelo intermediate: `int_employee__self_join_for_manager`

Aqui aplicamos um *self join* para trazer o nome do gerente para cada funcionário. Repare nos princípios de join:

- **Junção many-to-one**: muitos funcionários podem apontar para o mesmo gerente (`manager_fk → employee_pk`). Isso não “explode” linhas; mantém 1 linha por funcionário.
- **`left join`**: existe funcionário sem gerente (topo da hierarquia). O `left join` preserva esses registros e retorna `manager_name` nulo quando apropriado.

`models/intermediate/int_employee__self_join_for_manager.sql`

```sql
with
    employees as (
        select *
        from {{ ref('stg_erp__employees') }}
    )

    , self_joined as (
        select
            employees.employee_pk
            , employees.employee_name
            , employees.employee_title
            , managers.employee_name as manager_name
            , employees.employee_birth_date
            , employees.employee_hire_date
            , employees.employee_city
            , employees.employee_region
            , employees.employee_country
        from employees
        left join employees as managers
            on employees.manager_fk = managers.employee_pk
    )

select *
from self_joined
```

Esse é um bom exemplo do papel da camada `intermediate`: **resolver uma complexidade estrutural (hierarquia)** e entregar um dataset pronto para publicação.

### Modelo marts: `dim_employees`

Com a hierarquia resolvida em `intermediate`, a dimensão final fica simples: ela publica o modelo intermediário como contrato de consumo.

`models/marts/dim_employees.sql`

```sql
with
    employees as (
        select *
        from {{ ref('int_employee__self_join_for_manager') }}
    )

select *
from employees
```

Na prática, isso permite análises como “vendas por funcionário” e “vendas por gerente” usando apenas atributos da dimensão (sem joins adicionais no BI), mantendo o esquema estrela simples e consistente.
