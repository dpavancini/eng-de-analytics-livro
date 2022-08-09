# 4.7 O modelo dimensional e o esquema estrela

Diferentemente do modelo ER, que tinha como objetivo facilitar a criação de bancos de dados com pouca redundância e otimizados para o desenvolvimento de sistemas transacionais, o esquema estrela nasceu da necessidade de se criar estruturas de dados para análise que superavam a capacidade das planilhas eletrônicas. Por tal motivo, esses modelos possuem diversas características que se assemelham às planilhas usadas pelos analistas de negócio, mas utilizando a capacidade de processar grandes volumes de dados típica dos bancos de dados.

A base dos esquemas estrela é o chamado modelo dimensional, que define os processos de negócios em fatos (medidas) e dimensões (descrições) que podem ser usadas para filtrar, agrupar e agregar os fatos. Os atributos (colunas) das tabelas fato e tabelas dimensão são nomeados com foco nos usuários a partir de nomenclaturas padronizadas e de fácil entendimento. Cada esquema estrela representa um único processo de negócio (por exemplo, vendas) e é criado de modo que as dimensões estejam apenas “uma relação” de distância dos fatos. Além disso, as tabelas do modelo dimensional são por padrão de-normalizadas, facilitando o entendimento pelos analistas acostumados com planilhas.

O exemplo da {numref}`Figura %s <esquema_estrela_er>` mostra um esquema estrela para o processo de vendas. O entendimento é muito mais fácil que no modelo ER, com nomes de tabelas e atributos auto-explicativos. Também só há uma relação entre a tabela fato de vendas e as diferentes tabelas de dimensão, evitando erros e dupla contagem. Além disso, medidas que no banco transacional estariam em uma ou mesmo várias tabelas distintas já foram reunidas na mesma tabela, como o subtotal e custo de cada pedido. Com um pouco de imaginação, não é difícil entender o modelo dimensional como uma espécie de pasta de trabalho do Excel e cada tabela sendo uma planilha distinta ligada por alguma função de consulta como o `PROCV()` ou `ÍNDICE(CORRESP()`).

```{figure} ../../../assets/img/esquema_estrela_er.png
:name: esquema_estrela_er

O esquema estrela para o processo de vendas.
```

Na Parte 2 vamos aprender como criar os bancos de dados analíticos, ou *data warehouses*. Embora existam diferentes abordagens e arquiteturas na criação desses bancos, todas fazem uso dos esquemas estrela e dos modelos dimensionais para criar os modelos de dados otimizados para analytics.