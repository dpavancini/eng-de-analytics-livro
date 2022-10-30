# 7.1 Construindo o Modern Data Stack

Uma estrutura de dados eficiente combina diversos serviços em um data stack, uma pilha de dados.

No geral, uma pilha de dados tem três funções fundamentais: coletar e integrar dados em um data warehouse, limpá-los e transformá-los em informações para agregar valor à tomada de decisão através de visualizações, dashboards de BI etc.

Todas estas funções são processos do pipeline de dados.

Assim, as ferramentas usadas para cada um desses processos formam o *data stack*. Ainda que a arquitetura de um pipeline varie de acordo com as empresas, todos têm esses processos incorporados.

## Os 7 princípios do MDS

A cada dia surgem novas ferramentas e aplicações de ponta em termos de analytics. Por isso, antes de implementar essa abordagem em um projeto, é preciso entender os princípios que a orientam.

Pensando nisso, vamos falar sobre os 7 princípios que toda abordagem moderna de analytics precisa ter.

### 1.Cloud-based

Na abordagem moderna de analytics, o armazenamento de dados de uma organização é totalmente cloud-based: na nuvem.

Essa tecnologia altamente escalável e flexível permite o armazenamento e o processamento de uma quantidade virtualmente infinita de dados em um ambiente online e seguro reduzindo custos com infraestrutura, instalação e manutenção.

Com isso, as organizações podem facilmente expandir ou reduzir sua estrutura de dados sem se preocupar.

### 2. Modularidade

O MDS separa a etapa de transformação, onde ocorre aconstrução da regras de negócio, das etapas de extração (extraction) e carregamento (load) de dados no pipeline de dados. Desta forma é possível combinar diferentes ferramentas de ingestão de dados ao pipeline de forma modular, independente de como as transformações de dados sejam realizadas.

Além disso, ao aplicar essa abordagem, o uso das ferramentas certas, de forma incremental, é simplificado, acelerando a implementação do projeto.

### 3. Simplicidade

Na abordagem moderna de analytics, a transformação de dados deve ser orientada pela simplicidade. Para isso, deve ser desenvolvida de maneira centralizada, preferencialmente em uma ou poucas linguagens de amplo conhecimento.

Portanto, ao invés de escrever códigos em linguagens proprietárias ou sistemas visuais drag-and-drop, essa abordagem opta pela simplicidade das linguagens de programação, trazendo outros benefícios como:

* redução de custos com treinamento
* menor necessidade de manutenção
* democratização da informação
### 4. Governança

Como já mencionado, no *modern data stack*, o armazenamento e processamento dos dados são totalmente feitos em uma estrutura em nuvem.

Dessa forma, todas as informações de uma empresa ficam centralizadas e facilmente acessíveis em um só local, simplificando a documentação e governança dos dados.

Com isso, o usuário pode criar lógicas de permissionamento e gerenciar dados sensíveis de forma integrada.

E, para completar, ele não precisa se preocupar com a segurança, manutenção e o gerenciamento dos recursos de dados armazenados na nuvem, já que essa responsabilidade é das empresas provedoras como AWS, por exemplo.

### 5. Versionamento

Antigamente, uma das grandes dificuldades em se trabalhar com bancos de dados era o controle de versionamento, essencial nas boas práticas de engenharia de software modernas.

Simplificadamente, o versionamento é a capacidade de trabalhar de forma colaborativa em um projeto de dados, sem que o trabalho de uma pessoa gere conflitos com o de outra.

Mas com o modern data stack esses desafios são resolvidos. Sabe por quê?

As ferramentas modernas de ELT utilizadas nessa abordagem, como o DBT, separam os arquivos de modelos de dados, em SQL, do banco de dados em si, solucionando esse problema.

### 6. Separação de ambientes

A sexta característica do MDS é a possibilidade de criar ambientes distintos para separação de dados brutos, dados em transformação e dados finais por meio da aplicação de boas práticas de desenvolvimento de software no pipeline de dados.

Como resultado, usuários distintos podem usufruir de benefícios como:

* acesso a diferentes ambientes de desenvolvimento
* trabalho colaborativo
* redução de erros de produção
### 7. Testes

Por fim, a abordagem moderna de analytics permite a centralização de boas práticas também de testes no projeto de dados, assim como ocorre em projetos de software modernos.

Com um sistema de testes, o analista pode verificar se os dados, modelos e as regras de negócio estão dando resultados consistentes. E, diante dessa informação, ele poderá instalar alertas, caso perceba que determinados resultados saíram do padrão, por exemplo.

Ou seja, os testes são um princípio da abordagem moderna de analytics que garantem a consistência e a confiabilidade dos resultados.

Agora que conhece suas características, você pode partir para a construção da abordagem moderna de analytics na sua empresa.
