# 2.4 Variedade

Projetos de dados começam nas fontes disponíveis — e elas dificilmente são homogêneas. Bancos transacionais, aplicações SaaS, planilhas, APIs, eventos de produtos digitais, catálogos públicos e dados comprados convivem com imagens, áudios, documentos e transcrições. Cada fonte traz seu próprio formato, metadados, limitações de acesso e frequência de atualização.

Do ponto de vista de arquitetura, podemos agrupar as fontes em quatro grandes blocos:

- **Relacionais** (PostgreSQL, MySQL, SQL Server): forte governança e esquemas explícitos.
- **Semiestruturadas** (JSON, Parquet, XML, logs de eventos): flexibilidade, porém com necessidade de padronização.
- **Não estruturadas** (áudio, vídeo, imagem, PDF): requerem etapas extras de preparação ou uso de serviços de IA para extração de sinal.
- **Streaming e APIs** (webhooks, Kafka topics, REST/GraphQL): dependem de contratos bem definidos para não quebrar consumidores.

Quanto mais fontes, maior o risco de divergências entre campos semelhantes e duplicação de conceitos de negócio. O Engenheiro de Analytics atua como mediador, traduzindo formatos para modelos consistentes e promovendo contratos de dados entre times produtores e consumidores.

Cerca de 80% dos dados nas empresas são não estruturados (vídeos, áudios, textos), mas, como mostra o comparativo da DB-Engines, os bancos relacionais, voltados a dados estruturados, seguem amplamente dominantes. Por quê?

```{figure} ../../../assets/img/db_engines.png
:name: analisar

Comparativo da DB-Engines. Fonte: [DB-engines](https://db-engines.com/en/ranking_categories)
```

O principal motivo é que eles oferecem dados prontos para gerar valor imediato, enquanto muitas organizações ainda não têm infraestrutura nem maturidade para lidar com dados não estruturados, que exigem mais esforço para separar “o joio do trigo”.
