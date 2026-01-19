# 16.7 Aproveitando pacotes do dbt

Conforme o projeto cresce, você vai perceber que muitas soluções no dbt se repetem: testes “um pouco mais avançados” do que `unique`/`not_null`, padrões de geração de chaves, helpers para manipular datas, strings, listas de colunas, e assim por diante.

Para não reinventar a roda em cada projeto, o dbt suporta **pacotes (packages)**: bibliotecas reutilizáveis que podem conter:

- **macros** (funções Jinja que geram SQL),
- **testes genéricos** (que você configura via YAML),
- e, em alguns casos, **modelos** e **seeds** (dependendo do pacote).

Se você já usou:

- um *add-in* (plugin) no Excel/Google Sheets,
- um pacote Python via `pip`,
- ou uma biblioteca em qualquer linguagem,

o conceito aqui é muito parecido: você **declara a dependência**, o dbt **baixa a biblioteca**, e você passa a **reutilizar funcionalidades prontas** no seu projeto.

## Como instalar pacotes (`packages.yml` + `dbt deps`)

Em dbt, dependências são declaradas no arquivo `packages.yml` na raiz do projeto. Esse arquivo é o equivalente ao “manifesto” de dependências: ele lista quais pacotes seu projeto precisa e quais versões são compatíveis.

Depois de declarar o pacote, você roda:

```bash
dbt deps
```

E o dbt baixa os pacotes e salva o código em `dbt_packages/` (pasta gerenciada pelo dbt).

## Exemplo: instalando o `dbt_utils`

O pacote mais conhecido do ecossistema é o `dbt_utils`, mantido pela dbt Labs. Ele entrega um conjunto grande de macros e testes genéricos “prontos para uso”, que você acaba usando em praticamente todo projeto real.

No `packages.yml`:

```yaml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.0.0", "<2.0.0"]
```

Em seguida, instale as dependências:

```bash
dbt deps
```

Esse intervalo de versões (ex.: `>=1.0.0` e `<2.0.0`) é útil porque evita mudanças incompatíveis de uma major version sem querer. Em projetos de produção, é comum também fixar uma versão específica (por exemplo, `1.3.2`) para ter reprodutibilidade total.

## Onde encontrar a documentação de um pacote

Um ponto importante: “instalar” um pacote é só metade do caminho. O valor real está em saber **o que ele oferece** e **como configurar** cada macro/teste.

No caso do `dbt_utils`, a forma mais direta de acessar a documentação é:

1. Abrir o repositório no GitHub: `dbt-labs/dbt-utils`
2. Ler o `README.md`

O `README.md` normalmente lista:

- quais **macros** existem e exemplos de uso,
- quais **testes genéricos** estão disponíveis,
- detalhes de compatibilidade e configurações.

Na prática, quando você pensar “acho que existe uma macro para isso”, o `README.md` do pacote é o primeiro lugar para procurar.

## Usando pacotes no dia a dia: testes e macros

Depois de rodar `dbt deps`, você passa a conseguir usar os recursos do pacote de duas formas principais:

- **Testes genéricos via YAML**, referenciando pelo nome do pacote (ex.: `dbt_utils.unique_combination_of_columns`)
- **Macros dentro de SQL**, chamando-as via Jinja (ex.: `{{ dbt_utils.generate_surrogate_key(...) }}`)

Vamos implementar os dois casos no nosso projeto. Seguindo a boa prática da seção 16.4 (testes e documentação), comece garantindo que suas `sources` estejam bem documentadas e com testes básicos (como `unique` e `not_null`) nas chaves primárias.

No Northwind, a maioria das tabelas tem uma chave primária simples. A exceção é a tabela fonte `orders_detail`, cuja granularidade é definida por uma **chave natural composta** (mais de uma coluna). É um bom caso para usar um teste genérico do `dbt_utils`.

Se você quiser comparar com o código de referência, consulte o repositório exemplo na branch `recursos` (principalmente o YAML de `sources`). A seguir, vamos ver o exemplo completo para `orders_detail`.

## Exemplo 1: teste de combinação única na fonte `orders_detail`

Queremos garantir que a tabela de origem `orders_detail` não possua linhas duplicadas para a combinação `(orderid, productid)`.

Por que isso é importante?

- Em um modelo de pedidos, o “item do pedido” normalmente é identificado por uma **chave natural composta** (número do pedido + produto).
- Se essa combinação se repetir, você tem duplicidade de item e, quase sempre, vai gerar **métricas infladas** (quantidade, receita, desconto etc.).
- Esse tipo de duplicidade pode surgir por problemas de ingestão, reprocessamento, ou mudanças na fonte — e é exatamente o tipo de coisa que queremos capturar cedo.

