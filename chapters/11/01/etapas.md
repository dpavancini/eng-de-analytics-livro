# 11.1 Etapas de Modelagem do DW

Em geral, o processo de modelagem de um Data Warehouse segue algumas etapas "padronizadas" ({numref}`processo_modelagem_dw`). A partir dos requisitos de negócio identificados previamente, realizamos um planejamento dos Data Marts que queremos construir (considerando também eventuais marts já disponíveis no DW). Em seguida, realizamos o planejamento das dimensões considerando sua **conformidade** entre diferentes *data marts*. Depois, é necessário realizar o mapeamento de chaves entre as diferentes fontes de dados e verificar a necessidade de aplicação de dimensões de alteração lenta (SCD). Com as tabelas Dimensão criadas, passamos nossa atenção para a Tabela Fato. Nessa etapa, nossa principal preocupação é realizar o mapeamento de chaves entre Fato e Dimensão para garantir a integridade dos dados e evitar duplicação.

```{figure} ../../../assets/img/11_01_processo_modelagem_dw.png
:name: processo_modelagem_dw
:height: 450px

Processo de Modelagem de DW
```

```{admonition} Atenção
É importante reforçar que, apesar de parecer um processo sequencial, o desenvolvimento de *data warehouses* modernos é realizado através de metodologias ágeis, de modo que as etapas aqui desenhadas são geralmente realizadas em "pequenos lotes". Realizar um planejamento inicial extenso de um *data warehouse* em geral não é recomendado! 
```

Etapas práticas (ciclo incremental)
- Escolha 1–2 Marts prioritários ancorados em perguntas de negócio e métricas‑alvo.
- Monte uma matriz Bus (Marts x Dimensões) e defina o grão das primeiras fatos.
- Modele dimensões conformadas e decida SCD por atributo.
- Mapeie chaves (BK→SK) e valide “as‑of join” para SCD2.
- Modele a fato no menor grão útil, com medidas atômicas e testes básicos.
- Entregue um corte vertical (dados → modelagem → BI) e colete feedback.

```{admonition} Dica
Trabalhe com artefatos leves e vivos: matriz Bus, dicionário de métricas e contratos de schema. No MDS, preferimos documentação junto ao código (ex.: YAML no dbt) para evoluir com o projeto.
```
