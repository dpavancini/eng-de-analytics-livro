(dbt)=
## Transformação de dados com dbt

Nesta seção vamos apresentar como fazer a modelagem de um DW na prática usando o dbt. Para tanto, nós precisamos primeiro realizar a carga dos dados brutos em nosso DW [(que fizemos na seção anterior)](). Com os dados já inseridos no DW, vamos criar uma séries de modelos para materializar o modelo conceitual do DW que criamos [anteriormente]().

Antes de começar a parte técnica, é bom lembrar que o objetivo de um DW é gerar resultado para a empresa e não criar um sistema que, embora possa ser tecnicamente bem feito, não tenha uma visão de negócio. Deste modo, a forma como criamos os marts e suas tabelas de fatos e dimensões deve ser sempre pensado nos problemas prioritários na tomada de decisão e na utilização pelo usuário final. Um erro comum de projetos de DW é pensar mais nos modelos de dados das aplicações-fonte e menos no modelo de negócios do usuário final. Se for difícil saber *a priori* como será essa utilização, podemos recorrer a instrumentos já usados na tomada de decisão como relatórios, planilhas, etc. para ter uma ideia de que tipo de relações e atributos são mais relevantes para o cliente.

Atualmente o [dbt](https://www.getdbt.com/) possui uma versão SaaS chamada [dbt cloud](https://www.getdbt.com/product/what-is-dbt/) além da versão open-source. A versão SaaS possui um custo de aprendizagem menor para quem tem menos contato com programação, mas neste curso vamos utilizar a versão open-source. No geral, ambos são muito similares e você utilizar a versão cloud de forma equivalente se desejar.

## Começando um projeto

### Instruções de exemplo

A forma mais fácil de acompanhar esta seção é clonar o projeto de exemplo disponível neste [repositório](https://github.com/engdeanalytics/northwind). Siga as instruções no README do repositório para instalar e configurar o dbt corretamente no seu computador.


### Criando um projeto dbt

O primeiro passo de um projeto dbt é a criação da pasta onde estão estruturados os arquivos do projeto. A forma mais fácil de criar essa pasta é através do comando `dbt init`. Você também vai precisar criar um repositório git na pasta para controlar o versionamento do projeto. Todo projeto é iniciado com um arquivo `dbt_project.yml` padrão, neste arquivo são configurados diversas opções do projeto incluindo a conexão com o data warehouse, tipo de materialização das tabelas, entre outros.

```{admonition} 
Se você clonou o repositório de exemplo, as etapas dessa subseção já terão sido feitas para você.
```

```yaml
name: 'northwind'
version: '1.0.0'
config-version: 2

profile: 'northwind'

model-paths: ["models"]
analysis-paths: ["analyses"]
test-paths: ["tests"]
seed-paths: ["seeds"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]

target-path: "target"  # directory which will store compiled SQL files
clean-targets:         # directories to be removed by `dbt clean`
  - "target"
  - "dbt_packages"

models:
  northwind:
    staging:
      +materialized: table
```
**Exemplo de dbt_project.yml**

O `dbt init` também cria uma estrutura de pastas e arquivos padrão para todo projeto dbt:

```
.
├── analyses
├── dbt_packages
├── dbt_project.yml
├── logs
├── macros
├── models
├── README.md
├── seeds
├── snapshots
├── target
└── tests

9 directories, 2 files
```

### Configurando a conexão com o Data Warehouse

A conexão com o data warehouse é configurada por padrão no arquivo `profiles.yml` que fica armazenado no caminho `~/.dbt/profiles.yml` (LINUX). As permissões do arquivo devem ser restritas ao usuário pois possuem credenciais de acesso aos dados que não devem ser compartilhadas.

A opção target permite alterar entre um ambiente de desenvolvimento e produção de forma simples. O target de produção deve se chamar “prod” pois é usado em outros APIs do dbt. Durante o desenvolvimento, esse target não deve ser usado mas sim um target “dev” ou equivalente.

Atualmente o dbt possui drivers para os principais data warehouses na nuvem e alguns bancos de dados tradicionais, cada driver possui configurações específicas que podem ser consultadas [aqui](https://docs.getdbt.com/docs/available-adapters).

```yaml
northwind:
  outputs:
    dev:
      dataset: northwind
      job_execution_timeout_seconds: 300
      job_retries: 1
      keyfile: path/to/keyfile.json
      location: US
      method: service-account
      priority: interactive
      project: <project_id>
      threads: 1
      type: bigquery
```
**Exemplo de dbt Profile**

Para verificar se tudo está bem configurado, podemos usar o comando `dbt debug` no terminal. Em caso de sucesso, devemos ter um output como esse:

```bash
dbt debug

(...)
  Connection test: [OK connection ok]

All checks passed!
```

## Salvando nossas alterações

É importante salvar frequentemente nossas alterações no projeto. Por ser um projeto de código (lembrem-se do princípio de *data as code*), as alterações são salvas como *commits* em um sistema de controle de versão git.

```{admonition} 
Se você não tem contato com git, recomendamos revisar o capítulo sobre {ref}`Git<GIT>` ou buscar outros conteúdos *online*.
```

```bash
git init
git branch -M main
git add .
git commit -m "Criei um projeto dbt"
git remote add origin https://github.com/USERNAME/dbt-northwind.git
git push -u origin main
```

## Criando nossos primeiros modelos

### Começando uma nova *branch*

Antes de iniciar nossa construção dos modelos, é recomendável criar uma nova *branch* de trabalho para salvarmos nossas alterações. Para isso podemos executar no terminal:

```
git checkout -b novos_modelos_dbt
```

### Criando nossas primeiras fontes de dados

Agora que configuramos nossa conexão com o data warehouse, precisamos criar nossas primeiras fontes de dados. Essas fontes são definidas no arquivo `sources.yml`, onde é possível descrever quais os bancos de dados, schemas e tabelas que queremos deixar disponíveis no dbt.

```{admonition} 
Nesta seção é esperado que os dados brutos da Northwind já estejam disponíveis no Data Warehouse através de um processo de ingestão como visto {ref}`aqui<ingestao_pratica>` ou através de um dbt seed como sugerido [aqui](https://github.com/engdeanalytics/northwind).
```

Depois de definidas as fontes, elas podem ser chamadas nos modelos através da sintaxe:

```SQL
select * 
from {{source('nome_fonte', 'nome_tabela')}}
```

Não é necessário mapear todas as tabelas do data warehouse de uma vez, mas podemos adicionar de forma incremental o que for necessário para os modelos. O uso do arquivo de sources permite criar a linhagem dos dados através da função `{ source('nome_da_fonte',’nome_da_tabela’)}}` e também permite documentar e escrever testes sobre as fontes de dados.

```yaml
version: 2

sources:
  - name: northwind # aqui você deve substituir pelo nome do dataset criado pela ferramenta de ingestão no bigquery
    schema: 
    description: Essa é a fonte de dados do nosso ERP
    tables:
      - name: products # se você usou kondado, é possível que aqui esteja escrito public_products
        description: Essa é a tabela de produtos do ERP.

      - name: employees
        description: Essa é a tabela de funcionários do ERP.
        
      - name: customers
        description: Essa é a tabela de clientes do ERP. O dono desse dado é a equipe comercial.
 
```

Uma boa prática é incluir o arquivo `sources.yml` no diretório *staging* onde fazemos as primeiras transformações sobre os dados originais. Em geral, **cada source deve ser referenciada apenas em um modelo**, facilitando a consistência na modelagem como iremos discutir na próxima seção.