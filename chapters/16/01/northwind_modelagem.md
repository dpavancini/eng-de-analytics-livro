# 16.1 Conhecendo os dados da Northwind

O laboratório deste capítulo usa o repositório [engdeanalytics/northwind](https://github.com/engdeanalytics/northwind/tree/recursos), exatamente como apresentado nas aulas e na branch `recursos`. As *seeds* representam o ERP da Northwind (clientes, pedidos, itens, produtos, fornecedores e transportadoras) em um modelo relacional clássico. Antes de abrir o dbt, vale revisar o desenho conceitual e decidir qual será o mart dimensional.

- **Domínio de Vendas**: um pedido (*order*) possui vários itens (*order_details*), é capturado por um vendedor (*employees*), enviado por uma transportadora (*shippers*) e faturado para um cliente (*customers*).
- **Domínio de Catálogo**: os produtos pertencem a categorias e fornecedores.

Ao converter esse desenho para o formato estrela, chegamos a:

```text
Fato transações (fct_transactions)
 ├─ dim_customers
 ├─ dim_employees
 ├─ dim_products
 ├─ dim_shippers
 └─ (degenerada) atributos do pedido
```

```{figure} ../../assets/img/modelo_dimensional_nw.png
:name: modelo_dimensional_cap16
Esquema estrela utilizado ao longo do capítulo.
```

Todo o restante do capítulo mostrará como sair das tabelas normalizadas da branch `recursos` para materializar esse modelo estrela no dbt, camada por camada. Se quiser conferir os dados manualmente antes de prosseguir, rode consultas simples na seed `orders_detail.csv` ou visualize o arquivo `data_model.png` do repositório.
