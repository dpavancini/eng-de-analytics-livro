(transformacao)=
# Capítulo 15 -  Transformação de dados

A etapa de transformação de dados é o núcleo do processo de ELT. É neste momento que as regras de negócio são aplicadas nos modelos para gerar as tabelas finais que serão consumidas por um BI, em um relatório ou mesmo por outro sistema. O tipo de processo e tecnologia usada na transformação vai depender do tipo de dados que queremos transformar, volume de dados, arquitetura de sistemas possível (por exemplo, nuvem vs *on-premises*), capacidade técnica da equipe, entre outros. 

Na primeira seção deste capítulo listamos os tipos de transformações comuns em projetos de Analytics e que são parte fundamental do trabalho da Engenharia de Analytics. Em seguinda, comparamos diferentes arquiteturas de transformação de dados. Por fim, apresentamos um exemplo prático completo do *dbt*, principal ferramenta de transformação de dados no **Modern Data Stack**. 