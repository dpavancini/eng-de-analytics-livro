# 16.3 Criando a primeira dimensão

A primeira dimensão que iremos modelar será a dimensão de produtos. A partir dela, vamos aprender conceitos-chave do dbt e como organizar um projeto em camadas. Neste exemplo, passaremos pelo fluxo completo `source → staging → intermediate → marts`. A mesma lógica será repetida nas demais entidades.

Antes de entrar no dbt, vale recapitular o blueprint dimensional da Northwind que guia o projeto abordado na seção 15.3 {ref}`northwind_datamodel`:

- **Fatos**:
  - **`fct_orders`**: grão de 1 linha por pedido; relaciona-se com **clientes**, **funcionários** e **transportadoras**.
  - **`fct_transactions`**: grão de 1 linha por item de pedido; referencia as mesmas dimensões e adiciona **produtos**.
- **Dimensões**:
  - **`dim_products`**: produto enriquecido com atributos de **categoria** e **fornecedor** (tratados como atributos para simplificar o consumo).
  - **`dim_customers`**, **`dim_employees`**, **`dim_shippers`**: derivam diretamente do processo de vendas, com `employees` exigindo atenção para a auto-relação/hierarquia.

Nesta seção começaremos pela **`dim_products`**, que mais adiante será consumida por `fct_transactions`.

Ao longo do caminho, vamos entender como definir *sources* no dbt, como criar modelos, testes e documentação, e por que a estrutura de pastas é tão importante para separar as responsabilidades das camadas *staging*, *intermediate* e *marts*.

## Conectando fontes

No dbt, um **source** é o “ponto de partida” da linhagem: uma tabela que já existe no *data warehouse/lakehouse* e que será consumida pelos modelos. Definir sources traz dois benefícios imediatos:

- **Governança e entendimento**: o dbt passa a “conhecer” de onde os dados vêm, com descrição e contexto.
- **Confiabilidade**: você pode aplicar testes diretamente nas fontes (por exemplo, garantir que uma coluna-chave não seja nula) e detectar problemas antes de eles se propagarem pelas camadas.

Sources são definidos em arquivos `.yml` porque eles descrevem **metadados** (nomes, descrições, banco/schema, tabelas e testes). É uma camada declarativa: em vez de “esconder” esses detalhes dentro de SQL, o dbt centraliza as definições e usa esse arquivo para construir o catálogo e a documentação do projeto.

No nosso caso, criaremos o arquivo `models/staging/erp/_source_erp.yml` para descrever três tabelas do catálogo `raw.erp_northwind`. Escolhemos **`categories`**, **`products`** e **`suppliers`** porque são os ingredientes necessários para montar a nossa primeira dimensão (`dim_products`): o produto em si e seus atributos de categoria e fornecedor.

Você vai notar que o arquivo está dentro de `models/staging/erp/`. Isso é intencional: por padrão, organizamos a camada **staging** separando cada **fonte** em sua própria pasta (por exemplo, `erp`, `crm`, `payments`). Isso mantém o projeto escalável: cada domínio de origem tem seus sources e modelos `stg_` juntos, com convenções e testes próximos do dado bruto.

```yaml
version: 2

sources:
  - name: erp
    description: Northwind sales system.
    schema: erp_northwind
    database: raw
    tables:
      - name: categories
        description: Contains product category definitions such as name and description.

      - name: products
        description: Contains information about all products sold, including pricing and inventory levels.

      - name: suppliers
        description: Contains information about product suppliers such as company name and location.
```

O arquivo de *sources* foi definido no exemplo acima. No dbt, obrigatoriamente uma *source* precisa ter `name` e aqui escolhemos o nome do sistema (`erp`). Adicionamos uma `description` (opcional) e também definimos o `schema` em que as tabelas fonte estão, que é `erp_northwind`. Se tivéssemos nomeado a fonte como `erp_northwind`, a definição de `schema` seria opcional: o dbt usa o nome da *source* como `schema` quando o `schema` não é definido. Por último, definimos o `database`(catalog) em que esse `schema` está, que é `raw`. No dbt, `database` serve também como definição do `catalog`.

Com o arquivo de *sources* criado, agora podemos referenciar essas tabelas em qualquer modelo usando a macro `source`. Ela recebe dois argumentos — o nome da *source* e o nome da tabela — no formato `{{ source('<source_name>', '<source_table>') }}`.

Por exemplo, para ler a tabela `categories` definida no source `erp`:

```sql
select *
from {{ source('erp', 'categories') }}
```

O trecho `{{ ... }}` é sintaxe do Jinja (o motor de templates usado pelo dbt). Quando o projeto é compilado, o dbt resolve essa referência para o objeto físico no *warehouse* (database/schema/table). Neste projeto, isso resulta em algo equivalente a:

```sql
select *
from raw.erp_northwind.categories
```

## Modelos staging: Blocos padronizados de construção

A camada **staging** é o primeiro “filtro” entre o dado bruto e o dado modelado. Aqui, o objetivo é **padronizar** e **deixar o dado utilizável**, sem “misturar” regras complexas de negócio.

O que você normalmente faz em *staging*:

- Seleciona o que vai ser usado (colunas relevantes).
- Padroniza tipos (`cast`), nomes e convenções (`snake_case`).
- Corrige pequenas inconsistências estruturais do dado bruto (por exemplo: `null`/`0`, *booleans*, *strings*).

O que você **evita** fazer em *staging*:

- Agregações e métricas de negócio.
- Junções entre tabelas de domínios diferentes (isso fica para *intermediate/marts*).
- Regras complexas que dificultam reaproveitamento.

