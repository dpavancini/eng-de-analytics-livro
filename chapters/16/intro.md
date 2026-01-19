# Capítulo 16 - Construindo o projeto Northwind no dbt

Agora que dominamos os conceitos de transformação e o blueprint dimensional da Northwind (Cap. 15), vamos montar passo a passo o projeto usando dbt. A ideia aqui é conectar “o que é um bom modelo” com “como operacionalizar isso” em um pipeline de transformação versionado, testado e documentado.

Cada seção do capítulo adiciona uma peça do quebra-cabeça:

1. **16.1** – introdução ao dbt e ao papel dele no ELT.
2. **16.2** – primeiros comandos e carregamento da base Northwind com *seeds*.
3. **16.3** – construção da primeira dimensão e o fluxo `stg → int → marts`.
4. **16.4** – testes genéricos e documentação como contrato do dado.
5. **16.5** – materializações e trade-offs de performance × custo.
6. **16.6** – configurações do projeto via `dbt_project.yml` (padrões e exceções).
7. **16.7** – pacotes do dbt (`dbt_utils`) para acelerar padrões recorrentes.
8. **16.8** – criação das demais dimensões.
9. **16.9** – tabelas fato e métricas (do `intermediate` ao `marts`).
10. **16.10** – testes singulares para validar métricas críticas.
11. **16.11** – deploy no dbt Platform (environments e jobs).
12. **16.12** – conclusão e próximos passos.

O objetivo é que você consiga replicar todo o laboratório no Databricks entendendo o porquê de cada decisão — e, principalmente, como montar um projeto que se mantenha saudável quando ele crescer (mais fontes, mais regras e mais consumidores).

Na próxima etapa (Cap. 17), repetiremos o fluxo com o Lakeflow Declarative Pipelines para comparar as abordagens.
