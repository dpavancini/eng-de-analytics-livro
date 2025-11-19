# 14.2 Tipos de Ingestão

Escolher como os dados chegam ao DW é tão importante quanto desenhar os modelos. Essa decisão depende do ritmo do negócio e da forma como a fonte se comporta. Pense em três variáveis principais: frequência (batch, micro-batch, streaming), volume (quantos registros por execução) e mutabilidade (há atualizações retroativas?).

Em projetos de DW tradicionais, lotes noturnos resolvem grande parte das necessidades. Porém, alguns casos pedem atualizações de hora em hora ou quase em tempo real — e aí o custo operacional sobe: mais orquestração, monitoração contínua e risco maior de sobrecarregar sistemas fonte. Comece simples e evolua somente quando o benefício estiver claro.

### Ingestão *full*

Para garantir a consistência dos dados, a forma mais segura de processamento é por meio de *full-loads*, ou seja, carregando todos os dados da fonte original em cada execução. Como esse processo é geralmente intensivo em termos computacionais, é comum que seja realizado em momentos em que o banco de dados fonte é menos utilizado (por exemplo, de madrugada). O problema dessa abordagem é que ela se torna menos viável se for necessário que os dados sejam atualizados com maior frequência, tanto pelo risco de tornar o sistema fonte lento, como pelo fato de que, se uma carga completa demorar de 1 a 2 horas para ser feita, é tecnicamente inviável que a frequência de atualização seja menor que esse período.

### Ingestão incremental

Na prática, a forma mais tradicional de aumentar a frequência de atualização dos dados é utilizar uma carga (*load*) incremental, ou seja, de forma que apenas os novos registros sejam adicionados a cada execução. Para isso, é necessário utilizar uma coluna que indexe a recência dos registros, como `Data` ou `ID`, de modo que, a cada execução, somente os registros posteriores a esse índice sejam extraídos. No exemplo da tabela abaixo, suponha que, diariamente, às 23:59, seja feita uma carga incremental da tabela de Pedidos da empresa ACME S/A, utilizando a coluna de data como índice. No dia 10/01/2015, ao rodar a extração, teríamos uma tabela com três registros (1, 2, 3). No dia seguinte, a extração incremental traria apenas dois registros (4, 5).

```{table} Exemplo de ETL Incremental
| ID do Pedido | Data       | Cliente       | Produto            | Valor Total |
|--------------|------------|---------------|--------------------|-------------|
| 1            | 10/01/2015 | João da Silva | Bicicleta Voadora  | R$ 150,00   |
| 2            | 10/01/2015 | Joana D’arc   | Bicicleta Aquática | R$ 200,00   |
| 3            | 10/01/2015 | Tony Stark    | Bicicleta 4 Rodas  | R$ 180,00   |
| 4            | 11/01/2015 | Carlos Santos | Bicicleta Voadora  | R$ 150,00   |
| 5            | 11/01/2015 | Edson Arantes | Bicicleta 4 Rodas  | R$ 180,00   |
```

O problema da carga incremental é que bancos de dados transacionais, em geral, não são *imutáveis*, ou seja, nem sempre é possível atualizar uma extração apenas com novos dados. Por exemplo, vamos adicionar mais uma coluna de status na tabela de Pedidos, que pode ter três valores (Pendente, Finalizado e Cancelado). Neste caso, não basta extrair os novos registros, mas também precisamos nos preocupar com atualizações em registros anteriores (UPDATEs). Se nosso objetivo for criar uma métrica de total de vendas por dia, por exemplo, ao não considerar pedidos cancelados, estaríamos superestimando as vendas e gerando uma métrica equivocada ao utilizar um processamento incremental.

