# 10.5 Dimensões “Role‑Playing”

Algumas dimensões são reutilizadas em papéis diferentes dependendo do contexto. O exemplo clássico é a dimensão de Datas: a mesma tabela serve para “Data do Pedido”, “Data de Envio”, “Data de Entrega”, etc. Em vendas, o mesmo pode valer para “Cliente Comprador” e “Cliente Destinatário”.

Por que isso importa?
- Reutilização: uma única dimensão de Datas (ou Clientes) centraliza lógica, hierarquias e atributos (feriados, calendários, territórios), garantindo consistência.
- Clareza sem duplicação: expomos papéis distintos sem copiar dados.

Como implementar
- Vistas/aliases: crie múltiplas “faces” da mesma dimensão com nomes específicos para o papel (ex.: `dim_data_pedido`, `dim_data_envio`) apontando para `dim_data`.
- Chaves: na fato, mantenha FKs distintas para cada papel (ex.: `sk_data_pedido`, `sk_data_envio`).
- Documentação: descreva os papéis e seus usos na documentação do modelo (e.g., dbt docs).
