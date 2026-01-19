# 16.2 Primeiros passos no dbt

Quando você cria um projeto dbt do zero, ele costuma vir com dois modelos de exemplo (`my_first_dbt_model` e `my_second_dbt_model`) e um arquivo `.yml` (geralmente `schema.yml`) descrevendo esses modelos e definindo testes simples (por exemplo: `not_null` e `unique` em uma coluna-chave).

Esses arquivos ficam dentro da pasta `models/`, que é onde a maior parte do trabalho acontece. É nela que definimos:

- **Sources** (tabelas “de origem” que já existem no *data warehouse/lakehouse*).
- **Modelos** do dbt (arquivos `.sql` como `nome_modelo.sql`).
- **Testes e documentação** (em arquivos `.yml`, como `schema.yml`).

No dbt, cada item “construível” é um **node** e faz parte da linhagem (a DAG). No exemplo padrão, abra o `my_second_dbt_model` e observe que ele depende do `my_first_dbt_model`. Se a linhagem não aparecer automaticamente, clique em **Lineage** na barra de comandos. Em seguida, abra o `schema.yml` e veja como os testes foram definidos para a coluna `id`.

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
# Executa (materializa no data warehouse/lakehouse) os modelos selecionados.
# Sem seleção, roda todos os modelos na ordem da DAG.
dbt run

# Roda testes associados aos recursos selecionados (models/sources/seeds etc.).
# No exemplo inicial, você verá 4 testes (2 por modelo).
dbt test
```

Para relacionar com os modelos de exemplo e entender diferentes formas de executar comandos no dbt, aqui vão alguns comandos típicos de seleção:

```bash
# executa apenas o my_first_dbt_model
dbt run --select my_first_dbt_model

# executa apenas o my_second_dbt_model
dbt run --select my_second_dbt_model

# roda os testes definidos no(s) .yml para esse(s) modelo(s)
dbt test --select my_first_dbt_model
dbt test --select my_second_dbt_model
```

Observe como os modelos e os testes se comportam. Algum teste falhou? Tente entender o motivo olhando o SQL dos modelos. No projeto de exemplo, o `my_first_dbt_model` cria uma tabela com duas linhas: uma com `id = 1` e outra com `id = null`. Por isso, o teste `not_null` desse modelo falha ao encontrar uma linha com valor nulo.

Na prática, você pode fazer o “fluxo completo” de duas formas:

- `dbt run` + `dbt test`: você controla cada etapa separadamente. É comum no desenvolvimento, quando você quer rodar só modelos (`dbt run`) sem pagar o custo de testes a cada alteração, ou quer testar algo específico.
- `dbt build`: é um comando “orquestrador” que constrói os recursos selecionados (incluindo outros objetos do dbt como **seeds**, **modelos** e **snapshots**) e roda os **testes** associados. Em geral é a melhor opção para pipelines/CI, porque valida o que foi construído no mesmo fluxo e na ordem correta.

Experimente as duas abordagens e observe as diferenças. Um ponto importante: quando um **modelo upstream falha**, tudo o que depende dele fica como **skipped** (porque a DAG não consegue avançar com segurança). Já quando um **teste falha**, o comando termina com status de erro.

## Carregando os dados da Northwind com seeds

Agora que você já está mais familiarizado com o dbt Studio, vamos carregar os dados-fonte da Northwind no Databricks para iniciar a modelagem. Para isso, usaremos **seeds**: uma funcionalidade do dbt que carrega arquivos `.csv` do projeto e os materializa como tabelas no *data warehouse/lakehouse*.

Você pode verificar os arquivos na pasta `seeds/erp_northwind`. No projeto, essas seeds começam desabilitadas. Para habilitá-las, abra o arquivo `dbt_project.yml` na raiz do projeto e ajuste a configuração da seed `erp_northwind` para `+enabled: true`.

Feito isso, carregue as seeds com o comando abaixo. Elas serão criadas no catálogo/schema configurado no `dbt_project.yml` (neste laboratório, em `raw.erp_northwind`).

```bash
dbt seed --select erp_northwind
```

As seeds já contemplam as tabelas `categories`, `products`, `customers`, `orders`, `orders_detail`, `employees`, `shippers` e `suppliers`. Ao final do comando, confirme se o Databricks contém os dados brutos; são eles que alimentam nossos `sources`.

Após o carregamento, não esqueça de desabilitar as seeds alterando `+enabled: true` de volta para `+enabled: false`. Isso evita que elas sejam executadas sem necessidade junto com o `dbt build`.

Uma boa prática aqui é criar uma nova branch para iniciar o desenvolvimento “de verdade”. Nessa branch, além de ajustar o `+enabled`, remova os modelos de exemplo do dbt e deixe o projeto “limpo” para começarmos a Northwind.

Se quiser seguir um padrão de nomes, você pode usar algo como `criacao_dimensao_produtos`, que é exatamente a primeira etapa do projeto que vamos construir.
