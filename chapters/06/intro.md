(MDS)=
# Capítulo 6 -  O Modern Data Stack

O Modern Data Stack (MDS) surgiu para resolver dores conhecidas dos “velhos” projetos de dados: ferramentas fechadas difíceis de versionar, integrações frágeis, ciclos longos de entrega, dependência de times centralizados e, no fim, métricas inconsistentes nas áreas de negócio. Com a nuvem, o MDS organiza uma forma mais simples, modular e colaborativa de construir analytics — com qualidade e velocidade.

Em vez de monólitos, o MDS combina componentes especializados: conectores de ingestão, um data warehouse/lakehouse central, transformação como código (ex.: dbt, Lakeflow Declarative Pipelines), orquestração, testes e uma camada de visualização. A governança acontece de ponta a ponta, com controle de acesso, documentação e linhagem.

O MDS não é uma lista fixa de ferramentas; é um conjunto de princípios para compor a arquitetura adequada a cada contexto, priorizando padrões abertos, automação e reprodutibilidade. Ele também é a fundação para iniciativas de IA/ML: a mesma base serve para features, vetores/embeddings, catálogos, monitoramento e deploy de modelos.

O que você vai ver neste capítulo
- Princípios que guiam a construção do MDS e evitam armadilhas comuns.
- Uma arquitetura de referência, com camadas e opções de ferramentas.
- Onde IA/ML e LLMs se encaixam na pilha (feature store, vetores, serving).

Na próxima seção, começamos pelos princípios; depois, detalhamos uma arquitetura de referência, suas variações e trade-offs. Vamos lá?
