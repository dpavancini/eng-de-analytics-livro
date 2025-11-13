# 1.3 As responsabilidades do Engenheiro de Analytics

No capítulo anterior vimos como a fragmentação das equipes tradicionais e a evolução tecnológica abriram espaço para o surgimento do **Engenheiro de Analytics**. Mas afinal, o que esse profissional faz no dia a dia?  

---

## Uma analogia para simplificar

Uma boa analogia, proposta por Sara Barles (Hubspot), ajuda a visualizar as diferenças entre os papéis:  

```{epigraph}
Os engenheiros de dados constroem o armário — eles reúnem a madeira e as ferramentas necessárias para montá-lo.  
Os engenheiros de analytics, por outro lado, abrem o armário e começam a colocar os pratos, canecas e tigelas em uma ordem lógica (por cor, tamanho, formato).  
Assim, os analistas de dados podem abrir o armário e encontrar exatamente o que precisam, como a pequena caneca azul, e usá-la de imediato.  

-- Sara Barles
```

---

## Principais responsabilidades

Para dar clareza de escopo, organize as responsabilidades em três grupos:

- Own (lidera e é responsável direto):  
  - **Transformação de dados (ELT)** e orquestração declarativa de pipelines;  
  - **Modelagem dimensional** e camadas (staging → intermediate → marts);  
  - **Qualidade e confiabilidade**: testes de esquema/dados, validações, documentação e linhagem;  
  - **CI/CD de dados**: revisão por pares, automações de build/test, promoção entre ambientes.  
- Collaborate (constrói em conjunto com outras áreas):  
  - **Definição de métricas (layer semântico)** com times de negócio/produto;  
  - **Data contracts** com times produtores de dados;  
  - **Governança** (catálogo, acessos, privacidade) com dados/segurança.  
- Influence (atua como consultor e multiplicador):  
  - **Apoio estratégico** a discussões *data‑driven* e priorização de demandas;  
  - **Visualizações e relatórios** quando necessário para fechar o ciclo decisão‑dados.  

Nota: testes, documentação e CI não são “acabamentos”; são entregáveis de primeira classe do Engenheiro de Analytics.

---

## Além do básico: tendências recentes

Nos últimos anos, as responsabilidades do Engenheiro de Analytics evoluíram, acompanhando a maturidade das equipes de dados. Além das tarefas já citadas, hoje se espera também:  

- **Observabilidade de dados**: monitoramento, alertas e SLOs para garantir confiabilidade;  
- **Data contracts**: acordos claros entre produtores e consumidores de dados;  
- **CI/CD e testes automatizados** aplicados ao ciclo de dados;  
- **Documentação e governança** como parte natural do processo;  
- **Métricas compartilhadas (semantic layer)**: garantir que toda a organização fale a mesma língua.  
- **Preparação de dados para IA**: curar *datasets* de treinamento, remover vieses e garantir privacidade;  
- **Monitoramento de produtos de IA**: instrumentar métricas de qualidade, avaliações humanas e *guardrails* para modelos em produção.  

---

Neste livro, vamos apresentar técnicas e processos para construir uma infraestrutura de dados moderna e escalável que atenda às necessidades de negócio. Nos capítulos seguintes, exploraremos exemplos práticos, sempre conectados ao estudo de caso da Northwind, para aplicar essas responsabilidades em cenários reais.  
