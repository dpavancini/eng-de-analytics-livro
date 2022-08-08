## Volume

Dados são gerados a todo momento em empresas, governos ou qualquer tipo de sistema. Na sua forma bruta, dados incluem qualquer tipo de informação ou fato que pode ser armazenado por um computador, como imagens, textos, áudios, tabelas, vídeos, cliques em um website e muito mais.

O maior volume de dados gerados estão na forma de dados não estruturados, como vídeos, áudios, textos etc. Até recentemente, a maior parte desses dados não era coletada e acabava sendo perdida devido ao alto custo de capturar e armazenar a informação. 

No entanto, nos últimos 10 anos, os avanços na tecnologia de armazenagem fizeram com que praticamente todos os dados gerados pudessem ser armazenados a um custo desprezível, ampliando em muitas ordens de magnitude o volume de informação armazenada pelo homem.

Embora em menor volume, dados estruturados, como tabelas, planilhas, relatórios etc., são responsáveis pela maior parte das informações utilizadas na tomada de decisão nas organizações, e está armazenada em sistemas de gerenciamento de bancos de dados (SGBD, ou DBMS na sigla em inglês), ou simplesmente, bancos de dados. Por isso, um analista de BI moderno deve dominar os principais conceitos sobre como dados são estruturados, transformados e consultados dentro desses sistemas. 

### Estrutura dos dados

Dados podem estar armazenados de diferentes formas em um sistema computacional. É comum diferenciar a forma como eles estão estruturados em:

* **dados estruturados:** tipos bem definidos e consistentes. 
Ex: dados numéricos, categóricos etc. armazenados em um banco de dados.

* **dados semiestruturados:** geralmente armazenados em formato chave-valor sem um esquema e tipo definidos.  
Ex: JSON, XML etc.

* **dados não estruturados:** todo o resto.
Ex.: imagens, áudios, e-mails, dados de sensores, textos sem tipo definido etc.

### Classificação de volume de dados
À medida que aumenta o volume de dados processado e armazenado por um banco de dados, diferentes desafios técnicos e tecnologias são necessárias. 

Embora não exista uma classificação precisa quanto ao volume de dados, nós podemos sugerir uma classificação conforme abaixo:

* **small data (kb  - 100s Mb)**: cabem em arquivos, planilhas etc. e são consultados em memória.
* **medium data (100s Mb - 100s Gb)**: armazenados em bancos de dados tradicionais, podem ter algumas dezenas de Gigabytes, mas ainda podem ser consultados em memória na maioria dos casos. 
* **big data (>100s Gb):** estruturados ou não estruturados, precisam ser armazenados em grandes servidores, geralmente na nuvem.

### Métodos de armazenamento de dados

Conforme o volume de dados que precisamos armazenar, diferentes métodos de armazenamento e ferramentas podem ser necessários.  Tradicionalmente, quando as planilhas começavam a ficar grandes demais ou complexas demais para as necessidades analíticas, empresas migravam para um *data warehouse*. 

Mais recentemente,  os *data lakes* ganharam lugar de destaque no mundo dos dados, gerando certa confusão sobre qual tecnologia é melhor ou mais adequada. Na prática, *data lakes* e *data warehouses* possuem objetivos distintos dentro do ambiente de análise de dados e acabam se complementando quando implementados corretamente.

**Mas afinal, o que são data lakes e data warehouses? **

Pode-se dizer que o data warehouse (DW) é o armazém dos dados. Um local seguro que armazena e integra dados estruturados em um só lugar. Portanto, um *data warehouse* é um grande banco de dados otimizado e desenhado para consultas analíticas.


Figura XX: O Armazém de dados - DW. Fonte: elaborada pelo autor.

Dados de fontes e formatos diferentes não se integram naturalmente. A grande vantagem de um *data warehouse* é justamente a consolidação de dados de diversas fontes de informação - sistemas operacionais, planilhas e CRMs - em um local centralizado.

Você pode imaginar um data lake como um lago de dados que contém informações de diversos tipos e tamanhos diferentes. Ao contrário de um data warehouse, que armazena apenas dados estruturados, o data lake permite o armazenamento de todos os tipos de dados - estruturados, não estruturados e híbridos - em um só lugar. Portanto, é um repositório muito mais amplo que possibilita análises adicionais e menos restritivas que um DW, como pesquisas de texto completo, análises de big data em tempo real, machine learning etc.



Imagem 7: Data Lakes. Fonte: elaborada pelo autor.


Embora seja possível consultar dados diretamente de um data lake, seu objetivo não é servir como uma camada final de consulta por uma ferramenta de BI, por exemplo, mas sim como uma camada intermediária que permite outras aplicações de análise de dados. 
Em alguns casos, o data lake pode ainda ser uma camada intermediária entre os dados brutos e um data warehouse, permitindo o “melhor dos dois mundos” em termos de armazenamento e integração de dados. No entanto, é sempre bom lembrar que o gerenciamento de data lakes e data warehouse é uma tarefa complexa mesmo quando utilizamos serviços gerenciados na nuvem, como o Amazon S3 ou Amazon Redshift.  Na hora de desenhar a arquitetura de dados, é importante levar em conta o valor que eles irão gerar à empresa em relação aos custos de manter uma infraestrutura mais complexa. Em geral, empresas que seguem uma evolução gradual de sua infraestrutura tendem a ter resultados melhores do que tentativas de pular etapas ao criar infraestruturas muito complexas sem ainda ter a maturidade analítica necessária para extrair todo o valor dessas ferramentas.
