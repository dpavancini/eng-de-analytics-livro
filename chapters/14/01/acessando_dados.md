# 14.1 Acessando dados

De nada adianta construir um *Modern Data Stack* se não conseguimos acessar os dados armazenadas nas fontes tranasacionais, APIs, planilhas etc. Cada fonte de dados terá um ou mais formatos de conexão, que podem variar em:

- **Vendor do Banco de Dados**: SQL Server, MySQL, PostgreSQL, Oracle, etc.
- **Tipo de Banco de Dados**: Relacional, NoSQL, etc
- **Servidor**: Desktop Simples, Servidor Local, Cloud, etc.
- **Tipos de Conexão**: JDBC, ODBC, API, Dump do Banco etc. 
- **Nível de acesso**: Somente Leitura, Administrador, Tabelas Específicas, etc

A forma mais comum de conexão a um banco de dados é através de uma conexão direta via protocolo *JDBC* ou *ODBC*. Neste tipo de conexão nós podemos enviar consultas SQL diretamente para o banco de dados como vimos no Capítulo 5. Em outros casos, pode ser necessário utilizar uma API REST desenvolvida pela aplicação que estamos consultando. Nestes casos, a disponibilidade dos dados será limitada pelo que está disponível na API.

```{admonition} Considere testar as conexões de dados como o primeiro passo de um projeto, para evitar surpresas no futuro!
```



