(config_ambiente)=
# Capítulo 12 - Configuração de Ambiente

No capítulo anterior discutimos a teoria da modelagem dimensional. Agora chegou a hora de montar o laboratório completo: preparar um data warehouse em nuvem, configurar o versionamento no GitHub e finalizar criando um projeto no dbt Cloud. Ao concluir esta etapa você terá todos os componentes necessários para praticar o trabalho de um analytics engineer com governança e rastreabilidade.

Ao longo das seções seguiremos uma sequência lógica:

- **Seção 12.1** mostra como criar o workspace no Databricks, separar catálogos por ambiente e coletar os tokens/HTTP Path que serão utilizados nas próximas etapas.
- **Seção 12.2** garante que você tenha uma conta no GitHub e um fork do repositório Northwind com as seeds(tabelas fonte) usadas no livro.
- **Seção 12.3** integra tudo isso dentro do dbt Cloud, conectando o Databricks e o repositório para que você possa editar e executar os modelos.

