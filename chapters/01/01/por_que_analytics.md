# 1.1 Por quê Engenharia de Analytics?

Nos últimos anos, vimos uma revolução no acesso a formas avançadas de analytics, como ferramentas de self-service, modelos de machine learning, deep learning, big data etc. Saem de cena os relatórios em PowerPoint e Excel e entram os notebooks criados em Python e R como a onda do momento. Empresas de todos os portes lutam para contratar cientistas de dados para “revolucionar seus negócios”. No entanto, os resultados práticos dos projetos de analytics  ou ciência de dados ainda parecem muito aquém do inicialmente esperado pelos gestores. Mas por quê?

Na nossa opinião, há alguns motivos para isso, mas já é possível adiantar que não é por falta de ferramenta. Pelo contrário. Provavelmente, o maior problema nos projetos de dados é a necessidade de profissionais e processos inteiramente novos para a maioria das organizações e que não são formados em um curso universitário  tradicional ( pelo menos por enquanto ). 

Na verdade, as equipes de analytics modernas são compostas por uma mistura de profissionais de áreas e competências distintas: TI, negócios, engenharias, ciências etc. A grande maioria nunca teve um treinamento formal na área, mas deriva seu conhecimento da prática, de blogs, competições no Kaggle ou ainda de centenas de cursos online de ciência de dados e analytics que proliferaram nos últimos anos.

Embora importante para suprir uma demanda sempre crescente de profissionais de dados, a falta de uma visão holística, geralmente obtida em um curso formal, somada a uma combinação nova de conhecimento de negócio, estatística e programação, gerou uma grande “dívida técnica” (do inglês, *technical debt*)  na área de analytics. O que isso significa é que a grande maioria dos cientistas de dados tem pouco ou nenhum conhecimento da complexidade por trás de sistemas de analytics modernos em produção [^label1]. 

Na prática, é comum que os modelos e códigos que funcionavam tão bem no laptop do cientista de dados tenham que ser reescritos do zero pelos engenheiros de dados responsáveis por manter um modelo ou transformação de dados em produção. Além disso, ao trabalhar em projetos reais fora do mundo ideal de cursos e competições de machine learning, nós rapidamente descobrimos que muitas ferramentas e muitos conceitos que aprendemos não são adequados para o mundo real das boas práticas de engenharia de software, como versionamento, testes, CI/CD etc. 

Em resumo: 

*  o ensino atual da ciência de dados ainda não consegue ultrapassar a barreira da experimentação pessoal para o desenvolvimento profissional;
* e as profissões de dados atuais acabaram se especializando em partes específicas dos projetos de analytics e há uma grande dificuldade em unir essas partes de forma coerente e eficiente.


[^label1]: Em desenvolvimento de softwares, **ambiente produção (ou prod)** é o ambiente em que o sistema é utilizado pelo usuário final (por exemplo: website que está no ar) em contraponto ao **ambiente de desenvolvimento (ou dev)**.
