# 4.9 Planilhas vs Bancos de Dados SQL: Quais as diferenças?

Uma parte considerável dos dados das organizações estão armazenados não em bancos de dados propriamente ditos, mas em planilhas eletrônicas como o Microsoft Excel ou Google Sheets. Na superfície, não parece haver tantas diferenças entre os dois: dados são armazenados em tabelas com linhas e colunas, podem ser armazenados em diferentes tipos, agregados, concatenados, etc.  No entanto, algumas diferenças importantes existem entre os dois:

## Consistência

Uma característica fundamental dos bancos de dados SQL é o rigor com os tipos de dados. Especificamente, cada coluna só pode armazenar um tipo de dado e inserir um valor que não respeita essa restrição deve gerar um erro. Planilhas eletrônicas, por sua vez, são extremamente flexíveis. É possível salvar praticamente qualquer informação em uma célula da planilha, aplicar funções sobre elas, comentários, ocultar e muito mais. Essa flexibilidade é muito interessante para uma simulação, gráficos ou um relatório rápido, mas quando se trata de armazenamento de dados as planilhas são muito perigosas e suscetíveis a erros. 

## Reprodutibilidade

Para realizar uma consulta ou operações sobre dados em uma planilha, precisamos  de instruções detalhadas de como fazer essa consulta.  O resultado final da consulta (os dados) e a forma como chegamos nele se misturam e não há uma forma padrão de reproduzir os passos realizados. O resultado é que a depender da forma como fazemos esse processo, pode ser até mesmo impossível retornar aos dados iniciais que utilizamos no processo.  Para compartilhar a análise, precisamos enviar o arquivo da planilha.
Em SQL, a consulta se preocupa com o que  queremos consultar, deixando ao banco de dados a tarefa de pensar como fazer a consulta. Dessa forma, separamos a camada de processamento da camada de dados, de modo que podemos compartilhar apenas as instruções (em um simples arquivo txt) e manter os dados isolados. Isso permite uma reprodutibilidade muito maior que em planilhas. 

## Ausência de chaves 

Um dos conceitos fundamentais do banco de dados SQL é o relacionamento entre os dados. Por exemplo, cada fatura salva em uma tabela de faturas é relacionada a um único cliente em uma tabela de clientes através de uma chave estrangeira. A existência de chaves formais facilita consultas e garante a consistência das análises. Por outro lado, é comum encontrar planilhas utilizadas como bancos de dados “informais”, através de chaves informais e funções como PROCV() e ÍNDICE(CORRESP()), que simulam o comportamento de chaves estrangeiras em bancos de dados porém com várias desvantagens, como o risco de erros, dados sem correspondência, entre outros. Em geral, se começamos a utilizar essas funções de forma recorrente em uma planilha é um sinal de que deveríamos estar utilizando um banco de dados.

## Velocidade

SQL é muito mais rápido que o Excel em volumes maiores de dados. Entre outros motivos, o banco de dados SQL utiliza índices para otimizar a consulta, além de várias otimizações não disponíveis em planilhas.

## Volume

Quando estamos trabalhando com um pequeno volume de dados, algumas centenas ou milhares de linhas, a opção entre planilha e banco de dados não é tão clara. Em grandes volumes, não há opção; as planilhas têm sérias limitações de volume de dados (EXCEL suporta até 1 milhão de linhas, mas com grandes dificuldades) enquanto bancos de dados SQL podem suportar milhões de linhas ou mesmo bilhões.

