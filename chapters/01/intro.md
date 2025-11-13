# Capítulo 1 - Introdução

Este livro apresenta as técnicas e os conceitos necessários para que um profissional de dados moderno domine um processo de *analytics* de ponta a ponta.

Analytics Engineering é a aplicação de práticas de engenharia de software ao ciclo analítico. O Engenheiro de Analytics conecta o contexto de negócio à engenharia de dados, modelando e garantindo a confiabilidade de dados e métricas usados na decisão — com versionamento, testes, CI/CD, documentação e observabilidade como partes integrantes do trabalho.

Diferente do que tradicionalmente encontramos nas organizações, a visão aqui defendida é que esse profissional deve nascer nas áreas de **negócio** — e não apenas em **TI**. Se limitarmos o trabalho à visualização e à modelagem final, corremos o risco de construir estruturas complexas sobre bases frágeis. O resultado: pouco valor de negócio, frustração das equipes e alta rotatividade.  

Essa profissão combina **capacidade analítica**, conectada ao negócio, com **boas práticas de engenharia de software** aplicadas ao ciclo de dados. Isso inclui criar *pipelines* versionados, testados, monitorados e documentados — algo raro em equipes tradicionais de analytics.  

Para muitos leitores, termos como *pipeline de dados*, *infraestrutura de dados* ou *processo de analytics* podem soar distantes do dia a dia. Mas, na prática, estão diretamente relacionados à confiabilidade de relatórios, métricas e dashboards que sustentam decisões diárias.  

Uma boa analogia, inspirada no **DataOps**, é enxergar o processo de analytics como uma linha de montagem:  

- **Matéria-prima**: os dados brutos coletados nas fontes;  
- **Linha de montagem**: etapas e ferramentas que transformam os dados;  
- **Produto final**: relatórios, painéis, modelos e métricas confiáveis.  

Ao longo de todo o caminho, práticas de engenharia — como **testes automatizados**, **CI/CD**, **documentação**, **observabilidade** e **alertas** — garantem qualidade e confiança. Em geral, isso se organiza em camadas: ingestão (bronze), transformação/modelagem (silver e gold) e consumo/métricas (layer semântico).  

Esse é o espaço do **Engenheiro de Analytics**: o elo que conecta áreas, organiza processos e dá escala às equipes modernas de dados.  

---

Mas por que essa profissão é necessária em primeiro lugar? Afinal, **analistas, cientistas e engenheiros de dados** já não fazem exatamente isso?  
É o que discutiremos na próxima seção.

## Mapa da jornada

- Capítulos 1–3: Fundamentos de analytics e pensamento analítico — por que fazer, quem faz e como abordar problemas.
- Capítulo 4: Bancos de dados na prática — modelos, tipos e como pensar em performance.
- Capítulo 5: SQL aplicado — consultas, joins, agregações, janelas e composição de análises.
- Capítulo 6: Modern Data Stack — princípios e arquitetura de referência para equipes data‑driven.
- Capítulo 7: Boas práticas — Git, revisão, testes, CI/CD, ambientes e qualidade em projetos de dados.
- Capítulos 8–10: Modelagem — DW/lakehouse, modelo dimensional, fatos, dimensões e SCDs.
- Capítulo 11: Do plano ao modelo — desenhando marts, mapeando chaves e acelerando com IA.
- Capítulo 12: Mão na massa — preparando seu ambiente no Databricks e conectando o dbt.
- Capítulo 13: ELT moderno — visão ponta a ponta para evoluir com segurança.
- Capítulos 14–15: Ingestão e transformação — conectando fontes com boas práticas e modelando com dbt.

```{note}
Prévia prática: ao longo do livro, veremos como essa visão se materializa com dbt (transformações, testes, documentação e linhagem) e Databricks (Delta, SQL Warehouse, Unity Catalog e Workflows). Este capítulo, porém, permanece conceitual e independente de ferramentas.
```
