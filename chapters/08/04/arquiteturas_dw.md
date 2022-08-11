# 6.4 Arquiteturas de Data Warehouse

O conceito de criar data warehouses não é novo, e desde os anos 1990 algumas abordagens se tornaram comuns principalmente no ambiente corporativo. As duas abordagens mais comuns são associadas a dois nomes muito representativos no mundo de data warehouse e BI, Ralph Kimball e William (Bill) Inmon. Ambos são autores direta e indiretamente de dezenas de livros e abordagens utilizadas na criação de Data Warehouses mundo afora.  Os esquemas estrela também estão presentes nas diversas abordagens, assim como o uso de fatos e dimensões. A principal diferença entre eles é a recomendação de usar ou não a normalização além das estrelas, que veremos em seguida:

## Abordagem dimensional de Kimball

Na proposta de Kimball, o data warehouse armazena somente dados desnormalizados em esquemas estrela. Um processo de ETL é responsável por retirar os dados das fontes de dados transacionais e construir os data marts de modo que as tabelas dimensão são padronizadas, ou conformadas, entre as diferentes estrelas. Nessa abordagem, um data mart é apenas uma divisão lógica de um único DW físico.

```{figure} ../../../assets/img/modelo_dimensional.png
:name: esquema_estrela

O modelo dimensional de Kimball
```
A criação das dimensões conformadas é parte essencial da modelagem dimensional de Kimball. Uma dimensão conformada é criada uma única vez no processo de ETL e serve como uma tabela mestre que é utilizada por diferentes tabelas fato, permitindo análises cruzadas e compatibilidade entre os diferentes processos. Essa estratégia também permite criar o data warehouse de forma incremental. Kimball propôs uma série de diagramas e matrizes para facilitar a criação das dimensões conformadas, como o da Figura 6.4,  que são chamados de arquitetura bus de data warehouse.

```{figure} ../../../assets/img/arquitetura_bus.png
:name: arquitetura_bus

A arquitetura bus. Fonte: Kimball Group
```

## O *Corporate information factory* de Inmon

**Escrever**

```{figure} ../../../assets/img/arquitetura_cif.png
:name: arquitetura_cif

A arquitetura de *Corporate Information Factory*.
```

## Data Marts Isolados

**Escrever**

```{figure} ../../../assets/img/arquitetura_marts_isolados.png
:name: marts_isolados

Data Marts Isolados.
```