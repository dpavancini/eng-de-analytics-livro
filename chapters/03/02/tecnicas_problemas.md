# 3.2 Técnicas para resolução de problemas

Pensamento analítico precisa de método. Técnicas estruturadas nos ajudam a sair do improviso, alinhar expectativas com o negócio e iterar com rapidez. Nesta seção revisitamos o ciclo PDCA — clássico da qualidade — e mostramos como adaptá-lo à rotina de equipes de dados. Ao final, você encontrará uma tabela com práticas modernas que combinam com o framework.

## Ciclo PDCA

O PDCA (Plan-Do-Check-Act) surgiu na década de 1920 com Walter A. Shewhart e ganhou o mundo pelas mãos de W. Edwards Deming. Embora tenha sido popularizado na indústria, continua muito relevante para analytics: cada etapa força o time a planejar, executar, medir e aprender antes de avançar para o próximo experimento.

```{figure} ../../../assets/img/03_02_ciclo_pdca.png
:name: ciclo_pdca
```

Vamos conectar o PDCA ao trabalho de um Engenheiro de Analytics.

### Planejamento (*Plan*)

1. Defina claramente o problema ou a hipótese. Ex.: “as conversões no funil de vendas caíram 15% na última semana”.
2. Escolha indicadores e fontes de dados que vão demonstrar a evolução do problema.
3. Estruture um plano de ação: stakeholders envolvidos, alçadas de decisão, riscos e critérios de sucesso.
4. Se possível, desenhe o *mockup* do dashboard, relatório ou experimento que deseja entregar.

### Execução (*Do*)

1. Construa ou ajuste os pipelines necessários (ingestão, transformação, modelagem).
2. Garanta qualidade mínima com testes automatizados e *data contracts* — ninguém quer tomar decisões com dados quebrados.
3. Publique protótipos para coletar feedback rápido e ajuste o escopo conforme necessário.

### Checagem (*Check*)

1. Compare o resultado com o que foi planejado: métricas bateram? hipóteses foram validadas?
2. Analise logs, painéis de observabilidade e alertas para entender desvios.
3. Colete feedback dos consumidores: o que funcionou? onde há ruído? quais novas perguntas surgiram?

### Ação (*Act*)

1. Documente aprendizados, tome decisões e defina o próximo ciclo.
2. Padronize o que deu certo (modelos dbt, macros reutilizáveis, dashboards canônicos).
3. Se algo falhou, ajuste processos, atualize contratos de dados ou refine o escopo com os parceiros de negócio.

### PDCA na prática

| Etapa | Perguntas-chave | Ferramentas e práticas |
| ----- | --------------- | ---------------------- |
| Plan  | Qual problema estamos resolvendo? Qual o impacto esperado? | Canvas de problema, briefings com stakeholders, métricas alvo |
| Do    | Como entregamos rápido e com qualidade? | dbt, notebooks colaborativos, feature branches, testes automatizados |
| Check | O resultado foi o esperado? | Monitoramento, experimentos, sessões de leitura de dashboard, *post-analysis* |
| Act   | O que padronizar ou ajustar? | Playbooks, documentação, retrospectivas, gestão do backlog |

O PDCA não elimina outras técnicas. Nas próximas seções veremos ferramentas específicas — Diagrama de Pareto e 5 Porquês — que ajudam a aprofundar a etapa de diagnóstico dentro do ciclo.
