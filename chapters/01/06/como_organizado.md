# 1.6 Como este livro está organizado

Agora que já entendemos o contexto, o papel do Engenheiro de Analytics e o público-alvo, é hora de ver **como este livro foi estruturado**.  
Nosso objetivo é equilibrar teoria e prática, refletindo a natureza híbrida da profissão: técnica e de negócios ao mesmo tempo.  

O conteúdo está dividido em três grandes módulos:

---

## Fundamentos

Começamos com conceitos introdutórios sobre os desafios de dados e analytics através dos {ref}`5 Vs<5_vs>`.  
Em seguida, o {ref}`pensando_analitico` apresenta técnicas de resolução de problemas aplicadas tanto ao negócio quanto ao pipeline de dados.  

Na sequência, o {ref}`banco_dados` introduz conceitos essenciais de bancos de dados, especialmente para profissionais vindos do negócio que ainda não tiveram contato formal com SQL.  
Esse capítulo se conecta com o {ref}`sql`, que apresenta de forma introdutória as principais operações necessárias em projetos de analytics.  

---

## Modelando Dados

Neste módulo, entramos no coração do **data warehouse**.  
O {ref}`dw` traz os conceitos fundamentais e o papel dos DWs no *Modern Data Stack*.  
Depois, o {ref}`fatos` explica o conceito de tabelas fato e o {ref}`dimensoes` mostra como definir e identificar dimensões.  

Por fim, o {ref}`modelagem_dw` apresenta um passo a passo de modelagem conceitual e o {ref}`databricks` mostra como configurar, na prática, um data warehouse moderno com Databricks.  

---

## Transformando Dados (ELT)

Na terceira parte, aplicamos os conceitos de ELT em projetos reais de Engenharia de Analytics.  

- O {ref}`intro_elt` introduz os conceitos de ETL e ELT para leitores menos familiarizados;  
- O {ref}`ingestao` discute teoria e prática da ingestão de dados no *Modern Data Stack*;  
- O {ref}`transformacao` apresenta as etapas de transformação, incluindo um exemplo completo com o **dbt**.  
<!-- TO-DO: Adicionar aqui o capítulo sobre modelagem com declarative pipelines como paralelo ao uso do dbt. -->

---

```{note}
Cada capítulo se conecta ao estudo de caso da **Northwind Traders**.  
Assim, você verá como aplicar os conceitos em um cenário prático, finalizando sempre com um **desafio** que reforça o aprendizado.
