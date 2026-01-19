# 16.4 Adicionando testes e documentação

Testes e documentação vivem lado a lado nos arquivos `schema.yml`. Pense neles como **contratos** do pipeline: eles registram as premissas do dado (o que deve ser verdadeiro) e ajudam a prevenir que problemas na ingestão ou em transformações upstream se propaguem para as camadas de consumo.

Os testes declarados em `schema.yml` são chamados de **testes genéricos**: o mesmo “molde” de teste pode ser aplicado a inúmeras colunas e modelos. Além deles, o dbt também suporta **testes singulares** (que veremos mais adiante) e **testes unitários** (*unit tests*), que não abordaremos neste livro.

Uma boa prática é adicionar testes e documentação **conforme você constrói** novas fontes e modelos, reforçando as bases antes de criar dependências. Na seção anterior, criamos os modelos de forma mais direta por didática; no dia a dia, o ideal é ir incrementando testes e documentação junto com cada mudança.

Nesta seção, veremos os testes genéricos que o dbt oferece “de fábrica”, boas práticas de *testing* e como documentar seus assets de forma eficiente.

## Testes genéricos

O dbt vem com quatro testes genéricos principais:

- `unique`: garante que uma coluna não tenha valores duplicados (muito comum para chaves naturais ou chaves de dimensão).
- `not_null`: garante que uma coluna não tenha valores nulos (essencial para chaves primárias, e útil para colunas obrigatórias).
- `accepted_values`: garante que os valores de uma coluna pertençam a um conjunto permitido (por exemplo, `status in ('open', 'closed')`).
- `relationships`: garante integridade referencial entre uma FK e uma PK (por exemplo, `orders.customer_id` deve existir em `customers.id`).

Você pode aplicar esses testes tanto em **sources** quanto em **models** (e, em geral, por coluna). A recomendação é testar **o mais perto possível da fonte**, porque:

- O custo de corrigir problemas é menor (o erro aparece cedo).
- Você evita “poluir” camadas downstream com dados inválidos.
- A linhagem fica mais confiável: se o dado cru está errado, o pipeline falha antes de gerar tabelas consumidas.

Conforme o projeto cresce, é comum ampliar o repertório de testes com:

- **Pacotes** (por exemplo, `dbt_utils` e `dbt_expectations`), que trazem diversos outros testes prontos para padrões comuns.
- **Testes genéricos customizados**, quando sua organização tem regras recorrentes (por exemplo: “datas não podem estar no futuro”, “chave de negócio deve ser única por dia”).

Boas práticas que valem a pena adotar desde cedo:

- Comece pelo “básico bem feito”: `unique` + `not_null` nas chaves e `relationships` onde houver FK.
- Use `accepted_values` para colunas categóricas e flags (principalmente quando entram via ingestão de sistemas).
- Prefira poucos testes críticos e bem posicionados do que muitos testes redundantes que só aumentam tempo/custo.
- Execute testes sempre que fizer mudanças relevantes (em dev) e automatize em CI/CD para evitar regressões.

