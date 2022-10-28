(ingestao_pratica)=
# 14.3 Ingestão de dados na prática

<!-- Fazer usando Airbyte? Ou Hevo? -->
A ingestão de dados no ELT é realizada de forma a reduzir ao mínimo a transformação dos dados brutos que serão carregados no data warehouse. Na prática, há diferentes formas de realizar essa ingestão desde que esse princípio de mínima transformação seja mantido.

Entre as principais ferramentas do *Modern Data Stack* utilizadas para a ingestão de dados destacamos alternativas SaaS como [Fivetran](https://www.fivetran.com/), [Stitch](https://www.stitchdata.com/) e [Hevo](https://hevodata.com/), além de alternaticas open-source como o [Airbyte](https://airbyte.com/) e [Meltano](https://meltano.com/).

A escolha entre **contratar** uma ferramenta SaaS ou **implementar** uma solução *open-source* vai depender da sua capacidade de investimento e competências do time de dados. Também deve ser levado em conta se a solução escolhida possui todas as integrações necessárias para o projeto. Em alguns casos, pode ainda ser necessário desenvolver uma nova integração, o que geralmente é facilitado ao implementarmos uma solução *open-source*.

Para o exemplo prático deste capítulo utilizaremos a ferramenta *Airbyte* que pode ser configurada diretamente em seu computador seguindo as instruções nesta [página](https://docs.airbyte.com/quickstart/deploy-airbyte/).

```{admonition} Se você não se sente confortável com a utilização de ferramentas open-source ou não tem conhecimento técnico no tema, recomendamos utilizar uma das ferramentas SaaS citadas acima.
```

## Instalando o Airbyte

Se você configurou seguiu as [instruções de instalação](https://docs.airbyte.com/quickstart/deploy-airbyte/) do Airbyte ele deverá estar disponível em [http://localhost:8000](http://localhost:8000).

## Configurando uma fonte de dados

A fonte de dados do nosso exemplo será o banco de dados da Northwind que você deverá ter configurado em seu computador ou em algum outro ambiente que tenha acesso.

Se você ainda não possui um banco de dados configurado, pode criá-lo através do seguinte comando (se requisitada, inserir a senha *password*):

```
docker run --rm --name northwind -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
createdb psql -h localhost -U postgres -p 5432 northwind
cat assets/data/northwind.sql | psql -h localhost -U postgres -p 5432 -d northwind
```

O banco de dados da *northwind* estará disponível no seguinte endereço:

```
Host: localhost
Port: 5432
User: postgres
Password: password
Database: northwind
```

Que poderá ser acessado na tela de configuração de uma fonte (*source*) no *Airbyte* como abaixo:

```{figure} ../../../assets/img/source.png
:name: source_airbyte
:height: 450px

Configurando uma fonte no Airbyte
```

## Configurando um destino

Agora vamos escrever em um Data Warehouse (*BigQuery*). Para isso vamos criar um destino para o BigQuery e uma [conta de serviço](https://cloud.google.com/bigquery/docs/use-service-accounts?hl=pt-br) que permite escrever no BigQuery. Essa conta deverá ter as permissões de `Usuário do BigQuery` e `Editor de dados do BigQuery`. Você deverá criar uma chave `JSON` e adicioná-la no campo *credentials* do Airbyte:


```{figure} ../../../assets/img/destination.png
:name: destination_airbyte
:height: 450px

Configurando um destino no Airbyte
```

## Ativando um *sync*

Para executar a ingestão de dados em si, precisamos realizar um *sync* da conexão entre fonte e destindo de dados no Airbyte. Cada *sync* pode ser configurado para executar em intervalos pré-definidos (ex. a cada 24 horas), por período (ex. todo dia às 02:00) ou através de configurações avançadas de CRON. VocÊ pode verificar o status de cada *sync* na página *Connections*

```{figure} ../../../assets/img/sync_airbyte.png
:name: sync_airbyte
:height: 450px

Verificando o status dos *syncs* no Airbyte
```

## Pronto!

É tão simples quanto parece. O processo de ingestão se resume a configurar conexões entre a fonte de dados e o *data warehouse*, deixando o trabalho duro para a etapa de transformação. O processo é muito semelhante se utilizássemos outras ferramentas de ingestão do ELT, mudando apenas algumas nomenclaturas.