# 4.6 ER e Normalização de dados

Modelos entidade-relacionamento geralmente são acompanhados de um processo de **normalização**: dividir dados em tabelas menores para reduzir redundância e garantir consistência nas operações de escrita. Isso permite que sistemas transacionais registrem vendas, cadastros ou lançamentos financeiros com rapidez e segurança.

## Por que normalizar?

- **Elimina duplicidade**: se o endereço do cliente está em uma única tabela, uma atualização reflete em todos os pedidos.
- **Garante integridade**: chaves estrangeiras evitam registros órfãos e asseguram relacionamentos corretos.
- **Facilita atualizações**: cada transação envolve o mínimo necessário de colunas, acelerando operações OLTP.

As “formas normais” — 1FN, 2FN, 3FN e além — definem regras progressivas para alcançar esse estado. Na terceira forma normal (3FN), por exemplo, cada atributo depende apenas da chave primária, e nada mais[^normalizacao].

## Desafios para analytics

Quando o objetivo é análise, tanta fragmentação se torna um obstáculo:

- **Consultas complexas**: métricas simples podem exigir dezenas de *joins*, deixando as transformações difíceis de manter.
- **Interfaces automáticas**: ferramentas de BI que inferem relacionamentos podem errar conexões em modelos muito normalizados.
- **Histórico limitado**: sistemas transacionais costumam sobrescrever valores em vez de manter o histórico completo, o que impede análises de evolução.

Por isso, ao migrarmos dados para um ambiente analítico, normalmente recorremos a modelos **denormalizados** — como o modelo dimensional — que favorecem leituras rápidas e entendimento intuitivo. No {ref}`dw` (Capítulo 8) e nos Capítulos 9–11 veremos esse processo em detalhe.

[^normalizacao]: Existem diferentes níveis de normalização. A mais utilizada é a terceira forma normal (3FN). A mnemônica popular entre arquitetos diz: “The key, the whole key, and nothing but the key. So help me Codd.” em homenagem a Edgar Codd, criador do modelo relacional.
