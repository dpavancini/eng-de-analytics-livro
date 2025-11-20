# Capítulo 16 - Construindo o projeto Northwind no dbt

Agora que dominamos os conceitos de transformação (Cap. 15), montaremos passo a passo o projeto Northwind. Cada seção aborda um conceito-chave do dbt:

1. Revisão dos dados e do modelo estrela.
2. Panorama do dbt Cloud.
3. Configuração do ambiente e carregamento das seeds.
4. Construção das camadas `stg → int → marts` começando pela dimensão de produtos.
5. Testes, documentação, pacotes, demais dimensões e fatos.
6. Escrita de testes singulares, organização do `dbt_project.yml` e conclusão.

O objetivo é que você consiga replicar todo o laboratório no Databricks, entendendo o porquê de cada decisão. Na próxima etapa (Cap. 17) repetiremos o fluxo com Lakeflow Declarative Pipelines para comparar as abordagens.
