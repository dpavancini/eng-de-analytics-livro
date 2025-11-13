(elt)=
# 13.2 O ELT

Embora existam variações de arquitetura e ferramentas, o quadro geral é o mesmo:

- Extração/Load: conectores (open‑source e SaaS) movem dados de ERPs, CRMs, bancos, REST APIs e eventos para o DW. Em muitos casos, usam CDC (Change Data Capture) para trazer apenas mudanças. A etapa de load ocorre junto com a extração.
- Transformação: dentro do DW, aplicamos regras de negócio via SQL/Python, organizando camadas e garantindo qualidade com testes e documentação.

No diagrama abaixo, vemos como a etapa de ELT se destaca na arquitetura geral do {ref}`MDS<MDS>`:


```{figure} ../../../assets/img/elt_fluxo.png
:name: elt_fluxo

Exemplo do fluxo de ELT
```

Na prática, o ELT concentra a maior parte do trabalho em projetos de analytics. Em equipes menores, um Engenheiro de Analytics pode cuidar de ponta a ponta; em ambientes críticos, tarefas se dividem entre times de dados (ingestão, plataforma) e analytics (modelagem, métricas, BI).

```{admonition} Pense no ELT como um processo contínuo
Requisitos mudam com o negócio: planeje para evoluir. Automatize, versione e teste para sustentar mudanças com segurança.
```

Boas práticas para ELT moderno
- Camadas bem definidas: Existem duas abordagens predominantes para estruturar as camadas no ELT moderno:
    - **Estilo Databricks**: Bronze (dados brutos ingestados), Prata (dados limpos, integrados ou intermediários) e Ouro (dados prontos para consumo analítico, como marts ou métricas). Esse padrão é muito comum em arquiteturas lakehouse e enfatiza a clareza do ciclo de vida dos dados.
    - **Estilo dbt**: Raw (dados brutos carregados), Staging (dados limpos e padronizados), Intermediate (transformações intermediárias que normalizam ou enriquecem), e Marts (modelos finais de negócio, como fatos e dimensões). O dbt incentiva a modularização nomeando modelos e subpastas conforme essas camadas.
  Nomeie e documente cada camada no seu projeto para garantir rastreabilidade, clareza de propósito e facilitar a colaboração entre times.
- dbt (ou similar): modelos versionados em Git, testes (`unique`, `not_null`, `relationships`), documentação e macros para DRY.
- Incrementalidade: use modelos incrementais, janelas de reprocessamento (lookback) e snapshots quando necessário.
- Observabilidade: monitore freshness/volume/anomalias e alerte quebras cedo (dbt source freshness, ferramentas de DQ).
- Orquestração: agende e controle dependências (Airflow, Dagster, Prefect, Workflows nativos).
- Governança e segurança: IAM por papéis, mascaramento e data contracts entre produtores/consumidores.

```{admonition} IA como copiloto
Peça ajuda para escrever descrições de colunas, sugerir testes mínimos por modelo, rascunhar macros e revisar diffs. Valide a lógica e não exponha dados sensíveis.
```

Nas próximas seções, apresentamos o processo de ELT passo a passo e contextualizamos com os capítulos seguintes: ingestão (Cap. 14) e transformação (Cap. 15). Vamos lá?
