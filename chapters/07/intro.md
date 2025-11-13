(boas_praticas)=
# Capítulo 7 - Boas práticas de desenvolvimento

Depois de conhecer o Modern Data Stack (Cap. 6) e praticar SQL (Cap. 5), vamos dar o próximo passo: como escrever, versionar, revisar, testar e entregar esse código com qualidade, segurança e previsibilidade — exatamente como times de software fazem há anos com DevOps e práticas ágeis.

Em muitos times de dados, ainda é comum editar pipelines “ao vivo”, salvar versões em planilhas e depender de ferramentas visuais difíceis de versionar. A Engenharia de Analytics muda esse cenário ao tratar “analytics como código”: tudo rastreável em Git, testável, revisável e implantável via CI/CD.

## Contexto: DevOps e o “gap” em dados

Enquanto o desenvolvimento de software evoluiu com Git, integração/entrega contínua e infraestrutura como código, a realidade de dados em muitas empresas ficou para trás. O acesso e a evolução de pipelines costumam depender de chamados, aprovações manuais e alterações diretas em produção, frequentemente usando ferramentas de ETL “arrasta‑e‑solta”. Esse modelo dificulta versionamento, revisão, testes automatizados e reprodutibilidade.

Um efeito colateral comum dessas plataformas é o chamado “[inner‑platform effect](https://en.wikipedia.org/wiki/Inner-platform_effect)”: ao tentar simplificar o desenvolvimento, acabam recriando funcionalidades que o próprio SO, o banco ou o ecossistema já oferecem de forma mais eficiente e padronizada — mas com menos transparência e controle para quem mantém.

Como proposto pelo DataOps, levar práticas de DevOps para dados — versionar tudo, automatizar validações, separar ambientes, revisar mudanças por PR — é o caminho natural para ganhar velocidade e qualidade sem abrir mão de governança.

### O que dá errado sem boas práticas
- Falta de rastreabilidade: múltiplas “verdades” (regras divergentes em planilhas/notebooks) e dificuldade de auditar quem mudou o quê e quando.
- Deploys manuais em produção: indisponibilidade, dados corrompidos e rollback difícil.
- Ambientes misturados: desenvolvimento usando dados de produção sem mascaramento ou segregação de papéis.
- Ausência de testes/monitoramento: incidentes silenciosos, métricas inconsistentes, quebras não detectadas.
- Acoplamento e dívida técnica: pipelines frágeis, difíceis de evoluir e caros de manter.

O que você vai aprender
- Boas práticas de programação aplicadas a analytics: legibilidade, DRY, KISS, portabilidade, configuração, logs e tratamento de erros.
- Boas práticas de desenvolvimento: debugging, revisão de código, separação de ambientes, versionamento semântico, automações e CI/CD.
- Git: por que usar, como funciona e como aplicar no dia a dia do projeto.
- Git na prática: comandos essenciais para colaborar em equipe.

```{admonition} IA como copiloto
LLMs ajudam a escrever mensagens de commit claras, sugerir testes, revisar diffs e padronizar estilo. Úteis para acelerar tarefas repetitivas, mas valide a lógica, segurança e impacto em dados antes de aprovar.
```

Ao final deste capítulo, você terá uma rotina de desenvolvimento mais previsível e colaborativa, com bases para incorporar testes de dados, automações, code review e qualidade contínua nos seus projetos de analytics.
