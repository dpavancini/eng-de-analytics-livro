# 2.5 Veracidade

Se não confiamos nas métricas, não agimos. Garantir veracidade significa preservar a integridade, o contexto e a interpretação correta dos dados ao longo de todo o pipeline. É um trabalho contínuo de engenharia, processos e relacionamento com as áreas que produzem informação.

Alguns pilares de um programa moderno de qualidade de dados:

- **Definições compartilhadas**: documentar o que significa “dados limpos”, quais regras e tolerâncias são aceitáveis e quem aprova mudanças. Esses acordos frequentemente aparecem em catálogos com *owners* claros.
- **Testes automatizados**: valide chaves primárias, relações, ranges, unicidade, nulos e regras específicas do domínio de negócio.
- **Observabilidade e alertas**: monitore continuamente os pipelines de dados para garantir a execução confiável das tarefas e a atualização consistente das informações entregues aos consumidores.
- **Linhagem acessível**: rastreie colunas desde a fonte até o BI para acelerar investigações. Ferramentas de *lineage* ajudam a explicar impactos de mudanças antes que o problema aconteça.
- **Governança de mudanças**: implemente fluxos de aprovação para alterações em regras de negócio.

### Testes práticos com dbt

- `unique` e `not_null` em chaves naturais/surrogates (ex.: `customer_id`).
- `relationships` para garantir integridade referencial entre fatos e dimensões.
- `accepted_values` e `dbt-expectations` para regras de domínio (ex.: status válidos, ranges, porcentagens). 
- Freshness em `sources` para monitorar desatualização.

Exemplo (dim_clientes): `customer_id` `not_null` + `unique`; `customer_status` em {‘ativo’, ‘inativo’, ‘suspenso’}; relacionamento `orders.customer_id -> dim_clientes.customer_id`.

Quando trabalhamos com dados estruturados, ainda valem as restrições clássicas de integridade[^wiki]:

* **integridade de entidade** diz respeito ao conceito de chave primária; é uma regra que afirma que cada tabela deve ter uma chave primária e que a coluna ou as colunas escolhidas para serem a chave primária devem ser únicas e não nulas.

* **integridade referencial** diz respeito ao conceito de chave estrangeira; essa regra estabelece que qualquer valor de chave estrangeira pode ser apenas em um de dois estados: normalmente, o valor de chave primária de alguma tabela ou, ocasionalmente, dependendo das regras do proprietário dos dados, null; nesse último caso, afirma-se explicitamente que não há relação entre os objetos representados no banco de dados ou que essa relação é desconhecida.

* **integridade de domínio** especifica que as colunas de uma tabela em um banco de dados relacional devem ser declaradas em um domínio definido; a principal unidade de dados no modelo de dados relacionais é o item de dados; tais itens são considerados atômicos/indivisíveis; um domínio é um conjunto de valores do mesmo tipo; os domínios são, portanto, conjuntos/faixas de valores a partir dos quais os valores reais são adicionados às colunas de uma tabela.

[^wiki]: Disponível em: https://pt.wikipedia.org/wiki/Integridade_de_dados.
