(transformacao)=
# Capítulo 15 -  Transformação de dados

A etapa de transformação de dados é o núcleo do processo de ETL/ELT. É neste momento que as regras de negócio são aplicadas nos modelos para gerar as tabelas finais que serão consumidas por um BI, em um relatório ou mesmo por outro sistema. O tipo de processo e tecnologia usada na transformação vai depender do tipo de dados que queremos transformar, volume de dados, arquitetura de sistemas possível (por exemplo, nuvem vs *on-premises*), capacidade técnica da equipe, entre outros. 

## Processos de Transformação

O ideal é que as diversas transformações necessárias para limpar e processar os dados para o uso nas diversas ferramentas posteriores no pipeline (como relatórios, BI, modelos de IA etc.) sejam centralizadas nesta etapa para garantir uma visão única dos dados em toda a organização:

* Selecionar os campos relevantes de negócio
* Filtrar dados incorretos ou incompletos
* Desduplicar dados
* Separar colunas em mais colunas (ex. separar uma coluna com dados separados por “,”)
* Juntar dados de fontes de dados e/ou tabelas distintas
* Renomear colunas
* Criar novos campos e métricas calculadas
* Ordenar dados por um ou mais campos
* Remodelar os dados para um modelo de fatos e dimensões
* Criar novas chaves surrogate
* Transpor ou pivotar tabelas
