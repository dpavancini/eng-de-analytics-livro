# 4.5 Modelagem de Banco de Dados

Na seção anterior mostramos como bancos de dados são estruturados para representar entidades (clientes, produtos, pedidos,etc). Entender como fazer essa representação, quais entidades devem ser modeladas, quais atributos, chaves etc. são parte da Arquitetura de um Banco de Dados. A criação dessa arquitetura é chamada de Modelagem de Dados.  Nesta seção apresentamos uma breve introdução de diferentes níveis de modelagem de dados que podem ser úteis para um engenheiro de analytics entender onde e como estão armazenados os dados que queremos analisar.  No capítulo 6, apresentamos como utilizar esses conceitos para modelar um Data Warehouse analítico, que é parte das atribuições do analytics engineer moderno.
Segundo a definição mais recente disponível na Wikipedia, Os modelos de dados são ferramentas que permitem demonstrar como serão construídas as estruturas de dados que darão suporte aos processos de negócio, como esses dados estão organizados e quais os relacionamentos que pretendemos estabelecer entre eles.

A forma dominante de visualização de bancos de dados é através dos modelos entidade-relacionamento (ER). No modelo ER, o processo de negócio é modelado como entidades que são ligadas entre si através de relacionamentos. Cada entidade pode ter vários atributos que a caracteriza, assim como os relacionamentos são geralmente definidos por sua cardinalidade (um para um, um para muitos, muitos para muitos). Os modelos ER são geralmente apresentados através de diagramas com diferentes níveis de complexidade.

A figura 4.1 abaixo apresenta um exemplo de um diagrama entidade-relacionamento. As entidades são representadas como caixas e os relacionamentos com as linhas que conectam as caixas entre si. A cardinalidade é representada pelo chamado “pé-de-galinha” (do inglês, crow feet) presente em cada linha. A figura 4.6 detalha como a representação da entidade e seus atributos e os tipos de relacionamentos mais comuns encontrados nesses diagramas. 

Se você tiver background em negócios e não em desenvolvimento de bancos de dados, os modelos ER podem parecer muito distantes dos modelos de dados que são utilizados em planilhas eletrônicas para a criação dos relatórios e análises do dia-a-dia das empresas. E não é à toa; os bancos de dados criados a partir  de modelos ER têm geralmente função operacional e  não são otimizados para a análise de dados. O uso da técnica de normalização para evitar redundância dificulta ainda mais o trabalho do analista, fazendo com que não raramente um modelo ER tenha centenas de tabelas e relações e deixando mesmo consultas simples muito complicadas para quem não é especialista em bancos de dados.

```{figure} ../../../assets/img/erd1.png
:name: erd1

Exemplo de um diagrama de Entidade-Relacionamento (ERD)
```

```{figure} ../../../assets/img/erd_2.png
:name: erd2

Exemplo de um diagrama de Entidade-Relacionamento (ERD)
```
