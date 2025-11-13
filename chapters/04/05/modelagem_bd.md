# 4.5 Modelagem de Banco de Dados

Modelar dados é transformar processos de negócio em estruturas que um banco consegue guardar e consultar com eficiência. Cada decisão — quais entidades entram, como nomeamos atributos, que chaves usamos — influencia diretamente a qualidade das análises que virão. Mesmo quando o Engenheiro de Analytics não assina a modelagem operacional de um banco transacional (ERP's, CRM's, etc), entender esse desenho facilita muito a ingestão, o planejamento da modelagem analítica e a transformação.

## Do negócio para o banco

Um bom modelo de dados responde três perguntas simples:

1. **Quais entidades precisamos representar?** Clientes, pedidos, produtos, contratos…
2. **Como elas se relacionam?** Um cliente gera vários pedidos, um pedido agrupa vários itens etc.
3. **Quais atributos descrevem cada entidade?** Nome, status, data de criação, métricas financeiras e por aí vai.

Essas respostas viram um vocabulário comum entre negócio e tecnologia. É com ele que projetamos o banco e, mais adiante, os modelos analíticos.

## Diagramas Entidade-Relacionamento (ER)

Os bancos relacionais usados em cenários OLTP costumam nascer de um diagrama Entidade-Relacionamento. Ele mostra entidades, atributos e a cardinalidade dos vínculos (um-para-um, um-para-muitos, muitos-para-muitos). Cada “pé de galinha” indica quantas ocorrências de uma entidade se conectam à outra, tornando o desenho um guia visual do que será criado no banco.

```{figure} ../../../assets/img/erd1.png
:name: erd1

Exemplo de um diagrama de Entidade-Relacionamento (ERD).
```

```{figure} ../../../assets/img/erd_2.png
:name: erd2

Detalhe de como entidades, atributos e cardinalidades aparecem no ERD.
```

Para quem vem de planilhas, o ERD pode parecer distante. A diferença está no nível de normalização exigido pelos sistemas transacionais: ele reduz redundâncias e garante integridade ao escrever ou atualizar registros, mesmo que deixe as análises menos diretas.

## Onde o Analytics Engineer entra

- **Decifrando a fonte**: o ERD funciona como mapa para descobrir onde estão fatos e dimensões brutas.
- **Avaliando esforço**: muita normalização sinaliza mais `JOINs` e mais etapas de transformação do nosso lado.
- **Construindo contratos**: ao mapear entidades e cardinalidades, alinhamos SLAs, regras de negócio e expectativas com os times produtores.

## Conectando com o próximo passo

Nos próximos tópicos veremos como a normalização molda esses modelos e como traduzir um desenho transacional para um formato analítico, normalmente via modelo dimensional.
