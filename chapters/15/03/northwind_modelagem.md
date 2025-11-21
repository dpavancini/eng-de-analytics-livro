# 15.3 Conhecendo os dados da Northwind

O exemplo prático deste livro utiliza os dados fictícios da empresa Northwind, que simulam um banco transacional (OLTP) de um sistema de ERP. Vamos usá-los como fonte para construir um modelo dimensional e servir de blueprint para os capítulos de implementação.

```{figure} ../../../assets/img/15_03_northwind_er.png
:name: Modelo Relacional ERP Northwind
Fonte: Criado pelo autor.
```

Trabalharemos com uma versão reduzida do ERP original (algumas tabelas foram removidas) disponível no repositório `northwind`, pasta `seed`. Todas as tabelas da figura acima representam o ERP normalizado que servirá de ponto de partida. Antes de iniciarmos a modelagem, alinhamos o desenho conceitual e o resultado desejado em um esquema estrela.

- **Mapeando o processo de vendas**: um pedido (`orders`) possui vários itens de produto, é capturado por um vendedor (`employees`), enviado por uma transportadora (`shippers`) e faturado para um cliente (`customers`). Vamos criar duas tabelas fato para refletir essas perspectivas:
  - **fct_orders**: grão de 1 linha por pedido, relacionando-se diretamente a `employees`, `customers` e `shippers`.
  - **fct_transactions**: grão de 1 linha por item de um pedido; um pedido com três itens gera três registros. Referencia `employees`, `customers`, `shippers` e `products`.

- **Dimensões**:
  - **products**: categorias e fornecedores são tratados como atributos da dimensão de produto. Poderíamos ter uma dimensão exclusiva de fornecedores, mas manter como atributo simplifica o consumo (um *join* a menos para o usuário final).
  - **customers**: relação direta com `orders` e uma auto-relação que indica hierarquia. Essa característica precisa ser levada em conta ao criar a dimensão.
  - **employees**: relação direta com `orders`, sem complexidade adicional para virar dimensão.
  - **shippers**: também deriva diretamente de `orders`.

Ao converter esse desenho para o formato estrela, chegamos a:

```text
Fato transações (fct_transactions)
 ├─ dim_customers
 ├─ dim_employees
 ├─ dim_products
 ├─ dim_shippers
 └─ (degenerada) atributos do pedido

Fato pedidos (fct_orders)
 ├─ dim_customers
 ├─ dim_employees
 ├─ dim_shippers
 └─ (degenerada) atributos do pedido
```

```{figure} ../../../assets/img/15_03_northwind_dimensional.png
:name: Modelo Dimensional ERP Northwind
Esquema estrela utilizado ao longo do capítulo.
Fonte: Criado pelo autor.
```

Este blueprint direciona os próximos passos: no Capítulo 16 o implementaremos com *dbt Core/Cloud* e, no Capítulo 17, repetiremos o fluxo no Databricks Lakehouse usando o Lakeflow Declarative Pipelines.
