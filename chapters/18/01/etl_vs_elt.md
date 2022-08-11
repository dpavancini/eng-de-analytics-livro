(etl_elt)=
# ETL vs ETL

O objetivo deste artigo é apresentar as principais diferenças entre o processo tradicional de construção de *pipelines* de dados, também chamado de ETL, e o processo moderno utilizado no [MAS](https://medium.com/indiciumtech/modern-analytics-stack-uma-abordagem-moderna-de-analytics-8e556af41fe8).

# Objetivos do ETL

ETL (do inglês,* extract-transform-load*) é o processo sistemático de extrair, transformar, limpar e carregar os dados brutos em um banco de dados ou outro local para visualização ou consumo por outra aplicação. Cada letra da sigla significa uma de suas etapas:

- **Extract**: recuperar dados brutos de uma ou mais fontes e salvá-los em um repositório de dados único
- **Transform**: estruturar, enriquecer, limpar e converter dados brutos para um modelo de dados final.
- **Load**: carregar os dados transformados para um data warehouse ou repositório de dados para utilização em uma ferramenta de BI.

A sigla ETL não apenas lista suas as etapas, mas também representa a ordem em que tradicionalmente essas etapas são realizadas em um projeto. Na [Abordagem Moderna de Analytics](https://medium.com/indiciumtech/modern-analytics-stack-uma-abordagem-moderna-de-analytics-8e556af41fe8)., no entanto, uma outra abordagem é proposta chamada de ELT, em que primeiro os dados brutos são carregados para um Data Warehouse e depois transformados dentro do próprio DW

Podemos dividir o planejamento do ETL em algumas tarefas, que podem ou não ser feitas em sequência. É comum que em um modelo ágil cada uma delas seja necessária diversas vezes ao longo dos sprints:

- **Mapear dados para extração**: quais fontes de dados e tabelas/datasets são necessários para essa etapa do projeto. É geralmente recomendável iniciar apenas com os dados necessários e ir evoluindo ao longo do projeto.
- **Definir tipo de processamento necessário**: qual o tipo de processamento necessário em produção. Nesta etapa precisamos prever se os dados poderão ser atualizados em lotes diários, horários ou mesmo em tempo real. O tipo de processamento pode limitar a tecnologia que utilizaremos para o ETL.
- **Analisar o volume de dados:** qual o volume de dados armazenado e qual a velocidade de crescimento desses dados. Diferentes volumes de dados podem significar outros desafios de tecnologia e de ferramentas possíveis.
- **Verificar política de segurança e dados sensíveis:** quando o projeto envolve dados sensíveis é necessário cuidados adicionais em termos de acesso e processamento. Exemplos são dados pessoais (PII), dados bancários, segredos industriais, entre outros.
- **Definir tipo de infra-estrutura**: a infra-estrutura do ETL será na nuvem, on-premises ou híbrida.
- **Mapear formas de consumo dos dados:** mapear como os dados serão consumidos na ponta, como relatórios, ferramentas de BI, APIs, etc. A depender de limitações e rigidez nas ferramentas de consumo, é possível que as opções de ferramentas e DW sejam limitadas.

# Abordagem Tradicional

Tradicionalmente, a etapa mais importante e demorada de projetos de dados é o chamado ETL (do inglês, extract-transform-load). Abaixo apresentamos as duas arquiteturas de ETL tradicional mais comuns

```{admonition} 
No vídeo abaixo são apresentados dois casos comuns de arquitetura de dados usando ETL tradicional e Moderno:<br><iframe width="560" height="315" src="https://www.youtube.com/embed/XLxoB83Tcd8?start=3516&end=4980" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```


## ETL baseado em ferramentas
O diagrama abaixo apresenta uma arquitetura comum em projetos de dados liderados pela área de BI. Nestes projetos as três etapas do ETL são geralmente realizadas dentro de uma ferramenta monolítica como Pentaho ou Informática.

```{figure} ../../../assets/img/etl_ferramenta.png
:name: etl_ferramenta

ETL baseado em ferramentas.
```

As principais desvantagens dessa abordagem são:

- **Lock-in**: toda a lógica do pipeline de dados fica presa dentro da ferramenta. Qualquer mudança de ferramenta envolve um grande retrabalho.

- **Escalabilidade**: essas ferramentas em geral possuem dificuldade de escalar para grandes volumes de dados ou necessitam grandes investimentos para isso.

- **Flexibilidade**: por serem ferramentas visuais, suas capacidades são limitadas pelas funcionalidades disponíveis e reduzem a flexibilidade dos projetos.

- **Governança**: em geral é complicado garantir governança nessas ferramentas, de modo que acabam sendo limitadas a um único desenvolvedor, tornando o processo dependente de uma pessoa e não algo estruturado da empresa.


## ETL baseado em código

O diagrama abaixo apresenta uma arquitetura comum em projetos de dados complexos liderados pela área de TI. As três etapas do ETL são atribuídas às equipes de Data Engineering ou outras áreas técnicas da empresa, enquanto os analistas de negócios e cientistas de dados ficam limitados ao consumo desses dados na ponta.

```{figure} ../../../assets/img/etl_codigo.png
:name: etl_codigo

ETL baseado em código.
```

As principais desvantagens dessa abordagem são:

- **Dívida técnica**: necessidade de equipes que entendem dos códigos e transformações especializadas e customizados para cada projeto.

- **Distância dos analistas**: como são projetos complexos e liderados por times técnicos, há uma grande distância do time de negócio que é "dono" dos dados. Isso gera conflito entre os times, atraso nos projetos e dificuldade de geração de valor.

# Abordagem Moderna

Na abordagem moderna as etapas de processamento de dados ficam dentro do Data Warehouse, de modo que o processo é invertido para **Extract-Load-Transform** (ELT). A principal é diferença em relação à abordagem tradicional é a criação de uma nova função, do [Engenheiro de Analytics](https://blog.indicium.tech/analytics-engineer-conheca-6-responsabilidades-dessa-nova-funcao/), responsável por transformar os dados dentro do Data Warehouse. Essa função resolve o distanciamento entre dados e negócio comum nos processos de ETL tradicionais.

```{figure} ../../../assets/img/elt.png
:name: elt

ELT moderno.
```