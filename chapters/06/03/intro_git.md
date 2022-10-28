(git)=
# 6.3 Introdução ao controle de Versão e Git

Nesta seção falaremos do controle de versão, um dos processos mais importantes no desenvolvimento de softwares e também na Engenharia de Analytics. Também falaremos da ferramenta mais popular de controle de versão chamada git. Vamos lá?

## Por quê precisamos de um controle de versão?

Em primeiro lugar você deve estar se perguntando, afinal o que é "controle de versão"? Eu realmente preciso aprender isso? A resposta começa identificando que você provavelmente já possui seu próprio sistema de controle de versão "caseiro":

```{figure} ../../../assets/img/excel_copia.png
:name: excel_copia

Quem nunca sofreu com isso? Fonte: [dropbox.fix](https://dropboxfix.wordpress.com/)
```

Ou seja, o controle de versão é um processo que registra alterações em um arquivo ou conjunto de arquivos para que você possa lembrar ou retomar versões específicas mais tarde. Infelizmente, a maior parte das aplicações não possuem um controle de versão bem desenvolvido ou que permita ainda o trabalho colaborativo como o necessário em projetos complexos de software ou dados. 

```{admonition} Curiosidade
Quem já experimentou a experiência de "Cópia com conflito" no Excel sabe o que é um sistema de controle de versão que não facilita o desenvolvimento colaborativo.
```

Um sistema de Controle de Versão moderno precisa atender a alguns requisitos:
- Permitir diferentes "versões" de uma arquivo ou conjunto de arquivos
- Ter a capacidade de retomar versões passadas (ou futuras) de um arquivo ("viagem no tempo")
- Conseguir verificar possíveis conflitos entre arquivos e como resolvê-los
- Ver quem modificou pela última vez um arquivo ou parte de um arquivo
- Permitir sincronizar arquivos ou conjunto de arquivos entre diferentes repositórios ou computadores
- Garantir que arquivos sejam recuperados se apagados acidentalmente sem perdas

Ao longo do tempo diferentes sistemas de controle de versão foram desenvolvidos para atender a estes requisitos. O mais popular deles é o Git, desenvolvido para facilitar a manutenção do código-fonte (*kernel*) do Linux por Linus Torvaldis (o criador do Linux) e hoje utilizado por milhões de desenvolvedores mundo afora.


## O que é o git?

O Git é um sistema de controle de versão distribuído que pode ser usado em qualquer tipo de arquivo, mas tem seu uso principal no desenvolvimento de software.

O  Git é organizado em **repositórios** que controlam a versão de todos os arquivos (ou parte deles) em um diretório (ou pasta) e seus subdiretórios. Ao iniciar um repositório git em um diretório, nós adicionamos a este respositório a capacidade de registrar localmente todas as alterações realizadas em seus arquivos e também a capacidade de "sincronizar" esse diretório com ambientes remotos.


```{admonition} Você sabia?
A maior plataforma de hospedagem de Git, o [Github](https://github.com/about), é usado por mais de 83 milhõres de usuários ativos e possui mais de 200 milhões de projetos hospedados. Em 2018 ela foi adquirida pela Microsoft por U$7,5 bilhões.
```

## Breve História do Git

O Git foi desenvolvido para substituir um sistema Controle de Versão proprietário utilizado pelo time de desenvolvimento do *kernel* Linux até então chamado BitKeeper. Por ser um sistema de código-aberto, a decisão da BitKeeper em cobrar pelo seu serviço tornou seu uso inviável por Linus e seu time. Assim, o Git foi desenvolvido com algumas [metas em mente](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Uma-Breve-Hist%C3%B3ria-do-Git):

- Velocidade
- Projeto simples
- Forte suporte para desenvolvimento não-linear (milhares de ramos paralelos)
- Completamente distribuído
- Capaz de lidar com projetos grandes como o núcleo o Linux com eficiência (velocidade e tamanho dos dados)

