# 7.2 Dimensão de Alteração Lenta  (SCD)


Normalmente é preferível que as dimensões sejam imutáveis, isto é, que o mesmo código 100 em uma tabela de Clientes, por exemplo, diga respeito ao cliente João Fulano. Uma das dificuldades do analytics engineer é que em geral nós não temos controle sobre as fontes de dados (ERP, por exemplo) e não é raro que haja UPDATEs nas tabelas originais que alterem as chaves naturais de uma informação. Dimensões que se alteram ao longo do tempo são chamadas de Dimensão de Alteração Lenta (do inglês, Slow Changing Dimensions) ou simplesmente SCDs. 

Para facilitar a implementação,  alguns tipos de SCDs que abrangem a grande maioria dos casos práticos já foram definidos pela indústria:

- SCD Tipo 0: não atualiza uma dimensão se o valor na tabela fonte se altera. Neste caso, o estado da tabela de dimensão fica desatualizada em relação aos dados na fonte. 

- SCD Tipo 1: atualiza uma dimensão se o valor na tabela fonte se altera sem manter o valor anterior. Neste caso, o estado da tabela de dimensão fica atualizado em relação aos dados na fonte, porém não temos mais os dados históricos:

- SCD Tipo 2: uma dimensão com SCD Tipo 2 tem registrada as alterações ocorridas na tabela fonte e os períodos onde cada valor da dimensão foi efetivo, além do valor mais atual. Esse é o tipo recomendado na maioria dos casos, pois permite criar uma visão histórica de alterações nos dados.

- SCD Híbrida: podem existir casos onde queremos adotar diferentes SCDs para diferentes atributos. Poderíamos por exemplo querer saber o histórico completo das Cidades de um cliente (SCD Tipo 2 ) mas só nos importamos com o nome mais atual desse cliente, já que mudanças de nomes seriam provavelmente para corrigir algum erro de digitação (SCD Tipo 1). Neste caso, chamamos essa tabela de dimensão de SCD Híbrida
