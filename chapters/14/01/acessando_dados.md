# 14.1 Acessando dados

De nada adianta montar um Modern Data Stack impecável se não conseguimos sair das fontes transacionais. Antes de falar em conectores, pense em um checklist de acesso: onde os dados estão, quem libera credenciais, qual o nível de segurança exigido e quais limites técnicos existem.

Elementos que variam de uma fonte para outra:

- **Vendor e tipo de banco**: SQL Server, MySQL, PostgreSQL, Oracle, DynamoDB, Mongo, etc.
- **Onde está hospedado**: servidor local, VM na nuvem, ambiente gerenciado, dispositivos embarcados.
- **Formato e protocolo**: conexões JDBC/ODBC, dumps periódicos, APIs REST/GraphQL, streams de eventos, arquivos em buckets.
- **Nível de acesso**: somente leitura, schemas específicos, necessidade de VPN, autenticação multifator.

O caminho clássico para bancos relacionais é via JDBC/ODBC, onde enviamos SQL diretamente (como praticado no Capítulo 5). Já em aplicações SaaS, é comum depender de APIs REST com limites de paginação, _rate limits_ e filtros restritos — isso exige planejamento sobre como paginar, quais campos estão disponíveis e qual a cadência possível.

Ferramentas de ingestão modernas abstraem boa parte dessas diferenças, mas o Analytics Engineer continua responsável por coordenar acessos, validar credenciais e definir SLAs com as equipes de origem. Reserve tempo para testar cada conexão logo no início do projeto; descobrir um bloqueio de firewall na véspera da entrega é o tipo de surpresa que queremos evitar.

```{admonition} Teste cedo, documente sempre
Faça uma conexão de prova assim que receber credenciais, registre dependências (VPNs, IPs liberados, tokens) e mantenha esse inventário junto ao repositório do projeto.
```
