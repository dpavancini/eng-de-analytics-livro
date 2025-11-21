(etl)=
# 13.1 O Precursor: ETL

Antes do Modern Data Stack, a construção de pipelines seguia quase sempre a lógica ETL. Por décadas ela foi sinônimo de integração de dados por uma razão simples: os servidores de aplicação possuíam mais recursos que os bancos analíticos e, portanto, a transformação precisava acontecer “antes” de os dados chegarem ao DW.

ETL (*extract-transform-load*) é o processo sistemático de extrair, transformar e carregar dados brutos em um repositório pronto para consumo. Cada letra da sigla indica uma etapa — e, no modelo clássico, também a ordem de execução:

- **Extract**: recuperar dados brutos de uma ou mais fontes e salvá-los em um repositório intermediário.
- **Transform**: estruturar, padronizar e aplicar regras de negócio. Essa camada costumava ser escrita em scripts proprietários ou ferramentas visuais robustas.
- **Load**: apenas depois das transformações os dados eram carregados no data warehouse ou data mart.

```{figure} ../../../assets/img/13_01_etl_fluxo.png
:name: etl_fluxo

Exemplo de processo de ETL
```

Apesar da mudança trazida pelo ELT, o ETL continua relevante em cenários específicos:

- Restrições de compliance ou soberania que impedem levar dados sensíveis para o DW antes de mascará-los.
- Transformações que só existem na origem (jobs em mainframe, stored procedures críticas, APIs limitadas).
- Ambientes legados em migração, quando ainda não é possível reconstruir o pipeline inteiro de imediato.

Entender o ETL ajuda a contextualizar o passo seguinte. Com a popularização dos warehouses em nuvem e da computação elástica, tornou-se mais barato carregar primeiro e transformar depois, o que abre espaço para governança e versionamento superiores. Esse é o espírito do ELT que guia o restante do livro.
