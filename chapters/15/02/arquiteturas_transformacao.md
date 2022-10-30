# 15.2 Alternativas de Arquitetura de ETL/ELT

Os processos de transformação de dados são semelhantes não importa a arquitetura do *pipeline* de dados utilizado, seja ela uma arquitetura de ETL tradicional ou de um ELT moderno. No entanto, cada arquitetura vai impactar profundamento na estrutura de times, profissionais responsáveis e produtividade do processo de transformação como um todo. Em geral, há 3 grandes alternativas de arquitetura:

* Códigos personalizados: essa é a forma mais flexível de transformação de dados, onde a transformação é feita através de scripts escritos em Python, Java, Scala, etc. A principal ferramenta utilizada é o Spark, uma biblioteca escrita em Scala com APIs em diferentes linguagens. Embora flexível, ETLs em código puro demandam uma capacidade técnica alta da equipe que irá criar e manter os pipelines, configuração de orquestração de tarefas (“o que vem antes do quê”), log de erros entre outros.

* Ferramentas de ETL Visuais: são ferramentas de ETL que permitem criar blocos de transformação de dados de forma visual ou até “drag-and-drop”. A curva de aprendizado é geralmente menor em relação aos métodos baseado em código, porém no médio prazo as ferramentas visuais geralmente deixam a desejar em termos de boas práticas como versionamento, *debugging*, etc. A depender da ferramenta o custo de licenciamento também pode ser elevado.

* Data Warehouse/Data Lakehouse: a transformação dentro do próprio *data warehouse* é a chave do chamado modelo ELT. As vantagens dessa abordagem são a facilidade de utilizar uma linguagem padrão (SQL) e utilizar ferramentas específicas como dbt para cuidar das atividades auxiliares. Isso permite uma redução do tempo de entrega dos pipelines e uma necessidade técnica menor. Por outro lado, é limitado em dados estruturados (que podem ser armazenados em um banco de dados) e não é adequado para pipelines muito complexos.

No {ref}`MDS<MDS>`, vamos utilizar o próprio *Data Warehouse* como ambiente de transformação e utilizar ferramentas como o dbt para modelar os dados seguindo as melhores práticas de desenvolvimento. Essa decisão evita a necessidade dos Engenheiros de Analytics dominarem muitas linguagens de programação e frameworks de desenvolvimento distintos e foquem apenas na construção do data warehouse utilizando apenas o necessário para o framework do ELT. No equilíbrio entre desenvolvimento e conhecimento de negócio, nosso foco é o negócio.

```{admonition} Veja mais:
No vídeo abaixo são apresentados dois casos comuns de arquitetura de dados usando ETL tradicional e Moderno:<br><iframe width="560" height="315" src="https://www.youtube.com/embed/XLxoB83Tcd8?start=3516&end=4980" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

## ETL baseado em ferramentas visuais
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

## Abordagem Moderna

Na abordagem moderna as etapas de processamento de dados ficam dentro do Data Warehouse, de modo que o processo é invertido para **Extract-Load-Transform** (ELT). A principal é diferença em relação à abordagem tradicional é a criação de uma nova função, do [Engenheiro de Analytics](https://blog.indicium.tech/analytics-engineer-conheca-6-responsabilidades-dessa-nova-funcao/), responsável por transformar os dados dentro do Data Warehouse. Essa função resolve o distanciamento entre dados e negócio comum nos processos de ETL tradicionais.

```{figure} ../../../assets/img/elt.png
:name: elt_diagrama

ELT moderno.
```