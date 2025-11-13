(sql)=
# Capítulo 5 - SQL para Análise e Engenharia de Analytics

SQL é a língua franca dos dados. Em praticamente todo projeto moderno — do protótipo a um Data Warehouse corporativo — é por meio do SQL que traduzimos perguntas de negócio em respostas objetivas. Para o Engenheiro de Analytics, dominar SQL não é só “saber consultar tabelas”: é construir métricas confiáveis, garantir qualidade, viabilizar modelos analíticos e conectar tudo isso a ferramentas como bancos de dados, dbt, notebooks e BI.

Neste capítulo, vamos praticar os padrões de consulta que respondem 80% das perguntas do dia a dia. Você não precisa conhecer todos os dialetos ou recursos avançados; precisa de fluência nos blocos essenciais e de uma mentalidade analítica para combiná‑los.

O estudo de caso continua baseado na base Northwind (veja 1.4), usando SQLite nos notebooks para que você possa reproduzir os exemplos localmente.

O que você vai aprender
- Selecionar e filtrar dados com `SELECT`, `WHERE`, `ORDER BY` e `LIMIT`.
- Relacionar tabelas com `JOIN` e boas práticas de chaves.
- Resumir informações com funções agregadoras e `GROUP BY` (e quando usar `HAVING`).
- Criar colunas derivadas e regras de negócio com `CASE WHEN`.
- Aplicar funções de janela para rankings, totais acumulados e percentis.
- Compor consultas mais complexas com Subqueries e CTEs.

Como pensar em SQL (ordem de avaliação)
- Comece pelo “de onde vêm os dados?”: `FROM` (+ `JOIN`).
- Depois, “quais linhas importam?”: `WHERE` (filtro antes de agregar).
- Em seguida, “como quero resumir?”: `GROUP BY` + agregações.
- Filtre agregações, se necessário: `HAVING`.
- Só então defina “o que mostrar”: `SELECT` (inclui `CASE WHEN`, aliases, funções).
- Por fim, “como ordenar e limitar?”: `ORDER BY`, `LIMIT`.

Ao longo das seções, conectaremos cada construção a perguntas práticas de negócio (ticket médio, top N produtos, evolução de vendas) e destacaremos decisões típicas do Engenheiro de Analytics: quando pré‑agregar, quando calcular on‑the‑fly e como manter consistência entre notebooks, dbt e BI.

```{admonition} Nota sobre dialetos (SQLite x Databricks SQL)
:class: note
Os notebooks usam SQLite pela simplicidade. Em Databricks SQL, ajuste funções de datas (`DATE_TRUNC` em vez de `STRFTIME`), janelas e tipos. Sempre que houver diferenças, indicamos alternativas. O raciocínio (JOINs, agregações, janelas) é o mesmo.
```

```{admonition} IA como copiloto
Modelos de linguagem (LLMs) aceleram rascunhos de queries e explicam SQL complexo, mas não substituem o seu julgamento. Use a IA para: sugerir JOINs, checar a lógica de um `CASE`, propor testes de qualidade (ex.: “não deve haver `NULL` em chaves”), revisar nomes e clareza. Sempre valide resultados e performance.
```

Estrutura do capítulo
- 5.1 SELECT, WHERE, ORDER BY
- 5.2 JOINs (inner/left e quando usá‑los)
- 5.3 Funções agregadoras
- 5.4 GROUP BY e HAVING
- 5.5 CASE WHEN e colunas derivadas
- 5.6 Funções de janela (window functions)
- 5.7 Subqueries e CTEs

Ao final, você terá um repertório sólido para responder perguntas de negócio com clareza, construir camadas analíticas reutilizáveis e preparar terreno para as boas práticas de desenvolvimento no Capítulo 6.
