# 15.2 Camadas e convenções de transformação

Independentemente da tecnologia, times de Analytics Engineering convergem para padrões parecidos ao organizar as transformações dentro do *data warehouse* ou do *lakehouse*. O [dbt recomenda](https://docs.getdbt.com/best-practices/how-we-structure/organizing-models) separar o código em camadas lógicas para tornar claro o contrato de cada tabela, o grau de confiança e a cadência de atualização. Esse desenho reduz decisões ad hoc e cria um caminho previsível de evolução do projeto.

## Camada de *staging*

- **Objetivo**: replicar fielmente as fontes, padronizando tipos e nomes de colunas.
- **Boas práticas**:
  - Uma view/tabela por fonte (ou tabela física).
  - Prefixos `stg_` e agrupamento por sistema fonte (`stg_erp__orders`, `stg_crm__deals`).
  - Tratar nulidades, normalizar *timezone*, remover colunas sensíveis quando necessário.
  - Não aplicar regras de negócio complexas aqui; a camada deve servir de “blocos uniformes de construção” para o restante do projeto.

## Camada intermediária (ou *intermediate*)

- **Objetivo**: combinar múltiplas fontes e preparar agregações/tabelas de suporte.
- **Boas práticas**:
  - Modelos `int_`que encapsulam *joins* mais custosos, cálculos compartilhados e chaves substitutas.
  - Separar responsabilidades (ex.: `int_orders__metrics`, `int_products__enriched`) para facilitar reuso entre fatos e dimensões.
  - Materializar como *views* ou tabelas incrementais dependendo do custo de recomputação.

## Camada de consumo  (*marts*)

- **Objetivo**: expor fatos e dimensões prontas para BI, APIs e *reverse ETL*.
- **Boas práticas**:
  - Seguir convenções de modelagem dimensional discutidas nos capítulos 8–11.
  - Nomear dimensões (`dim_`) e fatos (`fct_`) deixando claro o grão.
  - Definir materializações persistentes (tabela ou incremental) e políticas de atualização.

## Contratos e padrões auxiliares

- **Nomenclatura consistente**: nomes adequados por camada e prefixos/sufixos para tabelas e colunas (`_sk`, `_fk`, `_date`) aumentam a consistência do projeto.
- **Macros e pacotes**: centralizar lógicas repetitivas (por exemplo, normalização de datas ou mascaramento de PII) aumenta a qualidade global.
- **Documentação contínua**: descrever fontes, colunas e testes dentro dos arquivos `schema.yml` garante que o comando `dbt docs generate` reflita a arquitetura.
