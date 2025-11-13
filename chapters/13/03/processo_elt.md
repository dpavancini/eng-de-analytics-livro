(processo_elt)=
# 13.3 O Processo de ELT

O processo de ELT se inicia com o problema de negócio: precisamos ter dados confiáveis para utilização na tomada de decisão. Esse problema é o norte de todo projeto de Analytics, ainda que apareça em diferentes "sabores" a depender do cliente ou metodologia utilizada. Vendo dessa forma, percebemos que a maior parte dos conceitos e ferramentas apresentadas neste livro como parte da "caixa de ferramentas" de um Engenheiro de Analytics são necessárias, mas não suficientes para um projeto de analytics de sucesso. O real valor será calculado com base na qualidade e disponibilidade da informação disponível para o usuário final dos dados: o tomador de decisão.


```{figure} ../../../assets/img/processo_elt.png
:name: processo_elt_fig
:height: 450px

Etapas do Processo de ELT
```

Assim, o processo de ELT é muito mais amplo do que “extrair e carregar” dados. Ele abrange da descoberta de requisitos até a entrega final em tabelas consumíveis e painéis – passando por governança, automação e qualidade. 

## Planejamento

O planejamento alinha objetivos de negócio e implementação técnica. Evite planos extensos e estáticos; prefira ciclos curtos e incrementais, com entregas verificáveis e feedback real do usuário.

### Entendimento do Problema

Na etapa de **Entendimento do Problema**, nosso objetivo é obter o máximo de informações sobre os problemas de negócio que devem ser resolvidos com o projeto. Para isso, precisamos solicitar aos times de negócio e *stakeholders* informações relevantes para o entendimento dos dados, tais como planilhas, consultas, relatórios e **dashboards**. Entre as informações que queremos obter, estão:

* Background da empresa
* Objetivos estratégicos
* Expectativas com o projeto
* Principais KPIs (indicadores) relacionados ao projeto
* "Donos" dos indicadores ou **stakeholders** que devem ser consultados
* Valores de referência para validação posterior
* Fluxo de decisão: quem usa os indicadores, quando e para quê

### Mapeamento de Dados

A partir das necessidades de negócio identificadas, precisamos avaliar a disponibilidade de dados. Nem sempre os dados identificados pelos usuários de negócio são de fácil acesso, ou mesmo acessáveis em primeiro lugar. Além disso, é comum que a forma como os dados brutos estão armazenados fisicamente seja bem diferente do formato com o qual os dados são acessados pela interface dos sistemas empresariais ou relatórios.

Para realizar o mapeamento de dados, utilize {ref}`diagramas ERD<modelagem_bd>`, planilhas e data discovery no próprio DW. Contratos de dados (schemas esperados, tipos, semântica, SLAs) reduzem surpresas e aceleram o desenvolvimento.

### Elaboração do Modelo Conceitual do DW

O próximo passo é desenharmos (ou atualizarmos) o modelo conceitual do *data warehouse* que estamos desenvolvendo. Como já falamos no {ref}`modelagem_dw`, precisamos desenhar as tabelas Fato e Dimensão apropriadas e os relacionamentos entre elas, tomando especial atenção na conformidade entre dimensões.

## Ingestão de Dados

Definidos quais dados precisamos e onde buscá‑los, realizamos a ingestão para o DW: extraímos das fontes e disponibilizamos na camada bruta (Bronze). Veremos detalhes no {ref}`ingestao`.

## Transformação

Na transformação, os dados brutos se tornam conjuntos confiáveis para decisão. É aqui que a Engenharia de Analytics gera mais valor: camadas claras (Prata/Ouro), métricas consistentes, testes e documentação. Veremos tarefas e boas práticas no {ref}`transformacao`.

### Entrega Final

Seguindo as {ref}`boas práticas de programação<boas_praticas>`, só disponibilizamos dados após testes, documentação e revisão (PR). Promova para produção via pipeline (CI/CD) e monitore freshness e volumetria. Dados em produção devem estar prontos para virar informação útil.

## Orquestração e automação

Agende e monitore seus pipelines com orquestradores (Airflow, Dagster, Prefect ou soluções nativas). Modele dependências, trate reprocessamentos (lookback), retentativas e alertas. Conecte‑os ao seu repositório Git e esteira de CI.

## Observabilidade, custos e segurança

- Observabilidade: monitore freshness, volume, schema e anomalias. Alerta rápido reduz impacto.
- Custos: instrumente query costs e tempo de execução; use partições/clusterização para economizar.
- Segurança: aplique IAM por papéis, mascaramento e segregação de ambientes (dev/staging/prod).

No próximo capítulo, detalharemos a ingestão de dados, a etapa inicial do ELT. Vamos lá?
