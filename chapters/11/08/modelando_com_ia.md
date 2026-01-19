# 11.8 Acelerando a modelagem com uso de IA

O processo de modelagem de um Data Warehouse, como vimos, é metódico e exige um profundo entendimento do negócio e dos dados. Tradicionalmente, cada etapa, desde o planejamento até a concepção do esquema, envolve um esforço manual significativo. No entanto, com o avanço da Inteligência Artificial (IA), especialmente dos grandes modelos de linguagem (LLMs), o engenheiro de analytics ganha um "copiloto" capaz de acelerar drasticamente essas tarefas.

A ideia não é substituir o raciocínio estratégico do engenheiro, mas sim automatizar as tarefas repetitivas e trabalhosas. Isso libera o profissional para focar em atividades de maior valor, como a interpretação de requisitos complexos, a validação das lógicas de negócio e a garantia da qualidade e integridade do modelo final.

## Descoberta e planejamento assistido por IA

A fase inicial de planejamento, que envolve a tradução de requisitos de negócio em um plano técnico, é um ponto onde a IA pode oferecer grande ajuda. Em vez de analisar manualmente dezenas de documentos ou consultar exaustivamente os sistemas de origem, um modelo de IA pode:

- **Sugerir Data Marts:** Analisando documentos de requisitos, transcrições de reuniões ou a comunicação interna da empresa, a IA pode identificar e agrupar processos de negócio (vendas, finanças, logística), sugerindo os candidatos ideais para os primeiros Data Marts a serem construídos, acelerando a priorização.

- **Inferir Fatos e Dimensões**: A partir do esquema de um banco de dados transacional, a IA pode realizar um levantamento automático das tabelas. Ela consegue analisar nomes de colunas (buscando por sufixos como `_id`, `_dt` ou prefixos como `valor_`), tipos de dados e cardinalidade para inferir quais tabelas são candidatas a se tornarem Fatos (ex: tabelas com muitas chaves estrangeiras e colunas numéricas, como pedidos) e quais são candidatas a Dimensões (ex: tabelas com dados descritivos e baixa cardinalidade, como clientes ou produtos).

- **Descobrir relações e propor esquemas**: Após identificar as potenciais tabelas, o passo seguinte é conectá-las. A IA pode analisar chaves estrangeiras existentes, similaridade entre nomes de colunas (ex: cli_id na tabela fato e id_cliente na tabela dimensão) e até a sobreposição de valores entre colunas para propor as relações de JOIN. Com base nisso, ela pode automaticamente sugerir um modelo inicial em star schema, conectando as dimensões inferidas à tabela fato central.

```{admonition} Use a IA como copiloto, não como piloto automático
É fundamental entender que a Inteligência Artificial é uma ferramenta de auxílio. Os esquemas e códigos gerados por ela devem ser tratados como um ponto de partida, e não como a versão final. A responsabilidade de revisar, testar, validar e garantir a qualidade do modelo final continua sendo integralmente do engenheiro de analytics.
```