No projeto Northwind, no arquivo `models/staging/erp/_source_erp.yml`, adicione o teste no nível da tabela `orders_detail`:

```yaml
sources:
  - name: erp
    description: Northwind sales system.
    schema: erp_northwind
    database: raw
    tables:
      - name: orders_detail
        description: Line items for each order including product, quantity, unit price, and discount.
        data_tests:
          - dbt_utils.unique_combination_of_columns:
              arguments:
                combination_of_columns:
                  - orderid
                  - productid
        columns:
          - name: orderid
            description: Foreign key referencing the order header.
          - name: productid
            description: Foreign key referencing the product sold on the line.
          - name: unitprice
            description: Unit price charged for the line item at the time of sale.
          - name: quantity
            description: Number of units sold on the line.
          - name: discount
            description: Discount percentage applied to the line (0-1).
```

Esse teste vai compilar para um SQL que procura combinações repetidas e falhar caso encontre qualquer par `(orderid, productid)` aparecendo mais de uma vez.

Quando você rodar `dbt test` (ou `dbt build`), o dbt vai executar esse SQL e reportar as linhas problemáticas como falhas de qualidade.

Perceba que, como esse teste utiliza mais de uma coluna como entrada, ele é definido no nível da tabela (em `data_tests`). E não no nível de uma coluna específica.

## Exemplo 2: criando uma `surrogate_key` no staging `stg_erp__order_items`

Agora vamos usar uma macro do `dbt_utils` para resolver um problema clássico de modelagem: como representar de forma prática uma entidade cuja chave natural é composta?

No nosso caso, o item do pedido é definido por:

- `orderid` (o pedido)
- `productid` (o produto dentro do pedido)

Essa combinação é uma chave natural válida, mas trabalhar com chaves compostas o tempo todo tem alguns custos:

- joins ficam mais verbosos (você precisa juntar em duas colunas),
- a definição de `unique_key` em modelos incrementais fica mais chata,
- em fatos/dimensões, é comum preferir uma chave única simples para padronizar relacionamentos.

Uma prática comum é criar uma **chave substituta (surrogate key)**: uma chave estável e determinística, derivada da chave natural.

No projeto Northwind, no modelo de staging de itens do pedido (`models/staging/erp/stg_erp__order_items.sql`), além da modelagem “costumeira” de staging (renomear, padronizar tipos e chaves), gere essa chave com o pacote assim:

```sql
select
    {{ dbt_utils.generate_surrogate_key(['orderid', 'productid']) }} as order_item_sk
    , cast(orderid as int) as order_fk
    , cast(productid as int) as product_fk
    ...
from {{ source('erp', 'orders_detail') }}
```

Se tiver dúvidas sobre esse modelo, consulte a branch `recursos`.

Por que vale a pena criar uma `surrogate_key`:

- **Identidade estável do registro**: você passa a ter uma coluna única (por exemplo, `order_item_sk`) para identificar cada linha, mesmo quando a chave natural é composta.
- **Simplifica joins e modelagem downstream**: reduz a verbosidade dos relacionamentos e facilita padronizar chaves em modelos intermediários, fatos e dimensões.
- **Ajuda incrementalidade e deduplicação**: a chave pode ser usada como `unique_key` e como referência consistente para identificar reprocessamentos e duplicidades.
- **Consistência e portabilidade**: macros como `generate_surrogate_key` padronizam a estratégia de hash para múltiplas colunas, evitando implementações manuais divergentes entre projetos.

Para ver como a macro acima vira SQL “puro”, use a opção `Compile` na IDE do dbt ou inspecione o SQL compilado nos artefatos do projeto. O SQL exato varia conforme o warehouse/adaptador, mas a ideia é a mesma: concatenar os valores (tratando `null`) e aplicar um hash. A linha da `order_item_sk` fica parecida com:

```sql
md5(cast(coalesce(cast(orderid as TEXT), '_dbt_utils_surrogate_key_null_') || '-' || coalesce(cast(productid as TEXT), '_dbt_utils_surrogate_key_null_') as TEXT)) as order_item_sk
```

## Recap

Nesta seção você viu como pacotes deixam o dbt mais produtivo:

- Instalamos o `dbt_utils` via `packages.yml` e `dbt deps`.
- Consultamos a “documentação oficial” do pacote pelo `README.md` do repositório no GitHub.
- Aplicamos um teste genérico (`unique_combination_of_columns`) para proteger a qualidade na fonte `orders_detail`.
- Usamos uma macro (`generate_surrogate_key`) para criar uma chave substituta no staging de itens de pedidos.
