(elt)=
# 13.2 O ELT

O ELT nasceu da combinação de três movimentos: storage barato em cloud, motores analíticos altamente paralelos e ferramentas colaborativas como o dbt. Em vez de transformar antes de carregar, passamos a:

1. **Extrair/Carregar**: conectores (open source e SaaS) movem dados de ERPs, CRMs, bancos, APIs e eventos direto para o DW. Na prática, a extração já envia os dados para a camada _raw_ ou _bronze_. Técnicas como CDC (Change Data Capture) evitam reprocessamentos desnecessários.
2. **Transformar dentro do DW**: usamos SQL/Python próximos ao dado, organizando camadas, versionando em Git e executando em ambiente gerenciado (dbt Cloud, Lakeflow Declarative Pipelines, notebooks, jobs orquestrados).

```{figure} ../../../assets/img/13_02_elt_fluxo.png
:name: elt_fluxo

Exemplo do fluxo de ELT
```

Na maior parte dos projetos de analytics modernos o ELT concentra o esforço diário. Times pequenos podem cuidar de ponta a ponta; estruturas maiores tendem a dividir responsabilidades (plataforma/ingestão, analytics engineering, BI). Independentemente do tamanho, pense no ELT como um processo contínuo: requisitos evoluem, dados mudam e seu pipeline precisa acompanhar.

Boas práticas para ELT moderno
- **Camadas claras**  
  - Estilo Databricks: Bronze (dados brutos), Prata (dados limpos e integrados) e Ouro (marts, métricas e produtos analíticos).  
  - Estilo dbt: Raw → Staging → Intermediate → Marts.  
  Documente o objetivo de cada camada e padronize nomenclaturas para facilitar o handoff entre squads.
- **dbt (ou similar)**: modele em SQL versionado, aplique testes (`unique`, `not_null`, `relationships`), descreva colunas e use macros para reduzir repetição.
- **Incrementalidade**: prefira modelos incrementais ou snapshots quando fizer sentido, sempre com lookback configurado para corrigir atualizações retroativas.
- **Observabilidade**: monitore freshness, volume e esquema com ferramentas próprias ou recursos nativos (dbt source freshness, Great Expectations, Soda). Alertas rápidos evitam dados desatualizados.
- **Orquestração**: agende dependências com Airflow, Dagster, Prefect ou workflows nativos do DW. Orquestração garante cadência e facilita reprocessamentos.
- **Governança e segurança**: defina privilégios por catálogo/esquema, oculte dados sensíveis e use data contracts entre produtores e consumidores.
- **IA como copiloto**: utilize LLMs para rascunhar descrições de colunas, sugerir testes mínimos ou revisar diffs. Ainda assim, valide as regras de negócio e não exponha dados confidenciais.

Nos próximos tópicos vamos detalhar o processo completo de ELT, preparando o terreno para falar de ingestão (Cap. 14) e transformação com dbt (Cap. 15) e transformação com Lakeflow Declarative Pipelines (Cap. 16).
