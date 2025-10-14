# 3.4 Os 5 porquês

Criada por Sakichi Toyoda na década de 1930, a técnica dos 5 Porquês se mantém atual pela simplicidade: perguntar “por quê?” repetidas vezes até chegar à causa raiz de um problema. Em analytics engineering ela é útil para investigar quedas de métricas, falhas em pipelines ou bugs que insistem em voltar.

```{figure} ../../../assets/img/5_porques.png
:name: 5_porques

Descobrir a causa raiz do problema com os cinco porquês.
```

## Como aplicar na prática

1. **Descreva o problema com fatos**  
   Ex.: “O dashboard de receita diária está com dados desatualizados desde ontem”.

2. **Pergunte “por quê?” em sequência**  
   Cada resposta deve ser baseada em evidências. Caso não tenha dados, volte uma etapa e colete mais informação.

3. **Pare quando chegar na causa controlável**  
   Normalmente isso acontece ao redor da quinta pergunta, mas pode ser antes ou depois. O importante é identificar algo que possa ser corrigido.

### Exemplo rápido

1. Por que o dashboard está desatualizado?  
   Porque a tabela `fct_receita` não foi atualizada.
2. Por que a tabela não foi atualizada?  
   Porque o job do dbt falhou na madrugada.
3. Por que o job falhou?  
   Porque a etapa de ingestão do ERP não entregou dados novos.
4. Por que não houve ingestão?  
   Porque a API do ERP retornou erro 429 (limite de requisições).
5. Por que excedemos o limite?  
   Porque incluímos um novo domínio de negócio sem ajustar o *rate limit* com o fornecedor.

Com a causa raiz identificada, podemos agir de forma efetiva: renegociar limites de API, implementar *backoff* automático ou distribuir a ingestão ao longo do dia. Sem esse tipo de investigação, correríamos o risco de apenas reiniciar o job todas as manhãs.

### Dicas

- Documente cada pergunta e resposta no ticket ou playbook do incidente.
- Combine os 5 Porquês com dados de observabilidade (logs, métricas, alerts) para evitar suposições.

Os 5 Porquês se encaixam perfeitamente no ciclo PDCA: ajudam a aprofundar a etapa de diagnóstico antes de implementar ações corretivas.