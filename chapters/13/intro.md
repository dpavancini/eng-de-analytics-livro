(intro_elt)=
# Capítulo 13 - Introdução ao ELT

Nos capítulos anteriores você aprendeu a modelar fatos e dimensões e a manipular dados com SQL. Agora iniciamos a jornada operacional: sair das fontes transacionais, carregar para o data warehouse e transformar tudo em modelos governados. Esse movimento é guiado pelo ELT.

ELT (Extract, Load, Transform) é a estratégia moderna em que primeiro extraímos e carregamos dados brutos para o DW/lakehouse e só depois aplicamos as transformações na própria plataforma analítica. Essa inversão libera todo o potencial de processamento do warehouse, facilita o versionamento e cria um terreno fértil para colaboração entre engenharia e negócio.

O que você verá neste capítulo
- Por que o ETL foi dominante por anos e em que situações ainda faz sentido.
- Como o ELT reorganiza responsabilidades e por que ele é a base do Modern Data Stack.
- O processo ponta a ponta: planejamento → ingestão → transformação → entrega → operação.
- Práticas que sustentam projetos duradouros: camadas bem definidas, versionamento em Git, testes no dbt, observabilidade e automação.
- Onde IA/LLMs podem acelerar a rotina sem abrir mão de validação humana.

Ao finalizar este capítulo você terá o mapa completo. No Capítulo 14 exploraremos a etapa de ingestão — de modo conceitual, entendendo as escolhas que um Analytics Engineer precisa fazer — e no Capítulo 15 mergulharemos na transformação, parte central do seu dia a dia.
