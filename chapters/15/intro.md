(transformacao)=
# Capítulo 15 -  Transformação de dados

A etapa de transformação de dados é o coração do processo de ELT. É nela que aplicamos as regras de negócio para gerar camadas confiáveis — das tabelas de *staging* até os data marts — que serão consumidas por analistas, aplicações e produtos de dados. Este capítulo passa a concentrar apenas os **conceitos fundamentais**: quais tipos de transformação existem, como organizar camadas, como testar e documentar, e como inserir tudo isso em um ciclo contínuo de DataOps inspirado nas melhores práticas do [dbt](https://docs.getdbt.com/docs/introduction).

- Na Seção 15.1 revisitamos os tipos de transformações e quais critérios ajudam a priorizá-las.
- Na Seção 15.2 detalhamos o desenho das camadas lógicas, convenções de nomeação e contratos de dados que sustentam um projeto robusto.

Nos capítulos seguintes colocaremos tudo isso em prática: o **Capítulo 16** mostrará o passo a passo completo com *dbt Core/dbt Cloud*, enquanto o **Capítulo 17** repetirá o exercício com o Databricks Lakehouse usando o Lakeflow Declarative Pipelines. Use este capítulo como guia de princípios para escolher a melhor abordagem de implementação nas próximas etapas.