Para tabelas **source**, o mínimo recomendado é testar se a chave primária é **única** e **não nula**. Isso reforça uma premissa fundamental: nossos dados brutos não podem ter duplicidades na chave que identifica a entidade. No exemplo abaixo, expandimos o arquivo `models/staging/erp/_source_erp.yml` com documentação (via `description`) e adicionamos testes `unique` e `not_null` nas colunas `id` de cada tabela:
```yaml
version: 2

sources:
  - name: erp
    description: Northwind sales system.
    schema: erp_northwind
    database: raw
    tables:
      - name: categories
        description: Contains product category definitions such as name and description.
        columns:
          - name: id
            description: Unique identifier for each category.
            data_tests:
              - unique
              - not_null
          - name: categoryname
            description: Descriptive name of the category (e.g. Beverages).
          - name: description
            description: Additional notes about the category.
          - name: picture
            description: Binary image associated with the category.

      - name: products
        description: Contains information about all products sold, including pricing and inventory levels.
        columns:
          - name: id
            description: Unique identifier for each product.
            data_tests:
              - unique
              - not_null
          - name: productname
            description: Name of the product shown to customers.
          - name: supplierid
            description: Foreign key referencing the supplier that provides the product.
          - name: categoryid
            description: Foreign key referencing the product category.
          - name: quantityperunit
            description: Text describing the packaging (e.g. 24 - 12 oz bottles).
          - name: unitprice
            description: List price charged per unit.
          - name: unitsinstock
            description: Units currently on hand in inventory.
          - name: unitsonorder
            description: Units that are on purchase orders but not yet received.
          - name: reorderlevel
            description: Quantity threshold that triggers a replenishment order.
          - name: discontinued
            description: Flag indicating whether the product is no longer sold.

      - name: suppliers
        description: Contains information about product suppliers such as company name and location.
        columns:
          - name: id
            description: Unique identifier for each supplier.
            data_tests:
              - unique
              - not_null
          - name: companyname
            description: Official name of the supplier company.
          - name: contactname
            description: Primary contact person at the supplier.
          - name: contacttitle
            description: Job title of the contact person.
          - name: address
            description: Mailing street address of the supplier.
          - name: city
            description: City where the supplier is located.
          - name: region
            description: Region or state where the supplier is located.
          - name: postalcode
            description: Postal code for the supplier address.
          - name: country
            description: Country where the supplier operates.
          - name: phone
            description: Primary phone number for the supplier.
          - name: fax
            description: Fax number for the supplier.
          - name: homepage
            description: Web site or additional notes about the supplier.
```
Com isso, nossas tabelas fonte passam a ter testes que rodam logo no início do fluxo. Se, por exemplo, o pipeline de ingestão duplicar registros em um dia qualquer, os testes `unique`/`not_null` falharão e impedirão que dados inválidos avancem para *staging* (e para todas as camadas downstream).

Repare também que adicionamos documentação para as colunas. Em geral, quanto melhor documentado o projeto, maior a qualidade e a autonomia de quem consome os dados. Ao mesmo tempo, existe um *trade-off* com velocidade: em muitos times, começa-se documentando as colunas mais importantes (as que realmente entram em análises e métricas) e aprofunda-se com o tempo.

No dbt, essa documentação é compilada em artefatos e pode ser visualizada via **dbt docs** (que veremos mais adiante) e, dependendo do plano, também via catálogo do dbt Platform.

## Padronização da documentação (`docs blocks`)

À medida que o projeto cresce, algumas descrições se repetem (por exemplo, “chave primária”, “data de criação”, “timestamp de atualização”). Para evitar duplicação e manter consistência, o dbt permite usar **docs blocks**: pequenos trechos reutilizáveis de documentação, escritos em arquivos `.md`, que você referencia nos `schema.yml`.

Um exemplo simples é padronizar a descrição de colunas `id`. Você pode criar um bloco de documentação com algo como “Chave primária da tabela” e reutilizá-lo em várias tabelas/modelos, sem reescrever o texto em cada lugar. Isso acelera a documentação, reduz inconsistências e deixa a manutenção mais fácil.

Finalize a documentação e os testes realizando um novo commit para essa parte do trabalho. Agora é um bom momento para fazer a mesclagem desse código com a branch `main`.

Passo a passo para criar um Pull Request no GitHub (até completar com *merge commit*):

1. No GitHub, abra o repositório e clique em **Compare & pull request** (ou vá em **Pull requests** → **New pull request**).
2. Selecione **base** = `main` e **compare** = sua branch.
4. Preencha título/descrição e clique em **Create pull request**.
5. Clique em **Merge pull request** e escolha **Create a merge commit**.
6. Confirme em **Confirm merge** e, se quiser, apague a branch no GitHub.
7. Volte no dbt e troque para a branch `main`. O dbt automaticamente pedirá para você atualizar a sua `main` já que a do repositório foi alterada. Após o `sync` o dbt já recomenda nomente para criar uma nova branch de desenvolvimento.

Você pode pular o passo 1 e 2 se pelo dbt você selcionar "Create pull request" depois do commit que foi feito para salvar suas alterações na branch que desenvolvemos a dim_produtos.

Para o decorrer do projeto, você pode fazer o restante do trabalho em uma única branch e repetir esse mesmo processo de merge para a `main` quando concluir todo o projeto e ter o código de produção pronto para o deployment.
