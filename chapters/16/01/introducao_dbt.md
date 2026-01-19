# 16.1 Introdução ao dbt Platform

O **dbt** (*data build tool*) é uma ferramenta de transformação de dados que leva práticas clássicas de engenharia de software para o dia a dia de *analytics engineering*. Em vez de “scripts SQL soltos” rodando por agendamento, o dbt incentiva um fluxo de trabalho disciplinado: código versionado, revisado via *pull request*, com testes e documentação junto da transformação.

Na prática, você escreve **modelos** em arquivos `.sql` que definem o *SELECT* que deve existir no *data warehouse/lakehouse*. O dbt compila esses modelos (com *templating* em Jinja e macros), entende as dependências entre eles via `ref()` e executa as transformações na ordem correta, formando uma linhagem entre os modelos (DAG). Isso facilita **modularidade** (modelos pequenos e reutilizáveis), organização por camadas (ex.: `stg → int → marts`), e manutenção evolutiva do código.

O “pulo” que o dbt deu no trabalho de times de analytics foi juntar, em uma única ferramenta:

- **Versionamento e colaboração**: Git como fonte de verdade, branches/PRs e CI/CD.
- **Testes**: testes nativos (ex.: `unique`, `not_null`, `relationships`) e testes customizados para regras de negócio.
- **Documentação**: descrições nos `schema.yml`, *docs blocks*, catálogo navegável e linhagem (DAG).

O dbt funciona por **adaptadores**, então a lista de plataformas suportadas evolui com o ecossistema. Em geral, o dbt Platform (e o dbt Core via CLI) é usado com os principais *data warehouses/lakehouses* (por ex.: **Databricks**, **Snowflake**, **Google BigQuery**, **Amazon Redshift**, **PostgreSQL**), além de *query engines* e bancos suportados por adaptadores (por ex.: **Apache Spark**, **AWS Athena**, **Trino**, **DuckDB**, **ClickHouse**, **Dremio**, **Azure Synapse/Microsoft Fabric**, entre outros). Para a lista completa e atualizada de adaptadores suportados, consulte a documentação oficial do dbt.

Em uma arquitetura moderna de **ELT**, o papel do dbt é ser a camada de **transformação versionada e testável**: os dados chegam “crus” no lakehouse/warehouse e, a partir daí, o dbt aplica regras de negócio, padronização, modelagem dimensional e validações de qualidade até produzir *data products* prontos para consumo.

## Primeiros passos pela UI

Com toda a configuração finalizada no Capítulo 12, ao abrir o dbt Platform você verá um dashboard com informações do projeto. Como ainda não construímos nada, ele estará praticamente vazio. O menu à esquerda pode ser expandido/fechado para facilitar a navegação. Com o menu aberto, as opções mais importantes para este capítulo são:

- **Studio**: onde desenvolvemos (modelos, testes e documentação).
- **Orchestration**: onde criamos Jobs, agendamentos e observamos execuções.
- **Account Settings**: na sua UI aparece como o nome da conta (clicável).
- **Profile Settings**: na sua UI aparece como o seu nome (clicável).

Vale a pena explorar rapidamente **Account Settings** e **Profile Settings** para se familiarizar com o ambiente.

Vamos focar no **Studio**. Ele funciona como uma IDE (*Integrated Development Environment*) no navegador, com recursos voltados especificamente para projetos dbt. É no Studio que criaremos nossos modelos, executaremos comandos, aplicaremos testes e escreveremos documentação.

```{figure} ../../../assets/img/16_01_dbt_studio_ui.png
:name: dbt Platform Studio IDE
Fonte: dbt.
```

Na caixa vermelha fica o **controle de versão** do Studio. No topo, você vê a branch atual (neste momento, `main`). No botão do Git, é possível criar/trocar de branch, fazer commits para salvar alterações e até abrir *pull requests* no repositório. Logo abaixo, você visualiza o *diff* do que mudou antes de commitar. Em geral, o Studio indica (com cores) arquivos novos, arquivos modificados e arquivos removidos.

Repare que o botão do Git costuma sugerir o “próximo passo” do fluxo. Se você estiver na `main` e ela estiver atualizada, a sugestão tende a ser **Create Branch**: a ideia é desenvolver em uma branch de feature e levar mudanças para a `main` via *pull request*.

Na caixa laranja fica o **File Explorer**. É por aqui que você navega pelos arquivos do repositório. Reserve alguns minutos para abrir pastas e se familiarizar com a estrutura. Para criar um arquivo ou pasta, clique nos três pontos (`...`) à direita do explorador; ali também aparecem opções como renomear itens entre outras.

Na caixa azul está o **editor**: o local onde abrimos e editamos arquivos. Você também pode criar um rascunho clicando em **Create new file**; ele só aparece no *File Explorer* depois que você salvar e escolher um caminho dentro do projeto.

Por fim, na caixa verde está a **barra de comandos e utilidades** do dbt: é onde você executa comandos como `dbt run`, `dbt test` e `dbt build`. Nessa área também dá para fazer **preview** dos dados de um modelo e ver o SQL **compilado** (a query pura que de fato será enviado ao *data warehouse*).

No canto direito, a barra de status (geralmente como “Ready”) indica se o projeto está pronto para desenvolver/executar. Dependendo do caso, ela pode exibir avisos (*warnings*) ou erros (*errors*) — desde problemas de conexão com o *data warehouse* até erros no próprio SQL/Jinja do modelo. Ao lado, o menu de três pontos (`...`) reúne ações adicionais, como reiniciar a UI em caso de instabilidade.

Para mais informações sobre a UI do Studio, consulte a [documentação do Studio](https://docs.getdbt.com/docs/cloud/studio-ide/develop-in-studio).
