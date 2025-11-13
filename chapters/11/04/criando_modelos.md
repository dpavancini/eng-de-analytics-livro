# 11.4 Criando os modelos conceituais

A próxima etapa é a criação dos Modelos Conceituais das tabelas do Data Warehouse, o que permite ter uma visão gráfica das entidades que precisarão ser criadas futuramente. Em raros casos, pode ser necessária a criação de Modelos Lógicos detalhando melhor as chaves e os atributos contidos em cada tabela. No MDS, preferimos manter o modelo lógico vivo junto ao código (por exemplo, modelos + YAML no dbt com descrições, testes e tags) ao invés de documentos estáticos que rapidamente ficam defasados.

```{figure} ../../../assets/img/modelo_conceitual_estrela.png
:name: modelo_conceitual_estrela

Exemplo de Modelo Conceitual de Data Warehouse
```