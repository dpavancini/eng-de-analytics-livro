# 4.7 O modelo dimensional e o esquema estrela

Quando falamos em dados analíticos, queremos simplicidade para ler, cruzar e agregar informações. O modelo dimensional — popularizado por Ralph Kimball — surgiu justamente para traduzir processos de negócio complexos em estruturas intuitivas chamadas **esquemas estrela**.

## Fatos e dimensões

Um esquema estrela organiza:

- **Tabelas fato**: armazenam medições numéricas de um processo (vendas, visitas, entregas). Cada linha representa um evento em determinado nível de granularidade.
- **Tabelas dimensão**: trazem contexto descritivo (produto, cliente, data, canal). Elas permitem filtrar, fatiar e agrupar os fatos.

As dimensões estão sempre a uma única relação de distância da tabela fato, evitando cadeias longas de *joins* e reduzindo o risco de duplicar registros.

```{figure} ../../../assets/img/esquema_estrela_er.png
:name: esquema_estrela_er

Exemplo de esquema estrela para o processo de vendas.
```

Observe como as dimensões têm nomes autoexplicativos e colunas orientadas ao negócio. É quase como trabalhar com várias abas de uma planilha conectadas entre si por chaves, mas com a escala e governança de um warehouse.

Na seção **Modelando Dados** vamos aprender como criar os bancos de dados analíticos, ou *data warehouses*. Embora existam diferentes abordagens e arquiteturas na criação desses bancos, todas fazem uso dos esquemas estrela e dos modelos dimensionais para criar os modelos de dados otimizados para analytics.