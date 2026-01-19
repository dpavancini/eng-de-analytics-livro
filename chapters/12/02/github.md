(github)=
# Capítulo 12.2 - Criando uma conta GitHub com o repositório base da Northwind

Você usará um repositório do GitHub na Seção 12.3 para conectar o dbt às seeds e modelos. Siga os passos abaixo para sair desta seção já com tudo pronto.

1. **Crie (ou confirme) sua conta**  
   - Acesse [github.com](https://github.com) e cadastre-se, caso ainda não possua uma conta ativa.  
   - Faça login para confirmar que tudo está funcionando.

2. **Faça o fork do repositório Northwind**  
   - Abra o repositório base: [github.com/engdeanalytics/northwind](https://github.com/engdeanalytics/northwind).  
   - Clique em **Fork** no canto superior direito.  
   - Confirme que o fork será criado na sua conta pessoal. Você pode manter o nome `northwind` ou renomear.  
   - Finalize em **Create fork**.  
   - Guarde o endereço do seu repositório, que seguirá o formato `https://github.com/<seu-usuario>/<nome-repo>`. Ele será usado na Seção 12.3.

3. **Conheça a branch de apoio**  
   - O repositório original contém a branch `recursos` com os códigos exibidos nas aulas: [github.com/engdeanalytics/northwind/tree/recursos](https://github.com/engdeanalytics/northwind/tree/recursos).  
   - Use-a como referência sempre que precisar comparar com a solução do livro.

4. **(Opcional) Clone seu fork localmente**  
   - Execute `git clone https://github.com/<seu-usuario>/<nome-repo>.git` na sua máquina para editar arquivos fora do dbt Cloud, se desejar.  
   - Configure o `git remote upstream` apontando para `https://github.com/engdeanalytics/northwind.git` para facilitar futuras sincronizações.

Concluindo o passo a passo acima, você terá a conta, o fork (e opcionalmente o clone) prontos para integrar com o dbt na Seção 12.3.
