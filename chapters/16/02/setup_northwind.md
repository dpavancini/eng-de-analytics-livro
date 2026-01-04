# 16.2 Primeiros passos no dbt

Quando você cria um projeto dbt do zero, ele costuma vir com dois modelos de exemplo (`my_first_dbt_model` e `my_second_dbt_model`) e um arquivo `.yml` (geralmente `schema.yml`) descrevendo esses modelos e definindo testes simples (por exemplo: `not_null` e `unique` em uma coluna chave).

Tudo está criado dentro do folder models/ que é onde a maior parte do nosso trabalho sera focado. É nesse pasta que definimos as nossas tabelas sources, nossos modelos de dbt nome_modelo.sql e nossa documentação e testes em arquivos nome_objeto.yml. Cada item defindo no dbt é considerado um node que faz parte da linhagem do dbt (DAG). No nosso exemplo, clique no `my_second_dbt_model` e note na DAG que o modelo é filho do `my_first_dbt_model`. Caso a linhagem nao apareça automaticamente clique em 'Lineage' na caixa da barra de comandos. Tambem acesse o schema.yml e veja como foram definidos testes para cada modelo em cima da coluna 'id'

```yml
version: 2

models:
  - name: my_first_dbt_model
    description: "A starter dbt model"
    columns:
      - name: id
        description: "The primary key for this table"
        data_tests:
          - unique
          - not_null

  - name: my_second_dbt_model
    description: "A starter dbt model"
    columns:
      - name: id
        description: "The primary key for this table"
        data_tests:
          - unique
          - not_null
```

Esses modelos e testes são ótimos para entender o ciclo básico: **executar modelo** e depois **validar com testes**. Os comandos mais usados são:

```bash
# executa (materializa no data-warehouse) os modelos
# quando executado iremos rodar os dois models na ordem da DAG
dbt run

# roda os testes dos recursos selecionados (models/sources/seeds)
# quando executado iremos rodar os 4 testes, dois para modelo
dbt test
```

Para relacionar com os modelos de exemplo, aqui vão alguns comandos típicos:

```bash
# executa apenas o my_first_dbt_model
dbt run --select my_first_dbt_model

# executa apenas o my_second_dbt_model
dbt run --select my_second_dbt_model

# roda os testes definidos no(s) .yml para esse(s) modelo(s)
dbt test --select my_first_dbt_model
dbt test --select my_second_dbt_model
```

Na prática, você pode fazer o “fluxo completo” de duas formas:

- `dbt run` + `dbt test`: você controla cada etapa separadamente. É comum no desenvolvimento, quando você quer rodar só modelos (`dbt run`) sem pagar o custo de testes a cada alteração, ou quer testar algo específico.
- `dbt build`: é um comando “orquestrador” que constrói os recursos selecionados (incluindo outros objetos do dbt como **seeds**, **modelos** e **snapshots**) e roda os **testes** associados. Em geral é a melhor opção para pipelines/CI, porque valida o que foi construído no mesmo fluxo e na ordem correta.

Brinque um pouco com as duas formas e veja o que acontce em cada uma delas. Perceba que na segunda maneira no `dbt build` o segundo modelo na verdade não roda e da "skip" porque os testes do modelo anterior falharam e o dbt percebe então que existe dados ruinds no modelo anterior e e não roda o segundo modelo para evitar que eles sejam propagados.

## Carregandos os dados da Northwind utilizando seeds

Agora que você já está maisfamiliarizado com o dbt Studio iremos carregar os dados fontes da Northwind no Databricks para podermos começar de fato a modelagem dos dados no dbt. Para isso iremos usar uma funcionalidade do dbt que carrega tabelas .csv do dbt para o Databricks. Isso é feito com seeds. Voce pode checar os arquivos na pasta seeds/erp_norhwind. Para rodar as seeds e criar as tabelas precisamos antes habilitar essa pasta da erp_northwind. O projeto começa com elas desabilitadas, para habilitar elas vá até o arquivo dbt_project.yml no root do file explorer. Depois de acessar o arquivo vá na linha 44 e troque:       +enabled: false por       +enabled: true.

Feito isso carrega as seeds com o comando abaixo. As seeds irão populam o catálogo `raw.erp_northwind` conforme a configuração estabelcida no dbt_project.yml.

```bash
dbt seed --select erp_northwind
```

As seeds já contemplam as tabelas `categories`, `products`, `customers`, `orders`, `orders_detail`, `employees`, `shippers` e `suppliers`. Ao final do comando confirme se o Databricks contém os dados brutos; são eles que alimentam nossos `sources`.
