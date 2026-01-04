# 16.1 Introdução ao dbt Platform

O **dbt** (*data build tool*) é uma ferramenta de transformação de dados que leva práticas clássicas de engenharia de software para o dia a dia de *analytics engineering*. Em vez de “scripts SQL soltos” rodando por agendamento, o dbt incentiva um fluxo de trabalho disciplinado: código versionado, revisado via *pull request*, com testes e documentação junto da transformação.

Na prática, você escreve **modelos** em arquivos `.sql` que definem o *SELECT* que deve existir no *data warehouse/lakehouse*. O dbt compila esses modelos (com *templating* em Jinja e macros), entende as dependências entre eles via `ref()` e executa as transformações na ordem correta, formando uma linhagem entre os modelos (DAG). Isso facilita **modularidade** (modelos pequenos e reutilizáveis), organização por camadas (ex.: `stg → int → marts`), e manutenção evolutiva do código.

O “pulo” que o dbt deu no trabalho de times de analytics foi juntar, em uma única ferramenta:

- **Versionamento e colaboração**: Git como fonte de verdade, branches/PRs e CI/CD.
- **Testes**: testes nativos (ex.: `unique`, `not_null`, `relationships`) e testes customizados para regras de negócio.
- **Documentação**: descrições nos `schema.yml`, *docs blocks*, catálogo navegável e linhagem (DAG).

O dbt funciona por **adaptadores**, então a lista de plataformas suportadas evolui com o ecossistema. Em geral, o dbt Platform (e o dbt Core via CLI) é usado com os principais *data warehouses/lakehouses* (por ex.: **Databricks**, **Snowflake**, **Google BigQuery**, **Amazon Redshift**, **PostgreSQL**), além de *query engines* e bancos suportados por adaptadores (por ex.: **Apache Spark**, **AWS Athena**, **Trino**, **DuckDB**, **ClickHouse**, **Dremio**, **Azure Synapse/Microsoft Fabric**, entre outros). Para a lista completa e atualizada de adaptadores suportados, consulte a documentação oficial do dbt.


```{figure} ../../../assets/img/16_01_dbt_no_elt.png
:name: Como dbt se encaixa em uma estrutura moderna de analytics.
Fonte: Criado pelo autor.
#TODO Adicionar uma imagem mostrando aqui o dbt como parte centra da transaformação (ELT). Usar a imagem clássica da indicium com fontes -> dw+dbt -> data products.
```

## Primeiros passos pela UI

Com todo a configuração finalizada no capitulo 12 a primeira página do dbt Platform tem o dashboard de informações do seu projeto. Como ainda não connstruimos nada eles estará vazio. O meno a esquerda pode ser expandido e fechado para facilitar navegação. Com o menu expandido temos algumas opções as princiapis que usaremos durante o curso serão: Studio, Orchestration e Account Settings(Na sua UI será o nome da sua conta que pode ser clicado) e Profile Settings (Na sua UI será o seu nome). Convido voce a navegar pelo account settings e profile settings para se familizarizar um pouco com o ambiente.

Nesse primeiro momento, vamos focar em conhecer melhor o "Studio" dentro do dbt. O Studio é uma IDE (integrated development environment) é uma versão web-based similar a ferramentos de dsenvolvimento local como visual studio code, porém tem caracteriscas especificas para o desenvolvimento de projectos de dbt e que facilitam muito o desenolvimento. É no Stuido que iremos criar nossos modelos, testalos e documenta-los.

```{figure} ../../../assets/img/16_01_dbt_studio_ui.png
:name: dbt Platform Studio IDE
Fonte: dbt.
```

Na caixa vermelha temos o controle de versão do Studio. Aqui podemos ver a branch que esamos atualmente que é a branch 'main' no topo. Temos o botão de ação do git no studio. Através desse botão, podemos criar uma nova branch, trocar de branch, fazer os commits para salvar anterações que estamos fazendo e até abrir pull-requests no nosso repositório de código. Finalmente o espao abaixo é onde conseguimos ver que alterações estamos fazendo antes de realizar um commit. Arquivos em versão são novos arquivos adicionaos, ja em laranja são arquivos exuistentes que foram editados e arquivos vermlhos foram arquivos removidos. Perceba que no botão do git a opção indicada é "Create Branch" está assim por que o Studio sempre esta sugerindo o melhor próximo passo no fluxo git. Nesse caso como estamos na branch 'main' e ela esta atualizada o próximo passo é crir uma nova branch para podermos iniciar o desenvolvimento e propors nossas alterações, o dbt está sugerindo isso visto que a branch main não pode ser alterada via commits e apenas por pull-requests.

Na caixa laranja temos o file explorer, é aqui que podemos interagir com os arquivos existentes do nosso repositorio. Tome um tempo e abra as pastas e fique confortável com a UI. Para criar um novo arquivo o pasta basta clicar nos três pontos ("...") no lado do direito do file explorar para abrir a opção de criar um novo arquivo ou renomear um arquivo existente.

Na caixa azul temos de fato o local onde vemos os arquivos e os editamos. Voce tambem pode criar um arquivo rascunho através dessa aba clicando na opção "create new file" esse novo arquivo não vai aparecer nofile explorer até que voce o salve e escolha um destino entre as pastas do projeo.

Finalmente na caixa verde temos a nossa barras de comandos para enviar comandos de dbt como dbt run, dbt test e dbt build. Nessa area tambem podemos interagir com várias funcionalidades do dbt. Como por exemplo, fazer um "preview" do modelo que estamos criando para ver como os dados modelados estão ficando. Aqui tambem podemos usar opção de compilação para ver o código que será enviado para o data warehouse quando esse modelo for executado. Preste atenção no canto direito dessa caixa onde temos a barra de status, a barra é o botão verde "ready" ali vemos se no projeto está pronto para desenvolvimento e livres de erro, esse botão pode mostrar tambem warnings em laranja ou erros em vermelho dependendo do tipo de problema que pode estar acontecendo no projeto. Os problemas podem variar de erro de conexão entre o dbt e o data warehouse como problemas no próprio codigo do modelo. Nosso ultimo lugar nessa UI é os três pontos ("...") ao lado da barra de status. Ali podemos ver algumas opções adicionais como dar um restart na UI em caso de algum bug ou até mesmo "Rollback to remove" que copia novamente a branch main do repositório removo do git e adicionalmente da um restar na UI.

para mais informçaões sobre a UI acesse: https://docs.getdbt.com/docs/cloud/studio-ide/develop-in-studio