```{table} No dia 10/01 temos três pedidos, sendo que dois ainda estão pendentes.
| ID do Pedido | Data do Pedido | Cliente       | Produto            | Status     | Valor Total |
|--------------|----------------|---------------|--------------------|------------|-------------|
| 1            | 10/01/2015     | João da Silva | Bicicleta Voadora  | Finalizado | R$ 150,00   |
| 2            | 10/01/2015     | Joana D’arc   | Bicicleta Aquática | Pendente   | R$ 200,00   |
| 3            | 10/01/2015     | Tony Stark    | Bicicleta 4 Rodas  | Pendente   | R$ 180,00   |
```

```{table} No dia 11/01, dois novos pedidos são registrados e um pedido do dia anterior é cancelado, mas não é capturado em uma carga incremental.

| ID do Pedido | Data do Pedido | Cliente       | Produto            | Status     | Valor Total |
|--------------|----------------|---------------|--------------------|------------|-------------|
| 1            | 10/01/2015     | João da Silva | Bicicleta Voadora  | Finalizado | R$ 150,00   |
| 2            | 10/01/2015     | Joana D’arc   | Bicicleta Aquática | Cancelado  | R$ 200,00   |
| 3            | 10/01/2015     | Tony Stark    | Bicicleta 4 Rodas  | Pendente   | R$ 180,00   |
| 4            | 11/01/2015     | Carlos Santos | Bicicleta Voadora  | Finalizado | R$ 150,00   |
| 5            | 11/01/2015     | Edson Arantes | Bicicleta 4 Rodas  | Pendente   | R$ 180,00   |
```

Como podemos abordar esse problema? Em outras palavras, como não precisar fazer uma carga total em ambientes em que os dados podem sofrer atualizações retroativas (*mutáveis*)? Veremos que uma das formas é por meio de um novo índice que identifique a atualização do registro, e não apenas sua data de criação. Por exemplo, vamos adicionar uma nova coluna "Data de Atualização" na tabela acima para capturar mudanças nos registros e indexar essa mudança na extração, de modo que a extração do dia 11/01/2015 também considere o Pedido 2.

```{table} No dia 11/01, dois novos pedidos são registrados e um pedido do dia anterior é cancelado, mas não é capturado em uma carga incremental.

| ID do Pedido | Data do Pedido | Cliente       | Produto            | Status     | Valor Total | Data de Atualização |
|--------------|----------------|---------------|--------------------|------------|-------------|---------------------|
| 1            | 10/01/2015     | João da Silva | Bicicleta Voadora  | Finalizado | R$ 150,00   | 10/01/2015          |
| 3            | 10/01/2015     | Tony Stark    | Bicicleta 4 Rodas  | Pendente   | R$ 180,00   | 10/01/2015          |
| 2            | 10/01/2015     | Joana D’arc   | Bicicleta Aquática | Cancelado  | R$ 200,00   | 11/01/2015          |
| 4            | 11/01/2015     | Carlos Santos | Bicicleta Voadora  | Finalizado | R$ 150,00   | 11/01/2015          |
| 5            | 11/01/2015     | Edson Arantes | Bicicleta 4 Rodas  | Pendente   | R$ 180,00   | 11/01/2015          |
```

Nem sempre existe um índice que nos permite identificar alterações nos dados como na tabela anterior. Por este motivo, a forma mais segura de processamento incremental é por meio do uso de técnicas baseadas em logs de transações do banco de dados que registram todas as operações de INSERT, DELETE, UPDATE, etc. realizadas. 

Tanto a abordagem baseada em data de modificação quanto a baseada em log são técnicas chamadas de [CDC](https://aprendizadodemaquina.com/artigos/o-que-e-change-data-capture-cdc/) (*change data capture*). Ferramentas como Fivetran, Airbyte e Debezium já implementam CDC nativamente, mas é fundamental que você entenda o conceito para fazer escolhas conscientes e negociar requisitos com as áreas de origem.

---

Este capítulo encerra a parte conceitual da ingestão: você viu como avaliar acessos, mapear restrições e definir estratégias de carga. Nos próximos dois capítulos vamos para o que mais ocupa o tempo de um Analytics Engineer: transformação e modelagem de dados.
