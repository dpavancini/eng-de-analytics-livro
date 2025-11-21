# 15.1 Os Processos de Transformação

A transformação é o elo entre os dados brutos ingeridos e o consumo analítico. Ela une regras de negócio, modelagem dimensional e governança. Ao organizar bem essa etapa, ganhamos confiabilidade, reutilização e velocidade para incorporar novas fontes.

## Objetivos essenciais

1. **Correção e padronização** – limpar valores inválidos, normalizar unidades e aplicar *data quality* básico (trims, lower/upper, tipos corretos).
2. **Enriquecimento** – unir múltiplas fontes, derivar atributos calculados, aplicar classificações do negócio e criar dimensões auxiliares.
3. **Modelagem para consumo** – estruturar dados em *star schema*, fato/dimensão, *wide tables* e camadas semânticas conforme os indicadores demandados.
4. **Performance e custo** – escolher materializações (view, tabela, incremental) e particionamentos adequados para cada camada.
5. **Governança e rastreabilidade** – documentar colunas, testes e linhagem para que outros times confiem na saída.

Esses objetivos se traduzem em um conjunto recorrente de operações:

- Selecionar e renomear colunas relevantes.
- Padronizar tipos, moedas e *timezones*.
- Filtrar registros inválidos ou incompletos.
- Deduplicar chaves naturais.
- Explodir ou agrupar estruturas (*arrays*, JSON, colunas compostas).
- Unir dados de sistemas diferentes (*joins* e *unions*).
- Criar métricas e atributos derivados.
- Recalcular chaves substitutas (*surrogate keys*).
- Pivotar ou transpor dados quando necessário.

Embora a lista pareça simples, o diferencial está em **aplicar um desenho consistente** para todo o pipeline. Nas próximas seções conectamos esse desenho às camadas de transformação, às convenções de contratos e, por fim, ao blueprint dimensional da Northwind que será implementado com dbt (Cap. 16) e Lakeflow Declarative Pipelines (Cap. 17).
