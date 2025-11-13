# 6.3 Convenções do livro

Para facilitar a leitura, os exercícios e a implementação prática, adotamos convenções simples e coerentes com ferramentas modernas (dbt, DW/Lakehouse, Databricks). Use-as como referência rápida.

Camadas e organização
- Bronze (bruto), Prata (limpo/integrado), Ouro (marts/métricas).
- Nomenclatura de três níveis no Databricks (Unity Catalog): `catalog.schema.table`. Defina um catálogo por ambiente e separe schemas por domínio (ex.: `main.analytics_dev.dim_clientes`, `main.analytics_prod.fct_vendas`).
- Diretórios no dbt: `models/staging` (limpeza), `models/intermediate` (integração), `models/marts` (consumo); `macros/`, `snapshots/`, `seeds/` e `tests/` conforme necessário.

Nomenclatura de modelos e objetos
- Prefixos de modelos: `stg_` (staging), `int_` (intermediate), `dim_` (dimensões), `fct_` (fatos).
- Seeds: `seed_`; Snapshots: `snap_`.
- Evite `select *` em produção; declare colunas explicitamente.
- Em Databricks/Unity Catalog, padronize snake_case e minúsculas; documente convenções de plural/singular.

Chaves e integridade
- Chave de Negócio (BK) explícita em dimensões e fatos; Chave Surrogate (SK) inteira (`BIGINT`) ou hasheada quando apropriado.
- FKs em fatos apontam para SKs das dimensões; padronize nomes (ex.: `sk_cliente`, `sk_produto`).
- Para SCD Tipo 2: `valid_from`, `valid_to`, `is_current` (0/1), `load_ts` e `source_system` quando útil.

Datas, horas e métricas
- Datas/hours em UTC e formatos ISO quando possível; evite ambiguidade de fuso.
- Métricas com nomes claros, fórmula e granularidade definidas; preferir camada semântica para reutilização.

Testes e documentação
- Testes mínimos por modelo: `unique`, `not_null`, `relationships` e regras de negócio.
- Documente modelos e colunas; gere docs navegáveis (ex.: `dbt docs`).

Incrementalidade e histórico
- Modelos incrementais com chaves naturais e `updated_at` para upsert/merge.
- Snapshots para histórico (SCD) quando necessário.
- Reprocessamento controlado (lookback) para capturar atualizações retroativas.

Padrões de junção e performance
- As‑of join para mapear FKs em dimensões SCD2.
- Particione/clusterize para performance; evite subconsultas desnecessárias se `GROUP BY` resolver.
- Em Delta, compacte arquivos periodicamente (`OPTIMIZE`) e considere `ZORDER` para colunas de filtro seletivas.

Segurança e governança
- Segredos em cofres/variáveis de ambiente; princípio do menor privilégio.
- Contratos de dados (schemas esperados, tipos, semântica, SLAs) entre produtores e consumidores.

```{admonition} Unity Catalog: práticas rápidas
:class: tip
- Padronize catálogos por ambiente (ex.: `main`/`prod`) e schemas por domínio (ex.: `sales`, `finance`).  
- Use grants por grupo de acesso e evite permissões a usuários individuais.  
- Registre dados sensíveis e aplique mascaramento quando necessário.
```

Essas convenções aparecem ao longo do livro e nos exemplos práticos, especialmente nos capítulos de modelagem (8–11), setup (12) e ELT (13–15).
