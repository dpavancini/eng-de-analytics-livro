# Capítulo 16 - Construindo o projeto Northwind no dbt

Agora que dominamos os conceitos de transformação e o blueprint dimensional da Northwind (Cap. 15), montaremos passo a passo o projeto usando dbt. Cada seção aborda um conceito-chave:

1. Introdução ao dbt.
2. Configuração do ambiente e carregamento das *seeds*.
3. Construção das camadas `stg → int → marts`, começando pela dimensão de produtos.
4. Testes, documentação, pacotes, demais dimensões e fatos.
5. Testes singulares e organização do `dbt_project.yml`.
6. Conclusão e próximos passos.

O objetivo é que você consiga replicar todo o laboratório no Databricks, entendendo o porquê de cada decisão. Na próxima etapa (Cap. 17) repetiremos o fluxo com Lakeflow Declarative Pipelines para comparar as abordagens.
