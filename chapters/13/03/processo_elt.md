(processo_elt)=
# 13.3 O Processo de ELT

Todo pipeline começa com um problema de negócio: precisamos entregar informação confiável para uma decisão específica. O ELT é o fio condutor que leva esse problema da descoberta até um dashboard ou produto analítico. Ferramentas são essenciais, mas só produzem valor quando conectadas por um processo coerente.

```{figure} ../../../assets/img/processo_elt.png
:name: processo_elt_fig
:height: 450px

Etapas do Processo de ELT
```

## Planejamento e tradução do problema

Planejamento não precisa ser um documento gigantesco, e sim um ciclo contínuo de entendimento, priorização e feedback. O objetivo é alinhar expectativas, preparar o terreno para a ingestão e garantir que tudo o que for modelado tenha dono e propósito claros.

### Entendimento do problema

Colete materiais que expliquem o contexto: objetivos estratégicos, indicadores atuais, painéis existentes, planilhas paralelas e quem responde por cada métrica. Pergunte como as decisões são tomadas hoje, quais são os gargalos e quais valores de referência ajudarão na validação futura.

### Mapeamento de dados

Com o problema em mãos, investigue onde os dados vivem. Muitas vezes o que vemos na tela do sistema não corresponde ao formato armazenado na base. Use {ref}`diagramas ERD<modelagem_bd>`, navegação exploratória e entrevistas com os donos dos sistemas. Sempre que possível, estabeleça contratos de dados (schema, tipos, periodicidade, SLAs e responsáveis).

### Modelo conceitual do DW

Atualize o modelo dimensional desenhando fatos e dimensões coerentes com as necessidades mapeadas. Reforce a conformidade entre dimensões e identifique atributos que podem ser compartilhados no futuro. Esse blueprint ajudará tanto a ingestão (saber o que buscar) quanto a transformação (saber como organizar).

## Ingestão de dados

Com o que e o onde definidos, partimos para trazer os dados à camada bruta (_raw_/Bronze). A ingestão responde a perguntas como: qual conector usar? É _batch_ ou streaming? Preciso de CDC? No {ref}`ingestao` entraremos na teoria dessa etapa para que você possa desenhar pipelines de transformação com segurança.

## Transformação

Aqui os dados brutos evoluem para conjuntos confiáveis. Aplicamos regras de negócio, normalizamos dimensões, calculamos métricas e estruturamos camadas intermediárias. Esse é o coração do trabalho de um Analytics Engineer, e será aprofundado no {ref}`transformacao`.

### Entrega e consumo

Dados só geram valor quando chegam ao usuário final. Promova modelos após revisão por pares, testes e documentação ({ref}`boas_praticas`). Automatize deploys com CI/CD e disponibilize os resultados em catálogos, APIs ou modelos prontos para BI, sempre com ownership definido.

## Operar, monitorar e evoluir

- **Orquestração**: agende pipelines, trate dependências e configure retentativas com Airflow, Dagster, Prefect ou workflows nativos. Conecte tudo ao Git para ter rastreabilidade.  
- **Observabilidade e custos**: monitore freshness, volume, schema e custos de execução. Alertas rápidos reduzem impacto e evitam surpresas na conta.  
- **Segurança**: implemente IAM por papéis, segregue ambientes (dev/staging/prod) e aplique mascaramento quando necessário.

Com esse processo como referência, seguimos para o Capítulo 14, onde destrincharemos as decisões de ingestão antes de mergulharmos na transformação prática do Capítulo 15.
