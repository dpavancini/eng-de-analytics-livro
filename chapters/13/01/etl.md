(etl)=
# 13.1 O Precursor: ETL

Durante muito tempo (e ainda utilizado em muitas empresas atuais), o processo padrão de construção de *pipelines* de dados era o ETL. ETL (do inglês, *extract-transform-load*) é o processo sistemático de extrair, transformar, limpar e carregar os dados brutos em um banco de dados ou outro local para visualização ou consumo por outra aplicação. Cada letra da sigla significa uma de suas etapas:

- *Extract*: recuperar dados brutos de uma ou mais fontes e salvá-los em um repositório de dados único. 
- *Transform*: estruturar, enriquecer, limpar e converter dados brutos para um modelo de dados final.
- *Load*: carregar os dados transformados para um data warehouse ou repositório de dados para utilização em uma ferramenta de BI.

```{figure} ../../../assets/img/etl_fluxo.png
:name: etl_fluxo

Exemplo de processo de ETL
```

A sigla ETL não apenas lista as etapas, mas também representa a ordem tradicional. Com o Modern Data Stack, ficou viável outra abordagem: ELT. Primeiro carregamos dados brutos para o DW/lakehouse e só então transformamos, aproveitando poder de processamento, armazenamento colunar e execução paralela próximos ao dado.

Quando ETL ainda faz sentido?
- Restrições de compliance que impedem levar dados brutos ao DW (ex.: dados altamente sensíveis sem mascaramento).
- Transformações específicas que só existem na fonte (APIs com filtros/expansões limitadas, jobs mainframe, etc.).
- Pipelines legados em migração, onde a troca total não é imediata.

No restante do livro, usaremos ELT para designar o processo moderno de ponta a ponta, enfatizando as práticas de engenharia que o tornam previsível e sustentável.
