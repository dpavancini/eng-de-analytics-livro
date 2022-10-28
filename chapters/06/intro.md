(boas_praticas)=
# Capítulo 6 -  Boas práticas de desenvolvimento

Vimos no {ref}`5_vs` que o volume de dados gerado e armazenado vem crescendo a uma velocidade nunca antes vista. Para resolver os desafios de coletar e processar grandes volumes de dados, muitas tecnologias foram desenvolvidas na chamada "revolução do Big Data". Essas tecnologias hoje formam a base da computação em nuvem e das grandes empresas de tecnologia modernas.

Aproximadamente no mesmo período, o desenvolvimento de software experimentou sua própria revolução com a popularização das práticas de DevOps e desenvolvimento ágil. Isto é, o surgimento de uma série de boas práticas e ferramentas que empoderaram os desenvolvedores para entregar sistemas cada vez mais rápido e com maior qualidade. Hoje é praticamente impensável para um desenvolvedor trabalhar sem ferramentas como o Github, Jenkins, processos CI/CD etc.

Por outro lado, quando falamos de Dados em geral, e Analytics em particular, a situação na maioria das empresas não poderia ser mais diferente. O processo de desenvolvimento e acesso aos dados ainda é largamente manual, dependendo de ciclos de aprovação, abertura de chamados e estruturas de times defasados. Além disso, o desenvolvimento dos pipelines de dados ainda depende de ferramentas de ETL visuais (leia-se Microsoft SSIS, Pentaho PDI etc) que tornam praticamente impossível a aplicação das boas práticas de desenvolvimento de software em projetos de dados.

Provavalmente o maior problema dessas ferramentas é uma tentativa de evitar ao máximo o uso de linguagens de programação em prol de funcionalidades *drag-and-drop* ineficientes e que sofrem do chamado problema de [Inner-platform Effect](https://en.wikipedia.org/wiki/Inner-platform_effect). Isto é, a tentativa de simplificar tanto a experiência de desenvolvimento que torna-se necessário replicar funcionalidades que o próprio sistema operacional ou plataforma de dados já disponibiliza por padrão e de forma muito mais eficiente.

Como proposto pelo DataOps, a forma natural de tratar o desenvolvimento de projetos de dados e analytics é aplicar os processos e ferramentas que já são utilizados com sucesso no desenvolvimento de *software*. Por outro lado, também falamos que o Engenheiro de Analytics é em geral um profissional de negócio, que em geral não teve um treinamento formal em programação e boas práticas de desenvolvimento. Como conciliar?

O objetivo deste capítulo é introduzir ao Engenheiro de Analytics às boas práticas de programação e desenvolvimento de software utilizadas no {ref}`MDS<MDS>` e nas ferramentas modernas de dados. A primeira diz respeito à convenções de como escrever código em si, enquanto a trata de práticas reconhecidas para a gestão do ciclo de vida de um desenvolvimento. Vamos lá?

```{admonition} Você sabia?
A Engenharia de Analytics aplica o princípio de "Data as code" ou "Analytics as code"
```

<!-- Falar de boas práticas de progamação

- Conceitos
- CI/CD
- DevOps
- Antipatterns
- Introdução ao Git
- Separação de ambientes
- Saber rodar "local" -->

