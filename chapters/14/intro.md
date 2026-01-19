(ingestao)=
# Capítulo 14 - Ingestão de dados

Depois de entender o processo de ELT como um todo, precisamos nos aprofundar no primeiro componente: levar os dados das fontes até o data warehouse. Este capítulo tem uma proposta explícita: apresentar a visão conceitual da ingestão que todo Analytics Engineer deve dominar para planejar pipelines de transformação robustos. Não haverá exercícios práticos ou ferramentas específicas aqui; a aplicação concreta ficará para o Capítulo 15, quando vamos focar na transformação e na modelagem em dbt.

Vamos abordar dois pilares:

1. Como acessar diferentes tipos de fontes (bancos relacionais, APIs, eventos) e quais pré-requisitos garantir antes de iniciar um projeto.
2. Quais estratégias de carga existem (full, incremental, CDC) e como escolher a abordagem ideal para cada cenário.

Ao finalizar a leitura você terá clareza sobre as decisões que antecedem o desenvolvimento no dbt. Guarde essas notas: elas serão úteis quando projetarmos nossos modelos no próximo capítulo.
