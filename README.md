# 🚀 Desafio Final - Desenvolvimento Back-end II ✨

## Descrição do Projeto

Este projeto consiste em uma API RESTful desenvolvida em Node.js, criada com o objetivo de consolidar os conhecimentos adquiridos nas disciplinas de Desenvolvimento Back-end I e II. A aplicação é capaz de gerenciar dados de clientes, produtos e usuários, conectando-se a um banco de dados relacional MySQL, implementando autenticação de usuários por meio de JSON Web Tokens (JWT) e utilizando cache para otimizar o desempenho das requisições de clientes.

## Tecnologias Utilizadas 💻

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Node.js**: Plataforma de execução JavaScript.
* **Express.js**: Framework web para Node.js, para construção da API RESTful.
* **MySQL2**: Driver MySQL para Node.js, para interação com o banco de dados.
* **JSON Web Tokens (JWT)**: Para autenticação e autorização de usuários (`jsonwebtoken`).
* **Bcrypt**: Para hashing seguro de senhas (`bcrypt`).
* **Node-Cache**: Para cache de dados em memória (`node-cache`).
* **Dotenv**: Para gerenciamento de variáveis de ambiente (`dotenv`).
* **Jest & Supertest**: Frameworks para testes automatizados.

## Funcionalidades da API (Endpoints) ✨

A API RESTful oferece os seguintes endpoints:

* `GET /`: Endpoint padrão para verificar o status do servidor. Retorna uma mensagem de boas-vindas.
* **CRUD completo para `/clientes`** 🔐: Gerenciamento de clientes (GET, POST, PUT, DELETE). **Requer autenticação JWT**.
* **CRUD completo para `/produtos`** 🌐: Gerenciamento de produtos (GET, POST, PUT, DELETE). **Acesso público, não requer autenticação**.
* `POST /login` 🔑: Autentica um usuário com credenciais e retorna um token JWT válido.
* `POST /logout` 🚫: Invalida o token JWT atual do usuário, tornando-o inoperante para acesso a recursos protegidos.
* `/usuarios`:
    * `POST /usuarios`: Permite o registro de novos usuários.
    * `GET /usuarios`: Lista os usuários cadastrados. **Requer autenticação JWT**.

## Estrutura do Projeto 🏗️

O projeto segue uma arquitetura modular, com a seguinte estrutura de diretórios:

    .
    ├── configs/          # ⚙️ Arquivos de configuração (ex: conexão com o DB)
    ├── controllers/      # 🧠 Lógica de negócio, recebendo requisições e preparando respostas
    ├── middlewares/      # 🛡️ Funções intermediárias (ex: autenticação, tratamento de erros, validações)
    ├── models/           # 📊 Scripts SQL para o banco de dados e lógica de acesso a dados
    ├── routes/           # 🛣️ Definição das rotas da API
    ├── services/         # 🛠️ Camada responsável pelas chamadas diretas ao banco de dados
    ├── tests/            # 🧪 Testes automatizados (Jest, Supertest)
    ├── utils/            # 📦 Utilitários (ex: cache, validações de dados)
    ├── .env              # 🔑 Variáveis de ambiente (ignorado pelo Git)
    ├── .gitignore        # 🗑️ Arquivos e pastas a serem ignorados pelo Git
    ├── app.js            # 🏁 Configuração principal da aplicação Express
    ├── package.json      # 📄 Dependências e scripts do projeto
    ├── package-lock.json # 🔒 Gerenciamento de dependências
    ├── README.md         # 📖 Documentação do projeto
    └── server.js         # 🚀 Inicialização do servidor HTTP

## Banco de Dados 🗄️

O banco de dados é implementado em MySQL e possui as seguintes tabelas:

* **`clientes`**: `id` (PK), `nome`, `sobrenome`, `email` (UNIQUE), `idade` (CHECK >0 e <120).
* **`produtos`**: `id` (PK), `nome`, `descricao`, `preco` (DECIMAL, CHECK >0), `data_atualizado` (DATETIME, CHECK entre '2000-01-01' e '2025-06-20').
* **`usuarios`**: `id` (PK), `usuario` (UNIQUE), `senha` (hash com bcrypt), `token` (VARCHAR).

O script para criação das tabelas pode ser encontrado em `models/schema.sql`.

## Autenticação (JWT) 🔑🛡️

* A autenticação é realizada utilizando JSON Web Tokens (JWT).
* O token JWT deve ser enviado no cabeçalho `Authorization` no formato `Bearer <token>`.
* As senhas dos usuários são armazenadas com segurança utilizando `bcrypt`.
* O endpoint `POST /logout` invalida o token atual do usuário, adicionando-o a uma blacklist em memória para impedir acessos futuros até a expiração natural do token.

## Cache de Dados ⚡🧠

* O endpoint `GET /clientes` utiliza cache com tempo de vida de 30 segundos (`node-cache`).
* Quando um cliente é criado, atualizado ou deletado, o cache da lista de clientes é automaticamente invalidado.
* Logs no terminal informam se a resposta foi servida a partir do cache (`📦 From Cache`) ou do banco de dados (`🗄️ From Database`).

## Tratamento de Erros 🚨🛑

Um middleware de tratamento de erros global (`middlewares/errorHandler.js`) foi implementado para capturar e responder a erros de forma padronizada. Erros de violação de constraints (como chave única ou validações CHECK do MySQL) são retornados com status `400 Bad Request`.

## Como Rodar o Projeto ▶️

### Pré-requisitos 🛠️

* Node.js (versão 18.14.0 ou superior, recomendada).
* MySQL Server (versão 8.0 ou superior, recomendada).

### Instalação ⬇️

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/jvictordev7/Desafio-Final-Back-end-II.git](https://github.com/jvictordev7/Desafio-Final-Back-end-II.git)
    cd Desafio-Final-Back-end-II
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Configuração do Banco de Dados ⚙️

1.  **Crie um banco de dados MySQL:**
    * No seu servidor MySQL, crie um novo banco de dados (ex: `backend_final`).
    ```sql
    CREATE DATABASE IF NOT EXISTS backend_final;
    ```
2.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do projeto.
    * Preencha-o com suas credenciais do MySQL e uma chave secreta para o JWT:
        ```env
        DB_HOST=localhost
        DB_USER=seu_usuario_mysql
        DB_PASSWORD=sua_senha_mysql
        DB_NAME=backend_final
        PORT=3001
        JWT_SECRET=sua_chave_secreta_jwt_bem_longa_e_aleatoria
        ```
3.  **Execute o script SQL:**
    * Importe o conteúdo de `models/schema.sql` para o seu banco de dados `backend_final` usando uma ferramenta como MySQL Workbench ou DBeaver. Isso criará as tabelas necessárias.

### Inicialização da Aplicação 🚀

* Para iniciar o servidor da API:
    ```bash
    npm start
    ```
    O servidor será iniciado na porta 3001 (ou na porta configurada no seu `.env`). Você verá um log no terminal: `🔥 Servidor rodando na porta 3001`.

## Como Rodar os Testes ✅🧪

* Para executar a suíte de testes automatizados:
    ```bash
    npm test
    ```
    Isso executará os testes com Jest e Supertest. Todos os testes devem passar.

## Contribuições 🤝

Sinta-se à vontade para contribuir com melhorias ao projeto.

## Licença 📄

Este projeto está licenciado sob a licença ISC.