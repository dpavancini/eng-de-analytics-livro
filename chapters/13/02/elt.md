(elt)=
# 13.2 O ELT

Embora existam algumas diferenças de arquitetura e ferramentas utilizadas nos processos de ELT modernos, o quadro geral é o mesmo: na etapa de Extração, ferramentas especializadas permitem “mover” dados de centenas de fontes como ERPs, CRMs, bancos de dados, REST APIs etc. diretamente para um Data Warehouse na nuvem ou on-premises com um baixo custo técnico. Desta forma, a etapa de *Load* é feita simultaneamente à extração. Dentro do DW, a transformação de dados é feita através de scripts SQL ou ferramentas visuais que 

No diagrama abaixo vemos como a etapa de ELT se destaca na arquitetura geral do {ref}`MDS<MDS>`:


```{figure} ../../../assets/img/elt_fluxo.png
:name: elt_fluxo

Exemplo do fluxo de ELT
```

Na prática, o processo de ELT é onde a maior parte do trabalho é realizado em um projeto de Analytics. Em projetos de menor complexidade, um Engenheiro de Analytics pode ser responsável pelo fluxo completo: desde a coleta de dados até a entrega final. Em projetos mais críticos, é comum que essa responsabilidade seja dividida entre os Engenheiros de Analytics e Engenheiros de Dados.

```{admonition} Pense no ELT como um processo contínuo, sem um fim claro. Os requisitos de analytics são mutáveis, variam com a necessidade do negócio!
```

Nas próximas seções vamos apresentar o processo de ELT passo a passo, contextualizando com as etapas apresentadas em outras seções do livro. Esses processos serão detalhados nos próximos capítulos, incluindo exemplos práticos de aplicação. Vamos lá?
