(data_ops)=
# Capítulo 16 - DataOps: Engenharia de software para dados

Um conceito essencial do desenvolvimento de software é a separação do ambiente final do sistema que os clientes e usuários tem acesso, o ambiente “produção”, do ambiente onde novas funcionalidades e código é desenvolvido, o ambiente de desenvolvimento. Em analytics, por outro lado, tradicionalmente alterações são feitas diretamente nas ferramentas utilizadas para geração de análises, causando problemas frequentes. A evolução de uma aplicação segue então um processo com etapas bem definidas e isoladas entre si de forma a evitar que erros e bugs passem para a aplicação final:

- Desenvolvimento (develop): criar e modificar código de uma aplicação;
- Montar (Build): montar os componentes de uma aplicação;
- Testar (test): testar e verificar dentro de um ambiente teste;
- Deploy: mover o código para o ambiente de “produção”
- Executar (run): executar a aplicação

Mais recentemente, uma parte deste processo passou a ser automatizada ao que deu-se o nome de DevOps (DEVelopment + OperationS). O Build e test de novos códigos em um ambiente de desenvolvimento é feito automaticamente pelo CI (continuous integration). Quando aprovado, as alterações são também integradas automaticamente no ambiente produção através do CD (continuous deployment). Através desta abordagem empresas como Amazon e Google conseguem realizar o deploy de alterações em serviços em questões de segundos e com segurança.

