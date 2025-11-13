(dimensoes)=
# Capítulo 10 - Dimensões

Dimensões são informações de negócio que contextualizam os fatos: cidade, produto, cliente, datas, canais, entre outras. Elas são as colunas que usamos para filtrar, agrupar e rotular análises. Uma mesma dimensão pode se relacionar com várias tabelas fato — a ligação acontece por chaves (surrogate/business keys) que garantem consistência e performance.

No Modern Data Stack, dimensões devem ser conformadas: compartilhadas entre data marts para que métricas batam em toda a empresa. Exemplo: a dimensão de Produto única serve tanto a Vendas quanto a Estoque, com o mesmo código de produto, nomes e hierarquias.

O que veremos neste capítulo
- Tipos de chaves para dimensões e fatos (natural, surrogate, estrangeira) e como escolher.
- Dimensões de Alteração Lenta (SCD): quando e como historizar.
- Dimensões Degeneradas e Junk: quando simplificam e quando atrapalham.
- Dimensões “role‑playing” (ex.: Data do Pedido vs. Data de Entrega): reutilizando uma mesma dimensão em papéis distintos.

Antes, vamos alinhar a terminologia de chaves — base para todos os padrões que vêm na sequência.
