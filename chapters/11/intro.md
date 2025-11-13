(modelagem_dw)=
# Capítulo 11 -  Modelando um Data Warehouse

Agora que você conhece os principais conceitos de um Data Warehouse (Cap. 8–10), é hora de colocá‑los em prática para desenhar um modelo que responda perguntas reais do negócio. Modelar um DW é tanto ciência quanto arte: exige método, mas também escolhas pragmáticas sobre grão, chaves, histórico, performance e evolução.

O que você vai fazer neste capítulo
- Planejar Data Marts com foco incremental (arquitetura Bus e matriz de Marts x Dimensões).
- Definir dimensões conformadas e seu histórico (SCDs) no contexto do projeto.
- Mapear chaves com segurança entre fontes normalizadas e o esquema estrela.
- Modelar tabelas fato no grão correto e com medidas consistentes.
- Identificar quando criar tabelas agregadas/derivadas para acelerar consumo.
- Usar IA como copiloto para acelerar descoberta e revisão, mantendo validação humana.

Ao longo das seções, conectamos as decisões de modelagem ao que você viu em {ref}`fatos` e {ref}`dimensoes`, e sugerimos padrões práticos para implementação em MDS (ex.: camadas staging/intermediate/marts, dbt, testes e documentação).
