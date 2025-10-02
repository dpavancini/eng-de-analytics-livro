**Livro - Engenharia de Analytics**

Este repositório contém o código-fonte e a estrutura do livro **Engenharia de Analytics**, construído com [Jupyter Book](https://jupyterbook.org/).

## Pré-requisitos para colaboração

- Python 3.8 ou superior
- [pip](https://pip.pypa.io/en/stable/) (gerenciador de pacotes Python)
- [Git](https://git-scm.com/) (sistema de controle de versão)

## Instalação e configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/eng-de-analytics-livro.git
cd eng-de-analytics-livro
```

### 2. Crie um ambiente virtual
Recomenda-se criar um ambiente virtual para isolar as dependências:

```bash
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
.venv\Scripts\activate      # Windows
```

### 3. Instale as dependências

```bash
pip install -U jupyter-book
```

### 4. Construa o livro
Dentro do diretório do projeto, execute:

```bash
jupyter-book build .
```
