(transformacao)=
# Capítulo 15 - Transformação de dados

A etapa de transformação de dados é o coração do processo de ELT. É nela que aplicamos as regras de negócio para gerar camadas confiáveis — das tabelas de *staging* até os data marts — que serão consumidas por analistas, aplicações e produtos de dados. Este capítulo concentra os **conceitos fundamentais**: quais tipos de transformação existem, como organizar camadas, como testar e documentar, e como inserir tudo isso em um ciclo contínuo de DataOps.

- Na Seção 15.1 revisitamos os tipos de transformações, quando usá-las e quais critérios ajudam a priorizá-las.
- Na Seção 15.2 detalhamos o desenho das camadas lógicas, convenções de nomeação e contratos de dados que sustentam um projeto robusto.
- Na Seção 15.3 analisamos os dados da Northwind e traçamos o blueprint dimensional que será implementado nos capítulos seguintes.

Nos capítulos seguintes colocaremos tudo em prática: o **Capítulo 16** mostrará o passo a passo com *dbt Core/dbt Cloud* e o **Capítulo 17** repetirá o exercício no Databricks Lakehouse usando o Lakeflow Declarative Pipelines. Use este capítulo como guia de princípios para escolher a melhor abordagem de implementação nas próximas etapas.
