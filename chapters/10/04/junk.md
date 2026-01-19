# 10.4 Dimensões Junk

Quando nos deparamos com dimensões de baixa cardinalidade e pouco reutilizadas isoladamente, podemos otimizar o DW usando dimensões Junk: uma dimensão que combina múltiplos atributos “soltos” e pouco relacionados entre si (ex.: cor, tamanho, flag de brinde). Isso reduz o número de joins e evita criar várias dimensões minúsculas.

| SK_COR_TAM | COR      | TAMANHO |
|------------|----------|---------|
| 1          | Azul     | PP      |
| 2          | Vermelho | PP      |
| 3          | Amarelo  | PP      |
| (...)      | (...)    | (...)   |

```{admonition} Boas práticas
- Verifique a cardinalidade esperada: combine apenas atributos que não explodirão em combinações (ex.: 4 cores x 5 tamanhos = 20 linhas é ótimo; 50 x 100 pode se tornar inviável).
- Padronize mapeamentos e valores (domínios controlados) para manter a dimensão estável.
- Gere uma SK para cada combinação e exponha os atributos originais na dimensão para fácil leitura.
```
