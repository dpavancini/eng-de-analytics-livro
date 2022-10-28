# 6.2 Boas práticas de desenvolvimento

> Os primeiros 90% de código levam 90% do tempo de desenvolvimento. O restante 10% do código representa o restante 90% do desenvolvimento
> [Tom Cargill, Bell Labs](https://en.wikipedia.org/wiki/Ninety%E2%80%93ninety_rule)

O desenvolvimento de software moderno não se resume a códigos bem escritos. O próprio processo de desenvolvimento precisa aderir a boas práticas de gestão, qualidade, entrega contínua e outros conceitos do processo de [DevOps](https://www.atlassian.com/br/devops). Mais do que uma iniciativa individual, o DevOps (e como veremos depois, o DataOps) é uma cultura que precisa ser desenvolvida continuamente em todos os participantes de um projeto de dados.
## Debugging

Entender como testar e depurar (*debug*) códigos é essencial para um bom desenvolvimento. Um desenvolvedor sênior é definido muito mais pelo quanto "ele já errou" (e os caminhos para não errar novamente) do que pelo quanto ele "sabe". Em times de desenvolvimento, é comum que um profissional experiente consiga isolar rapidamente um erro que um desenvolvedor junior perdeu uma semana inteira de trabalho resolvendo.


```{figure} ../../../assets/img/debugging.png
:name: debugging
:height: 450px

*Debugging* é uma arte. Fonte: [monkeyuser.com](http://monkeyuser.com)
```

## Entregas rápidas

Entregas rápidas continuamente ao invés de projetos grandes e demorados. Essa filosofia é a essência do [desenvolvimento ágil](https://pt.wikipedia.org/wiki/Desenvolvimento_%C3%A1gil_de_software) e das boas práticas modernas de desenvolvimento. Em projetos ágeis de software, uma entrega pode ser uma pequena parte de um site ou de uma aplicação em algumas semanas ao invés de uma aplicação completa em vários meses.

## Separação de ambientes

> Nunca teste um código em produção. Nunca. Já falei nunca?

Pode parecer óbvio, mas assim como nós não podemos trocar as rodas com um carro em movimento, também não podemos testar ou desenvolver novas funcionalidades de um sistema diretamente no ambiente utilizado pelo cliente final. A prática de separação entre ambiente de desenvolvimento e ambiente de produção é uma condição necessária de qualquer projeto de desenvolvimento de software moderno.

Infelizmente, a prática de Analytics não podia ser mais oposta. Na maior parte das ferramentas tradicionais utilizadas em processos de ETL, a separação de ambientes é um conceito "não-existente". De fato, profissionais de Analytics e BI estão acostumados a alterar e editar processos de dados diretamente no ambiente final, torcendo para que nada de errado aconteça. É preciso mudar isso imediatamente!
 
## Entrega contínua (CI/CD)

O próximo passo da boa prática de desenvolvimento é o uso de ferramentas de automação para facilitar o trabalho colaborativo e a integração de código entre ambientes. Essas ferramentas em geral atacam dois grandes problemas conhecidos por sua sigla **CI/CD**:

- Integração Contínua (do inglês, *continuous integration*)
- Entrega Contínua (do inglês, *continuous delivery*)

```{figure} ../../../assets/img/ci_cd_pipeline_meme.jpg
:name: ci_cd
:height: 450px

Na prática a realidade é outra. Fonte: [devrants](https://devrant.com/rants/4577020/ci-cd-pipelines-in-real-life))
```


 <!-- Monitoramento e Qualidade -->