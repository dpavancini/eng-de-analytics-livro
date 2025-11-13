# 6.1 Construindo o Modern Data Stack

Uma pilha moderna de dados combina serviços especializados para executar três funções essenciais: coletar e integrar dados, transformá-los em modelos analíticos e disponibilizá-los de forma segura e performática para consumo. Essas funções se materializam em um pipeline reprodutível, testável e versionado.

Ainda que a implementação varie de empresa para empresa, os princípios por trás do MDS são comuns e ajudam a evitar armadilhas de arquitetura e decisões de curto prazo.

## Os 7 princípios do MDS

Novas ferramentas e aplicações de ponta em analytics surgem a todo momento. Por isso, antes de implementar essa abordagem, é crucial entender os princípios que a orientam.

Pensando nisso, vamos falar sobre os 7 princípios que toda abordagem moderna de analytics precisa ter.

### 1. Cloud-native

A base do MDS é cloud-native: elasticidade, serviços gerenciados e pagamento por uso. Escalar para cima ou para baixo deixa de ser projeto de infraestrutura e vira configuração. Boas práticas de FinOps (custos visíveis e controlados) e segurança por padrão (IAM, redes, criptografia) são parte do desenho.

### 2. Modularidade

Separar responsabilidades reduz acoplamento. No MDS, praticamos ELT(Extract-Load-Transform): conectores trazem dados de fontes diversas (frequentemente via CDC), carregam no warehouse/lakehouse e a transformação ocorre como código, próxima do motor analítico. Isso permite trocar ferramentas por etapa sem reescrever todo o pipeline.

### 3. Simplicidade

Prefira padrões abertos e poucas linguagens. Transformação como SQL (e Python quando necessário), organizada em modelos e testes, vence soluções proprietárias e fluxos visuais difíceis de versionar. Menos variantes significa menos treinamento, menos manutenção e mais colaboração.

### 4. Governança

Governança é transversal: controle de acesso por papéis, documentação e linhagem, classificação de dados sensíveis e políticas de retenção/mascaramento. Data contracts entre produtores e consumidores tornam expectativas explícitas (schemas, SLAs, semântica), reduzindo quebras e retrabalho.

### 5. Versionamento

Trate analytics como código: modelos SQL, macros, seeds, testes, documentação e configurações vivem em Git. Branches, PRs e CI/CD trazem rastreabilidade, revisão e implantação controlada. Versione também contratos e camadas semânticas/métricas.

### 6. Separação de ambientes

Ambientes isolados (dev, staging/qa, prod) evitam “testes em produção”. Promova mudanças via pipeline, com dados amostrados/mascarados fora de prod e papéis bem definidos de leitura/escrita. Separe data brutos e finais e catálogos/esquemas por ambiente e domínio.

### 7. Testes

Qualidade é contínua: teste dados e modelos (not_null, unique, relationships, regras de negócio), verifique freshness e volumetria, e monitore anomalias. Defina SLOs/SLAs e alerte quebras rapidamente. Trate regressões como parte natural do ciclo.

```{admonition} IA como copiloto
LLMs aceleram rascunhos de arquitetura, geram checklists de governança, propõem testes iniciais e explicam diffs. Use-os para ganhar velocidade, sem abrir mão de revisão humana e validações automatizadas.
```

Com os princípios em mãos, vamos ver como eles se desdobram em uma arquitetura de referência e como escolher componentes de acordo com o seu contexto.
