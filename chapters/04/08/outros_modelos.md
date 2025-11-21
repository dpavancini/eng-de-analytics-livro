# 4.8 Outras classificações de modelagem de bancos de dados

Documentação de sistemas transacionais nem sempre vem em formato único. Em diferentes projetos você encontrará modelos nos níveis conceitual, lógico e físico — cada um respondendo a perguntas distintas. Reconhecer essas camadas ajuda a interpretar a informação disponível e planejar a arquitetura do data warehouse com mais segurança.

## Modelagem conceitual

O modelo conceitual estabelece entidades, atributos e seus relacionamentos. Este modelo abstrai a estrutura do banco de dados e se preocupa com a criação de um modelo do mundo real. Estes modelos criam um vocabulário comum para todos os usuários de dados.

```{figure} ../../../assets/img/04_08_modelo_conceitual.png
:name: modelo_conceitual

O modelo conceitual apresenta uma visão simplificada.
```

Use-o para alinhar vocabulário, validar escopo e entender as perguntas que o sistema precisa responder.

## Modelagem lógica

Traduz o modelo conceitual para estruturas de dados mais detalhadas: tipos de atributos, cardinalidades, normalização. Ainda não está amarrada a um banco específico, mas já se aproxima da implementação.

```{figure} ../../../assets/img/04_08_modelo_logico.png
:name: modelo_logico

O modelo lógico mostra tabelas, atributos e relacionamentos em maior detalhe.
```

Para analytics, esse nível indica onde os dados realmente estarão e quais tabelas precisaremos combinar.

## Modelagem física

É a versão final que considera o SGBD escolhido: nomes de tabela, tipos específicos, índices, partições, configurações de armazenamento e políticas de segurança.

```{figure} ../../../assets/img/04_08_modelo_fisico.png
:name: modelo_fisico

O modelo físico traz os detalhes específicos do RDBMS utilizado.
```

Ter acesso a esses modelos acelera o trabalho de extração e transformação. Quando não houver documentação formal, vale reconstruir parte desses diagramas durante a descoberta inicial do projeto — hoje existem ferramentas automatizadas que ajudam a gerar diagramas a partir do schema existente.