Repare no uso da macro `{{ source('erp', 'products') }}`. Ela referencia a tabela de origem definida no `.yml` (neste caso, o source `erp` e a tabela `products`). Isso torna a linhagem explícita, ajuda o dbt a construir o DAG e reduz “strings soltas” com nomes de tabelas no SQL.

Outra boa prática é manter uma relação **1:1 entre source e modelo `stg_`**: para cada tabela bruta, criamos um modelo de *staging* correspondente. Isso aumenta a modularidade e facilita depuração: se algo mudar no dado de origem (ou se um teste falhar), fica claro qual modelo `stg_` precisa ser ajustado.

Por isso a nomenclatura recomendada é `stg_<source>__<tabela_fonte>.sql`. No exemplo abaixo, `stg_erp__products.sql` pega `products` do source `erp`, aplica casts e renomeia colunas. Note também a padronização de chaves: **PK** no topo, depois **FKs**, e em seguida atributos descritivos. Esse padrão deixa o modelo mais legível e consistente ao longo do projeto.

```sql
with
    source_products as (
        select *
        from {{ source('erp', 'products') }}
    )

    , renamed as (
        select
            cast(id as int) as product_pk
            , cast(supplierid as int) as supplier_fk
            , cast(categoryid as int) as category_fk
            , cast(productname as string) as product_name
            , cast(quantityperunit as string) as quantity_per_unit
            , cast(unitprice as numeric(18,2)) as unit_price
            , cast(unitsinstock as int) as units_in_stock
            , cast(unitsonorder as int) as units_on_order
            , cast(reorderlevel as int) as reorder_level
            , discontinued as is_discontinued
        from source_products
    )

select *
from renamed
```

Crie `stg_erp__categories.sql` e `stg_erp__suppliers.sql` seguindo o mesmo padrão (renomeando colunas e ajustando tipos).

## Modelos intermediate: Entidade produto

A camada **intermediate** é onde começamos a compor entidades de negócio a partir dos `stg_`. Aqui é comum aplicar transformações mais estruturais, como:

- Junções entre tabelas do mesmo domínio (por exemplo, enriquecer produtos com categoria e fornecedor).
- Regras de negócio reaproveitáveis por mais de um *mart*.
- Cálculos e derivação de atributos.

O que você **evita** fazer em *intermediate*:
- Expor modelos *intermediate* como “tabelas finais” para usuários finais (BI/dashboards).
- Publicar esses modelos no mesmo schema de consumo (por exemplo, `marts`) e/ou documentá‑los como entregáveis.

Na prática, você implementa isso mantendo *staging*/*intermediate* em schemas próprios (por exemplo, `stg` e `int`) e publicando apenas os modelos finais em `marts`.

Nesta camada, usamos `{{ ref('stg_erp__products') }}` para referenciar um **modelo dbt** (e não uma tabela crua). O `ref()` garante que o dbt resolva dependências, compile o nome correto do objeto no ambiente e mantenha a linhagem no DAG.

A nomenclatura recomendada para modelos intermediários é `int_<entidade>__<transformacao>.sql`. No arquivo `models/intermediate/int_products__enriched.sql`, unimos as três tabelas de *staging* e preparamos a dimensão de produtos enriquecida:

```sql
with
    -- call required staging models
    categories as (
        select *
        from {{ ref('stg_erp__categories') }}
    )

    , suppliers as (
        select *
        from {{ ref('stg_erp__suppliers') }}
    )

    , products as (
        select *
        from {{ ref('stg_erp__products') }}
    )

    -- transformation steps
    , enrich_products as (
        select
            products.product_pk
            , products.product_name
            , products.quantity_per_unit
            , products.unit_price
            , products.units_in_stock
            , products.units_on_order
            , products.reorder_level
            , products.is_discontinued
            , categories.category_name
            , suppliers.supplier_name
            , suppliers.supplier_city
            , suppliers.supplier_country
        from products
        left join categories on products.category_fk = categories.category_pk
        left join suppliers on products.supplier_fk = suppliers.supplier_pk
    )

select *
from enrich_products
```
No exemplo do livro, usamos modelos enxutos para focar nos conceitos. Em projetos reais, a camada **intermediate** costuma ter muitos modelos “de apoio” (joins, regras e padronizações reutilizáveis) que, isoladamente, não têm valor analítico direto para um dashboard, mas são passos importantes para construir dimensões e fatos consistentes na camada **marts**.

## Modelo marts: Dimensão `dim_products`

A camada **marts** é a camada de entrega: é onde publicamos modelos no formato mais adequado para consumo por BI, ciência de dados e *data products*. Aqui normalmente ficam:

- **Dimensões** (`dim_<nome>`), com atributos descritivos e chaves para relacionamento.
- **Fatos** (`fct_<nome>`), com eventos/medidas no nível de granularidade definido.
- **Agregações** (`agg_<nome>`), quando faz sentido expor tabelas já sumarizadas para casos específicos.

O que você tende a evitar em *marts* é repetir lógica que deveria estar padronizada em *staging/intermediate*. Pense em *marts* como a “camada final” que seleciona e organiza o que já foi preparado anteriormente.

No nosso exemplo, o modelo intermediário `int_products__enriched` já entrega o conjunto de colunas e joins necessários para a dimensão. Por isso, `dim_products` pode ser apenas um `select` do `int`: a transformação já está pronta e a camada *marts* cumpre o papel de “publicar” a dimensão com um nome e contrato claros.

```sql
with
    dim_products as (
        select *
        from {{ ref('int_products__enriched') }}
    )

select *
from dim_products
```