Um desenvolvedor geralmente utiliza softwares facilitadores chamados de IDE (do inglês Integrated Development Environment ou Ambiente de Desenvolvimento Integrado) a exemplo do [Visual Studio](https://visualstudio.microsoft.com/pt-br/downloads/), Atom ou PyCharm. O código fonte de cada aplicação é salvo em pastas especiais chamadas de sistemas de versionamento de código, que guardam a história de cada alteração nos arquivos. Essas pastas são sincronizadas com um repositório online que permite que cada desenvolvedor trabalhe de forma isolada sem gerar conflitos entre si. O mais famoso desses repositórios é o github, que utiliza um sistema chamado git.

Ao iniciar uma nova funcionalidade, cada desenvolvedor faz uma cópia do código-fonte e cria uma nova branch (do inglês, galho). Cada nova alteração ou conjunto de alterações são persistidas nessa branch no momento em que nós fazemos um commit, onde incluímos uma mensagem explicando quais alterações realizamos. Quando nos sentimos confortáveis com nosso trabalho, enviamos esses arquivos para o repositório online (através do git push) e  pedimos para juntar essas alterações à branch principal, geralmente chamada master. Esse pedido é chamado de Pull Request ( ou simplesmente, PR), que é revisado e aprovado (ou não) por outras pessoas na equipe. Antes de juntarmos o código, processo chamado de merge, as ferramentas de git verificam se há conflitos do nosso trabalho com o de outras pessoas. Em alguns casos, testes automatizados também são rodados para ter mais uma camada de verificação. O uso de versionamento de código e testes é um dos pilares do DevOps e também do DataOps, a aplicação de DevOps para analytics.

> **Para saber mais**
Para quem é iniciante em Git, há diversos tutoriais sobre o assunto como [este](https://www.atlassian.com/br/git/tutorials/what-is-version-control). Também existem diversos workflows possíveis para trabalhar com Git, entre os mais populares está o Git Flow. Se você quiser aprender mais, pode ler esse artigo no [Medium](https://blog.ateliedocodigo.com.br/fluxo-de-versionamento-de-software-com-git-flow-b9f5195c679e) ou  [aqui](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow).
{.is-info}

Quando trabalhamos com dados, entretanto, não basta que o código esteja correto, mas precisamos que os dados também façam sentido. Para isso, precisamos adicionar testes de dados e de schema ao nosso processo. Para isso podemos utilizar funcionalidades de ferramentas como o [dbt](/analytics-engineering/dbt) ou mesmo ferramentas específicas como o [great_expectations](https://greatexpectations.io/). Abaixo apresentamos exemplos destes dois tipos de testes:

**Testes de schema:**
- A fonte de dados tem as colunas certas?
- A coluna tem o tipo certo?
- Tem valores nulos?
- Temos todas as tabelas?

**Testes de dados:**
- A tabela “Vendas” tem pelo menos 500 linhas?
- Clientes tem no máximo 1000 linhas?
- A soma de pedidos no mês 05 é 1456?.

Como os dados se alteram continuamente, diferente do código de uma aplicação, também precisamos isolar nosso ambiente de desenvolvimento e produção de forma metódica. No ambiente de desenvolvimento, queremos isolar nossos testes nas lógicas de negócio e no código e evitar alterações externas no ambiente. Por isso, congelamos os dados e trabalhamos com uma amostra de dados que não se altera. Já no ambiente de produção, nosso objetivo é testar continuamente se os dados estão dentro dos limites que desejamos. 

No ambiente de desenvolvimento, alteramos os modelos de dados, regras de negócio, fontes de dados, etc. para os requisitos necessários. Também testamos continuamente o código e as lógicas para garantir que não ocorra uma duplicação de dados, um JOIN errado, etc. Também podemos visualizar os dados gerados em um ambiente de visualização teste.  Quando o código estiver aprovado e estivermos confiantes que as alterações no pipeline estão consistentes, o pipeline em produção passa a utilizar o novo código de transformação em cima dos dados atualizados. Assim garantimos que durante todo o desenvolvimento os dados que o “consumidor final” recebe é consistente e atualizado e novas alterações são quase imperceptíveis. Um verdadeiro desenvolvimento de software.. só que de Analytics.

## Aplicando práticas de DataOps com o dbt

## Escrevendo testes

Garantir a integridade dos dados na transformação  é parte essencial de qualquer projeto de ETL e o dbt foi pensando com as melhores práticas de engenharia de software em mente, em especial a capacidade de escrever testes sobre os dados de forma direta e consistente.

Quanto mais cedo incluirmos testes no processo de ETL, mais fácil será a validação dos modelos finais com o cliente. É por isso que recomendamos inverter o processo e escrever testes antes mesmo de escrever os modelos.

Conceitualmente, há dois tipos de [testes](https://docs.getdbt.com/docs/building-a-dbt-project/tests) no dbt: 

- **testes genéricos (antigos testes de schema)**: são definidos em um arquivo .yaml e permitem realizar testes gerais sobre colunas da tabela, tais como: unicidade, não-nulicidade, valores dentro de uma lista pré definida, relacionamentos, entre outros. O teste falha quando há algum registro que não passa em um teste específico . Ex. há um registro duplicado em uma coluna com teste de unicidade.
- **testes singulares (testes de dados)**: são consultas sql que devem retornar 0 linhas para passarem no teste. Geralmente são testes baseados em dados validados com o cliente e de grande importância para garantir que os modelos estão gerando resultados consistentes.

De forma geral, devemos incluir ao menos um testes genérico para cada modelo na sua chave primária (surrogate ou natural). Por exemplo, para garantir que não tenhamos nenhum cliente repetido na tabela de clientes, vamos criar um arquivo `dim_customers.yml` e incluir dois testes para a chave sk:

```YAML
version: 2
 
models:
 - name: dim_customers
   columns:
     - name: customer_sk
       description: The primary key of the customer
       tests:
         - unique
         - not_null
```

Para entender como os testes funcionam na prática, precisamos rodar o comando `dbt run`  no terminal. Ao fazê-lo, o dbt converte os testes em consultas SQL apropriadas e retorna o resultado (sucesso ou falha) de forma similar a um modelo:

<!-- ![cap11-figura6.png](/engenharia-analytics-intro/cap11/cap11-figura6.png)
**Figura 11.6. Exemplo de sucessos nos testes** -->

Vemos que nossa tabela de dimensão clientes não possui nenhum registro repetido ou nulo na coluna customer_sk. Mas e se fizermos o mesmo teste para a coluna order_id na tabela de pedidos? o que esperamos encontrar? Lembremos que optamos por juntar na tabela de fatos a tabela de itens por pedido, de modo que podemos ter múltiplas linhas para cada pedido. Ao rodar um teste de unicidade para o id do pedido (order_id), esperamos que esse teste falhe e é exatamente isso que acontece. Vemos que o dbt encontrou 693 linhas repetidas quando esperávamos nenhuma:

<!-- ![cap11-figura7.png](/engenharia-analytics-intro/cap11/cap11-figura7.png)
**Figura 11.7. Neste caso ocorreu uma falha em um teste** -->

É comum que durante o processo de modelagem aconteçam transformações que porventura dupliquem registros que deveriam ser únicos (um join equivocado por exemplo) ou que possivelmente existam regras de negócio que não sabíamos de antemão. Para esses casos, escrever testes de forma consistente facilita muito o trabalho de validação e desenvolvimento dos modelos com segurança. Além de unicidade e não-nulidade, outros testes de schemas comuns a serem incluídos nos modelos são:

- **Teste de relacionamento (relationship)**: os testes de relacionamento servem para garantir relacionamentos entre colunas de modelos distintos, similar ao comportamento de chaves estrangeiras no banco transacional. Geralmente é utilizado para mapear chaves de dimensões dentro das tabelas fato.

```YAML
version: 2
 
models:
 - name: fct_order_detail
   columns:
     - name: employee_fk
       description: The foreign key to the employees dimension table
       tests:
         - relationships:
               to: ref('dim_customers')
               field: 'customer_sk'
```


- **Teste de valores aceitos (accepted_values)**: esse tipo de teste serve para garantir que os valores de uma coluna estejam em um intervalo pré-definido. Por exemplo, em uma coluna de status de pedido.

```YAML
version: 2
 
models:
 - name: dim_products
   columns:
     - name: is_discontinued
       tests:
         - accepted_values:
               values: ['No','Yes']
```


Na maioria dos casos, a grande dificuldade no processo de modelagem de dados é garantir que indicadores e resultados sejam os mesmos (ou próximos) dos considerados ‘verdadeiros’ pelo cliente.  Não raramente o próprio cliente não tem uma visão clara dos passos necessários, fontes de dados e regras de negócios que são aplicadas antes da geração de um indicador em um relatório ou planilha de Excel e é o trabalho do analytics engineer trabalhar de forma integrada com o cliente para extrair essas informações e aplicar no processo de modelagem. Para facilitar esse trabalho podemos utilizar os testes de dados. isto é, consultas SQL arbitrárias em cima dos modelos que garantem que nossos modelos cheguem no resultado desejado. Para evitar outros problemas como dados mutáveis, atraso no ETL etc, o ideal é sempre fixarmos um período retroativo onde temos confiança que os dados não irão se alterar. 

Como exemplo, queremos validar a quantidade de itens em pedidos da nossa tabela de fatos de pedidos (`fct_order_detail`). Para isso, vamos fazer uma consulta nos dados originais e fixar os pedidos criados em março de 1998 como período de validação. Podemos gerar a consulta diretamente em SQL e logo obtemos uma quantidade de 4065 unidades vendidas.

Após hipoteticamente confirmarmos com a Northwind que esse número é consistente, podemos utilizar como validação em nosso teste de dados `sum_quantity_march_1998.sql`. Notamos que a sintaxe do teste é muito próxima de um modelo mas que devemos escrever nossa consulta final como se quiséssemos que ele “desse errado”, isto é, queremos retornar todas as linhas onde o teste não passa ao rodar o dbt test,  e o sucesso no teste ocorre quando o resultado da consulta é vazio.

```SQL
* If sum of quantity in March-1998 is not 4065, throws an error */
 
with
   sum_quantity as (
       SELECT
           sum(quantity) as cnt
       FROM {{ ref ('fct_order_detail') }}
       where order_date
       between '1998-03-01' and '1998-03-31'
   )
 
select * from sum_quantity where cnt != 4065
```

Ao combinarmos o uso de testes genéricos e singulares desde o início do projeto, garantimos a consistência e integridade do ETL mesmo em projetos com centenas de modelos.

## Documentando o modelo de dados e visualizando as dependências

A última etapa dentro de um projeto padrão de dbt é a documentação dos modelos e transformações. Essa documentação é feita a partir dos arquivos `schema.yml` que já utilizamos para escrever nossos testes de schema através de campos de descrição de tabelas e colunas. Ao criarmos as descrições, elas são adicionadas com outras informações que o dbt processa de como as fontes, modelos e testes do projeto estão estruturados. No exemplo abaixo documentamos a tabela de dimensão de Produtos e cada uma de suas colunas, de preferência na mesma ordem que no modelo final:

```YAML
version: 2

models:
  - name: dim_products
    description: This is the Products Dimension table. It includes information about Northwind Products.
    columns:
      - name: product_sk
        description: The primary key of the product
        tests:
          - unique
          - not_null

      - name: product_id
        description: The natural key of the product

      - name: product_name
        description: The product name

      - name: units_in_stock
        description: The total of units in stock for the given product.

      - name: category_id
        description: The natural key of the category.

      - name: unit_price
        description: The product unit price.

      - name: reorder_level
        description: The re-order level to avoid stock-outs.

      - name: supplier_id
        description: The natural key of the supplier.

      - name: units_on_order
        description: The minimum units on a purchase order.

      - name: is_discontinued
        description: If the product has been discontinued.
        tests:
          - accepted_values:
                values: ['No','Yes']
```

Embora já seja importante para o entendimento dos modelos junto ao código, é quando utilizamos o comando `dbt docs`  que vemos o diferencial de utilizar o dbt nesse quesito. O comando `dbt docs generate` gera um arquivo de documentação em formato html que conseguimos visualizar de forma interativa no navegador mesmo em projetos complexos, facilitando a colaboração e  compartilhamento da modelagem. A visualização é feita através do `dbt docs serve` no terminal:

<!-- ![cap11-figura8.png](/engenharia-analytics-intro/cap11/cap11-figura8.png)
**Figura 11.8. Exemplo de documentação do dbt** -->

Além das descrições, o dbt gera uma árvore de dependências dos modelos que facilita o entendimento do ETL:

<!-- ![cap11-figura9.png](/engenharia-analytics-intro/cap11/cap11-figura9.png)
**Figura 11.8. Exemplo de árvore de dependências do dbt** -->

A documentação conclui as etapas básicas que devem constar de qualquer projeto de transformação de dados em dbt. Vale ressaltar que projetos de ETL raramente são lineares: geralmente passamos por diversas iterações de cada etapa do projeto, desde mapeamento de novas fontes, criação dos modelos, testes e documentação. Depois de validados, ainda precisamos apontar os modelos para um banco de dados em produção que será de fato consultado por uma ferramenta de BI ou outro uso pelo cliente, além de garantir que esse processo todo rode na frequência e horário adequado para os fins do projeto. Na seção de Orquestração de tarefas, abordamos como fazer isso utilizando ferramentas como o Airflow ou Prefect.  Uma outra alternativa é utilizar o serviço do dbt cloud, uma solução SaaS dos criadores do dbt que facilita o deploy de projetos em dbt.