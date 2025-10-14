# 2.1 Os 5 Vs do big data

Os 5 Vs nasceram na era do *big data* para explicar por que iniciativas de analytics fracassavam com tanta frequência. Hoje eles continuam úteis, desde que sejam encarados como heurísticas — e não como verdades absolutas. Cada V ajuda a identificar onde colocar energia e quais práticas modernas adotar, seja uma arquitetura baseada em *lakehouses*, testes automatizados no dbt ou contratos de dados com times de produto.

Nem toda organização precisa enfrentar todos os Vs ao mesmo tempo. Startups podem viver um desafio de **variedade** ao consolidar dados de SaaS distintos, enquanto empresas maduras podem estar lutando com o **valor** de modelos preditivos que ninguém utiliza. O papel do Engenheiro de Analytics é traduzir esses desafios em escolhas arquiteturais, processos e parcerias certas.

Para entender onde os 5 Vs aparecem, é útil visualizar as etapas clássicas de uma solução de analytics:

```{figure} ../../../assets/img/etapas.png
:name: etapas
Figura: Etapas de uma solução de análise de dados
Fonte: elaborada por Indicium Academy.
```

Os desafios dos 5 Vs podem estar presentes em maior ou menor grau em cada uma dessas etapas e condicionados à variedade de fontes de dados disponíveis, ao volume desses dados, à frequência ou velocidade de processamento necessário, a quantas transformações e limpeza precisamos aplicar nos dados, a que tipo de visualização ou utilização queremos obter.

Quando estiver definindo ou evoluindo sua plataforma analítica, retome perguntas como:

* quais são as fontes de dados que temos disponíveis? 
* quais fontes precisamos priorizar e qual o esforço de limpeza de cada uma?
* qual SLA (service level agreement) de atualização precisamos cumprir para responder às perguntas do negócio?
* que partes do pipeline podem ser operadas com ferramentas SaaS e onde faz sentido construir soluções sob medida?
* quão preparados estamos para governar custos, qualidade e o ciclo de vida dos dados produzidos?
* quem são os consumidores dos dados e quais decisões eles esperam tomar com cada conjunto?
* nosso objetivo é substituir e/ou aprimorar relatórios existentes ou fazer algo totalmente novo como modelos preditivos?

Nas próximas seções mergulharemos em cada V, sempre com foco na atuação do Engenheiro de Analytics dentro de equipes modernas orientadas a dados.
