# 3.3 Diagrama de Pareto

O Diagrama de Pareto — ou gráfico 80/20 — nos ajuda a priorizar esforços mostrando quais causas explicam a maior parte dos problemas. Em analytics, ele é útil para identificar quais fontes quebram mais os pipelines, quais dimensões geram a maior parte das reclamações ou quais etapas do funil concentram as perdas de receita.

O método traduz visualmente o Princípio de Pareto, formulado por Vilfredo Pareto no início do século XX: numa série de eventos, é comum que cerca de 80% do impacto venha de 20% das causas. O objetivo não é achar um número exato, mas identificar padrões concentrados que merecem foco.

```{figure} ../../../assets/img/03_03_pareto.png
:name: pareto

Diagrama de Pareto com causas ordenadas por impacto acumulado.
```

## Como construir o diagrama

1. **Defina o objetivo**  
   Qual problema queremos reduzir? Ex.: falhas de atualizações no data warehouse, tickets abertos pelo time comercial, cancelamentos de assinaturas.

2. **Colete e padronize os dados**  
   Agrupe registros por causa, sistema ou categoria. Use tabelas de incidentes, logs de observabilidade ou feedbacks qualificados. Em times modernos é comum extrair esses dados de ferramentas como Jira, Zendesk ou plataformas de monitoramento.

3. **Classifique as ocorrências**  
   Crie categorias mutuamente exclusivas. Se necessário, faça uma sessão rápida de *brainstorm* com stakeholders para validar a taxonomia.

4. **Calcule frequências e impacto**  
   Conte quantas vezes cada causa aparece e, se possível, associe um indicador de impacto (tempo perdido, custo, receita afetada). Ordene do maior para o menor.

5. **Desenhe o gráfico**  
   Utilize barras para as frequências e uma linha para o percentual acumulado. Ferramentas de BI (Looker, Power BI, Metabase) facilitam esse processo e permitem atualizar o gráfico automaticamente.

6. **Analise e priorize**  
   Observe onde a curva acumulada se estabiliza. Priorize as causas iniciais e desenhe planos de ação específicos para elas. Revise o gráfico periodicamente para verificar se as causas principais mudaram.

### Dicas e pontos importantes

- Antes de aplicar o **Gráfico de Pareto**, defina claramente **qual é o objetivo da análise** e envolva o time na escolha — uma reunião com brainstorming ajuda a alinhar prioridades e evitar decisões arbitrárias.  
- Leve **dados preliminares** sobre os principais problemas, sem se preocupar ainda com as causas — elas surgirão naturalmente no processo.  
- O propósito central do Pareto é **ordenar problemas e causas** para identificar **quais ações trarão maior benefício**, orientando o que deve ser **prioridade no planejamento**.  
- Use o gráfico para comunicar resultados: “resolvemos os dois principais motivos de falha, reduzindo 65% dos incidentes”.
- Reavalie as categorias conforme novos produtos são lançados ou novos tipos de erro aparecem.

O Diagrama de Pareto não substitui a investigação detalhada, mas oferece um mapa rápido de onde concentrar energia. Depois de identificar as causas principais, utilize técnicas como os 5 Porquês para descobrir a raiz do problema.
