(bigquery)=
# Capítulo 12 -  Configurando um Data Warehouse com Big Query

No último capítulo aprendemos sobre a teoria por trás da modelagem dimensional de  Data Warehouses. Para aprendermos a fazer isso na prática, precisamos criar o nosso próprio DW. Embora existam muitas possibilidades de tecnologias e empresas nessa área,  os DWs na nuvem mais utilizados são o [Google BigQuery](https://cloud.google.com/bigquery?hl=pt-br), [Amazon Redshift](https://aws.amazon.com/pt/redshift/) e [Azure Synapse](https://docs.microsoft.com/pt-br/azure/synapse-analytics).

```{admonition} Atenção
Você precisará criar uma conta no Google Cloud Platform para essa parte do tutorial e configurar um cartão de crédito. Mas não se preocupe, há uma camada gratuita de serviços grande e nada será cobrado no seu cartão. Se preferir pode cancelar a conta após o tutorial.

Se você tiver interesse (e conhecimento) de simular um DW *on-premises*, pode configurar um banco de dados PostgreSQL em sua máquina local.
```

Para criar uma instância do Google Big Query é muito fácil. Precisamos apenas acessar o “Big Query” pelo menu lateral ou pela procura do GCP e clicar em “Ativar”.  Pronto! já temos nosso primeiro DW no Big Query configurado. O pŕoximo passo é criarmos nossa credencial para poder utilizar em nossas ferramentas do {ref}`MDS<MDS>` como o [Hevo](https://hevodata.com/) e [dbt](https://www.getdbt.com/).


```{figure} ../../assets/img/ativando_bq.png
:name: ativando_bq

Ativando o BigQuery no GCP
```

Para criar as credenciais vamos até a seção de Credenciais no “Menu API e Serviços”.

```{figure} ../../assets/img/credenciais_bq.png
:name: credenciais_bq

Acessando o menu de credenciais
```

Devemos clicar no botão “Criar Credenciais” e selecionar a última opção:

```{figure} ../../assets/img/criar_credenciais_bq.png
:name: criar_credenciais_bq

Criar credenciais no BigQuery
```

Vamos criar uma conta de serviço para API BigQuery API. Podemos selecionar o papel “Administrador de recursos do BigQuery” para não termos problemas com permissões (em projetos reais esse papel deve ser restrito à pessoas-chave no projeto).  Colocamos um nome qualquer para a conta de serviço e o tipo JSON. Uma chave privada será criada e automaticamente baixada para seu computador. Guarde-a pois ela será utilizada futuramente para acesso ao BigQuery.

```{figure} ../../assets/img/criar_credenciais_bq_2.png
:name: criar_credenciais_bq_2

Criar credenciais no BigQuery
```

```{figure} ../../assets/img/criar_credenciais_bq_3.png
:name: criar_credenciais_bq_3

Selecione a opçao "Administrador de recursos do BigQuery"
```

```{figure} ../../assets/img/criar_credenciais_bq_4.png
:name: criar_credenciais_bq_4

Lembre-se de armazenar as credenciais com segurança.
```

Pronto! Você já tem uma instância do BigQuery ativada em sua conta e pode começar a armazenar e processar dados em grande escala em um *data warehouse* moderno na nuvem. Para a maioria dos casos práticos, o BigQuery é uma solução gerenciada que atende facilmente aos requisitos de projetos de *data warehouse*. Em alguns casos, especialmente com grandes volumes de dados, ele pode se tornar caro quando comparado à outras soluções de mercado. Então é bom sempre estar atento com os custos dos seus serviços na nuvem!