# 2.1 Os 5 Vs do big data

Para implementar um processo de análise de dados bem estruturado, é necessário implementar uma complexa teia de processos e ferramentas com base nas características dos dados e das análises de cada empresa e caso de uso.

No passado, os desafios dessa implementação eram chamados de 5 Vs do big data:

- volume
- velocidade
- variedade
- veracidade
- valor

Com o surgimento dos ambientes escaláveis na nuvem, é possível dizer que esses desafios se aplicam a qualquer volume de dados: desde uma startup com alguns gigabytes de dados até empresas que geram volumes massivos deles.
Nem todas as empresas necessitam do mesmo esforço em cada um desses desafios. Para algumas, o desafio pode ser visualizar de forma consistente dados de diferentes fontes que hoje estão inacessíveis. Para outras, pode ser necessário processar métricas, em tempo real, de grandes volumes de dados gerados em um aplicativo.

Saber como identificar os desafios e quais ferramentas estão disponíveis para resolvê-los é uma tarefa essencial para o profissional de dados moderno.

Para iniciar esse entendimento, precisamos lembrar que uma solução de análise de dados geralmente vai possuir estas etapas:

```{figure} ../../../assets/img/etapas.png
:name: etapas
Figura: Etapas de uma solução de análise de dados
Fonte: elaborada por Indicium Academy.

Os desafios dos 5 Vs podem estar presentes em maior ou menor grau em cada uma dessas etapas e condicionados à variedade de fontes de dados disponíveis, ao volume desses dados, à frequência ou velocidade de processamento necessário, a quantas transformações e limpeza precisamos aplicar nos dados, a que tipo de visualização ou utilização queremos obter.

Em empresas de menor porte ou que ainda não tenham uma infraestrutura de dados moderna implementada, é possível que você tenha que dar os primeiros passos em todas as etapas dessa infraestrutura. Para não se perder nesse processo, é bom sempre estruturar algumas perguntas fundamentais:

* quais são as fontes de dados que temos disponíveis? 
* quais delas possuem mais valor imediato?
* quais são nossas opções para processar esses dados? 
* precisamos de algo em tempo real ou podemos realizar análises em lotes?
* podemos utilizar soluções SaaS na nuvem para facilitar esse processo?
* como os dados vão ser utilizados na ponta? 
* nosso objetivo é substituir e/ou aprimorar relatórios existentes ou fazer algo totalmente novo como modelos preditivos?

Nas próximas seções, daremos uma breve introdução a cada um desses desafios e algumas formas de respondê-los.
