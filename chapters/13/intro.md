(intro_elt)=
# Capítulo 13 - Introdução ao ELT

Nos capítulos anteriores, você viu como modelar dados em um Data Warehouse (DW) usando fatos e dimensões, e praticou SQL para responder perguntas de negócio. Agora começa a parte operacional: como levar dados das fontes até o DW e transformá‑los em modelos confiáveis, versionados e testados. É aqui que entra o ELT.

ELT (Extract, Load, Transform) é a abordagem moderna em que primeiro extraímos e carregamos dados brutos para o DW/lakehouse e, depois, transformamos esses dados “por dentro”, próximo ao motor analítico. Isso favorece performance, governança e colaboração — os pilares do Modern Data Stack.

O que você vai aprender nesta parte
- A diferença entre ETL e ELT, e quando cada um faz sentido.
- O fluxo de ponta a ponta: planejamento → ingestão → transformação → entrega.
- Boas práticas: camadas (bronze/prata/ouro), versionamento (Git), testes e documentação (dbt), qualidade e observabilidade.
- Como IA/LLMs podem acelerar tarefas repetitivas sem substituir validação humana.

Nos capítulos seguintes desta parte, detalharemos cada etapa: a ingestão de dados (Cap. 14) e a transformação em modelos analíticos (Cap. 15), com processos, ferramentas e exemplos práticos.
