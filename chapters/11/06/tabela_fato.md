# 11.6 Modelando a Tabela Fato

O próximo passo é mapear **Tabela Fato Pedidos** a partir da tabela fonte de pedidos e da Tabela Dimensão Clientes criada. Como a `dim_cliente` é SCD Tipo 2, precisamos utilizar tanto a chave natural como as datas de validade da dimensão para mapear a chave SK entre as tabelas, caso contrário iremos acabar duplicando registros. Por fim acrescentamos uma tabela de dimensão de datas e que cria importantes hierarquias e novos agrupamentos possíveis. Omitimos a tabela de endereços para simplificar a exposição, mas ela seria criada de forma semelhante:

```{figure} ../../../assets/img/mapeamento_fato_pedido.png
:name: mapeamento_fato_pedido
:height: 450px

Exemplo de Mapeamento da Tabela **Fato**
```

Um projeto real de DW pode ter centenas de tabelas de fatos e dimensões distribuídas por dezenas de data marts (({numref}`evolucao_dw`)). No entanto, seguindo um método consistente como apresentando aqui é possível simplificar e otimizar o processo, aumentando a complexidade e tamanho do projeto a partir de entregas intermediárias menores. Se tivermos feito nosso trabalho corretamente, apesar do tamanho o *Data Warehouse* não se tornará um "bicho indomável" mas terá uma estrutura que facilitará a análise de negócio como **fonte única da verdade** dos dados de uma organização.

```{figure} ../../../assets/img/evolucao_dw.png
:name: evolucao_dw
:height: 450px

Evolução do Data Warehouse
```

Como já mencionamos, o sucesso ou insucesso de um projeto de BI/DW é medido não por sua complexidade técnica ou arquitetura refinada mas pelo valor gerado para o usuário final. Por este motivo, a aceleração das entregas permite identificar as consultas reais criadas pelos usuários e otimizar a arquitetura do DW conforme necessário.  Uma dessas otimizações muito comum é a de criação de tabelas resumo e agregadas de consultas lentas ou de alta utilização que apresentaremos na próxima seção.