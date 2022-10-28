# 11.2 Planejando os Data Marts

> “Conquistando o mundo, um Mart por vez”

Talvez um dos maiores erros na implementação de um projeto de BI/DW é tentar uma abordagem “big-bang”, onde todo o projeto é entregue de uma só vez. Mesmo que os recursos e equipes para isso estejam disponíveis, o ideal é sempre buscar uma abordagem incremental através da modelagem de uma área de negócio da empresa (Data Marts) por vez. Enquanto cada Mart possui seus fatos específicos, as tabelas dimensão são compartilhadas entre si para garantir a integridade e conformidade do DW. Essa abordagem utilizando dimensões conformadas é típica da chamada arquitetura Bus, devido à sua semelhança com a organização de um ônibus na apresentação original de Ralph Kimball.

Não custa lembrar que precisamos ter sempre em mente que o DW é um projeto de negócio não de TI. Ao definir os Marts, fatos e dimensões que iremos criar precisamos construir algo que faça sentido na estrutura atual e futura da empresa. Uma forma de estruturar isso é utilizar uma hierarquia partindo dos departamentos organizacionais, seguindo pelos processos de negócio até chegar nas entidades.

```{figure} ../../../assets/img/organizacao_marts.png
:name: organizacao_marts
:height: 450px
 Organização dos Data Marts
```

Existem duas formas tradicionais de modelar os Data Marts: o schema *snowflake*  e *star schema*. Ambos utilizam fatos e dimensões e armazenam as mesmas informações. A principal diferença entre eles é que o *star schema* é integralmente de-normalizado enquanto que no modelo *snowflake* as tabelas de dimensões são normalizadas. Em termos práticos, o modelo *snowflake* necessita, geralmente, de menor espaço de armazenagem e é mais otimizado em termos de bancos de dados tradicionais, já o modelo *star schema* facilita as consultas pois não necessita a realização de diversos JOINs mas somente um nível para cada tabela de fatos (por isso o nome *star schema*). 

Uma questão natural que surge é qual arquitetura é melhor. Na era dos Data Warehouses na nuvem, a rapidez na consulta é em geral preferível à otimização de armazenamento de modo que utilizaremos a arquitetura *star schema* por padrão.

Definidos os Marts iniciais, iniciamos pela identificação dos fatos e medidas mais relevantes nesta área de negócio. 
