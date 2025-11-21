(banco_dados)=
# Capítulo 4 - Bancos de dados

Quando falamos sobre analytics engineering, tudo começa com a forma como os dados são armazenados. Um sistema de gerenciamento de banco de dados (SGBD) é o software que possibilita criar, atualizar, consultar e proteger informações que vivem em tabelas ou estruturas equivalentes. É nele que o Engenheiro de Analytics encontra a matéria-prima para construir pipelines, métricas e produtos de dados.

Sob o capô, um SGBD coordena três grandes blocos:

1. **Linguagem de consulta** — interface pela qual humanos ou aplicações solicitam informações (geralmente, SQL - Structured Query Language).
2. **Motor de processamento** — responsável por interpretar a consulta, montar o plano de execução e otimizar recursos.
3. **Camada de armazenamento** — controla como os dados ficam gravados fisicamente em disco ou memória, aplicando índices, compressores e políticas de acesso.

```{figure} ../../assets/img/04_00_banco_de_dados.png
:name: arquitetura_sgbd

Componentes básicos de um SGBD.
```

Entender como essas peças se conectam ajuda a diagnosticar gargalos de performance, decidir entre tecnologias relacionais ou não relacionais e, principalmente, modelar dados de forma que sirvam ao negócio. Ao longo do capítulo vamos percorrer os principais tipos de bancos de dados, os modelos de dados mais comuns e os cuidados necessários para traduzir bases operacionais em fundações analíticas sólidas.

[^mattoso]: Marta Mattoso. Introdução a Bancos de Dados. Disponível em: https://www.cos.ufrj.br/~marta/BdRel.pdf.