Em seu primeiro *commit* em 7 de Abril de 2005, Linus Torvaldis [escreveu](https://initialcommit.com/blog/How-Did-Git-Get-Its-Name):

```
Initial revision of "git", the information manager from hell
```

Ele também adicionou um arquivo `README` com seu tom sarcástico característico:

```
GIT - the stupid content tracker

"git" can mean anything, depending on your mood.

 - random three-letter combination that is pronounceable, and not 
   actually used by any common UNIX command.  The fact that it is a
   mispronunciation of "get" may or may not be relevant.
 - stupid. contemptible and despicable. simple. Take your pick from the 
   dictionary of slang.
 - "global information tracker": you're in a good mood, and it actually
   works for you. Angels sing, and a light suddenly fills the room. 
 - "goddamn idiotic truckload of sh*t": when it breaks

This is a stupid (but extremely fast) directory content manager.  It  
doesn't do a whole lot, but what it _does_ do is track directory
contents efficiently.
```

## Como o Git funciona

```{admonition} Nota
Os comandos e termos do Git são escritos na língua inglesa. Vamos tentar traduzir os termos para facilitar o entendimento, mas deixando os termos originais em inglês devidamente registrados.
```
O Git armazena a história completa dos arquivos no repositório utilizando um diretório oculto `.git` situado no próprio diretório de trabalho e que é iniciado quando começamos um projeto git (`git init`).

Embora pareça "custoso", armazenar a história completa de todos os arquivos em um diretório não chega a ser um grande problema para o Git. Isso porque ele utiliza algumas funções inteligentes (como o *hash*) para armazenar apenas arquivos que foram modificados e suas diferenças (chamada de *diff*). 

Em resumo, cada vez que realizamos um `commit` no Git, nós tiramos uma foto do estado de todos os arquivos em nosso repositório naquele momento. É como se pudéssemos salvar não só o arquivo que estamos trabalhando (como faríamos usando o "Salvar" de uma planilha ou arquivo qualquer) mas o próprio diretório em que esta planilha está e o estado de todos os **arquivos simultaneamente**. 

Por exemplo, ao escrever este livro eu posso ter iniciado escrevendo o Capítulo 1 através de um arquivo texto um formato chamado `markdown` (equivalente a um arquivo docx do MS Word). Na primeira versão do Livro, digo ao Git para "congelar" a versão V1  que contém apenas o arquivo `Cap1.md`. Depois, adiciono um arquivo para o Capítulo 2 e mais uma vez salvo a versão do repositório Git. Como não fiz alterações no Capítulo 1, o Git apenas registra que esse arquivo não sofreu mudanças e salva uma imagem do arquivo `Cap2.md` em seu registro. Em seguida, adiciono algumas seções no Capítulo 1 e o Git altera a versão mais recente do arquivo `Cap1.md` para essa versão e registra que não houve alterações no `Cap2.md`. Porém, ao adicionar o Capítulo 3, equivocadamente deletamos os demais capítulos e salvamos o estado do repositório no Git. Neste caso, o Git vai fazer duas operações: registrar um novo arquivo `Cap3.md` e registrar que os outros arquivos foram excluídos da imagem mais recente do repositório. No entanto, como o Git armazena a **históra completa** dos arquivos, conseguimos prontamente restaurar os demais capítulos na Versão 5 do repositório, sem sofrer nenhuma perda no trabalho. Um ponto importante é que o nome dos arquivos não se altera, as versões apontadas entre parênteses na Figura abaixo serve apenas para indicar a versão do arquivo que o Git está apontando.

```{figure} ../../../assets/img/git_versoes.png
Versões do Git
```

Na prática, o Git permite um versionamento ainda mais flexível através do uso de `branches` ("galhos") e outras funcinalidades que veremos na sequência. Ainda assim, em geral, não será necessário entendermos a fundo o funcionamento do Git mas somente suas funções principais.

```{admonition} Importante
Se para arquivos de código o tamanho de armazenamento em geral não é importante, o mesmo não é verdade quando trabalhamos com dados em um repositório Git. Por isso, **não é recomendado armazenar dados** em um sistema de controle de versão. Devemos utilizar sistemas de armazenamento apropriados para isso como um armazenamento na nuvem.
```

## Os três Estados do Git

Antes de entrarmos na prática do Git, precisamos clarificar um ponto que ajudará no entendimento e na resolução de problemas no Git (acredite, todo desenvolvedor tem ou terá problemas com Git em algum momento).

Quando trabalhamos em um repositório Git, cada arquivo pode estar em três estados principais distintos:

- *commited* ("registrado"): significa que o arquivo está registrado na história do Git com a mesma versão que a disponível atualmente no repositório.
- *modified* (modificado): quando o arquivo foi modificado e está diferente da última versão registrada no Git. No entanto, as alterações ainda não foram preparadas (*staged*) e portanto o Git não sabe se deve ou não registrá-las em uma novo *commit*.
- *staged* (preparado): significa que você indicou ao Git que o arquivo deve ser adicionado na próxima versão (*commit*). É um passo intermediário antes de salvar uma nova imagem do diretório.

```{figure} ../../../assets/img/git_estados.png
Diretório de trabalho, área de preparo (índice), e o diretório Git. Adaptado de [fonte]([Diretório de trabalho, área de preparo, e o diretório Git. [Fonte:](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-O-B%C3%A1sico-do-Git))
```

Quando acessamos uma versão do projeto ou clonamos um repositório remoto, nosso diretório de trabalho será uma cópia do repositório. A partir do momento que modificarmos um arquivo ou adicionarmos um novo arquivo, nosso diretório de trabalho passa a estar em um estado distinto do repositório original.


