# 7.2 Boas práticas de desenvolvimento

> Os primeiros 90% de código levam 90% do tempo de desenvolvimento. O restante 10% do código representa o restante 90% do desenvolvimento
> [Tom Cargill, Bell Labs](https://en.wikipedia.org/wiki/Ninety%E2%80%93ninety_rule)

A “regra 90/90” virou meme porque projetos raramente terminam no prazo estimado. Subestimamos a última milha — integração, testes, correções, documentação e implantação — e ignoramos dependências, handoffs e riscos de produção. Em analytics, isso é amplificado por dados variáveis, múltiplos stakeholders e impacto direto em métricas do negócio. As seções a seguir mostram práticas que reduzem essa deriva de prazo: debugging eficaz, entregas pequenas e frequentes, separação de ambientes e automação via CI/CD.

É aqui que DevOps (e seu “irmão” DataOps) entram: não basta escrever código; é preciso estabelecer um processo que favoreça qualidade, colaboração e entregas previsíveis. Versionamento, revisão por PR, testes automatizados, ambientes isolados e pipelines de CI/CD formam a base desse processo.

## Debugging

Entender como testar e depurar (*debug*) códigos é essencial para um bom desenvolvimento. Um desenvolvedor sênior é definido muito mais pelo quanto "ele já errou" (e os caminhos para não errar novamente) do que pelo quanto ele "sabe". Em times de desenvolvimento, é comum que um profissional experiente consiga isolar rapidamente um erro que um desenvolvedor júnior perdeu uma semana inteira de trabalho resolvendo.


```{figure} ../../../assets/img/debugging.png
:name: debugging
:height: 450px

*Debugging* é uma arte. Fonte: [monkeyuser.com](http://monkeyuser.com)
```

## Entregas rápidas

Priorizar entregas rápidas continuamente, em vez de projetos grandes e demorados. Essa filosofia é a essência do [desenvolvimento ágil](https://pt.wikipedia.org/wiki/Desenvolvimento_%C3%A1gil_de_software) e das boas práticas modernas de desenvolvimento. Em projetos ágeis de software, uma entrega pode ser uma pequena parte de um site ou de uma aplicação em algumas semanas ao invés de uma aplicação completa em vários meses.

## Separação de ambientes

> Nunca, jamais, em hipótese alguma, teste seu código em produção. Isso não é só um bom conselho técnico; é um conselho de amigo.

Pode parecer óbvio, mas assim como nós não podemos trocar as rodas com um carro em movimento, também não podemos testar ou desenvolver novas funcionalidades de um sistema diretamente no ambiente utilizado pelo cliente final. A prática de separação entre ambiente de desenvolvimento e ambiente de produção é uma condição necessária de qualquer projeto de desenvolvimento de software moderno.

Boas práticas para ambientes
- `dev`: desenvolvimento local/isolado; dados amostrados ou mascarados; permissões amplas, riscos controlados.
- `staging`/`qa`: espelho de produção para validar integrações e performance; acesso controlado.
- `prod`: mínimo de permissões; mudanças apenas via pipeline; monitoramento e alertas.
- Imponha “read-only” para BI diretamente em `prod` e separe papéis de escrita/leitura no warehouse.

Infelizmente, a prática de Analytics não podia ser mais oposta. Na maior parte das ferramentas tradicionais utilizadas em processos de ETL, a separação de ambientes é um conceito "não-existente". De fato, profissionais de Analytics e BI estão acostumados a alterar e editar processos de dados diretamente no ambiente final, torcendo para que nada dê errado. É preciso mudar isso imediatamente!
 
## Entrega contínua (CI/CD)

O próximo passo da boa prática de desenvolvimento é o uso de ferramentas de automação para facilitar o trabalho colaborativo e a integração de código entre ambientes. Essas ferramentas, em geral, atacam dois grandes problemas conhecidos por sua sigla **CI/CD**:

- Integração Contínua (do inglês, *continuous integration*)
- Entrega Contínua (do inglês, *continuous delivery*)

```{figure} ../../../assets/img/ci_cd_pipeline_meme.jpg
:name: ci_cd
:height: 450px

Na prática a realidade é outra. Fonte: [devrants](https://devrant.com/rants/4577020/ci-cd-pipelines-in-real-life)
```
