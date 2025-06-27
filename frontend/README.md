# 🚀 Desafio Final - Desenvolvimento Front-end II (React) ✨

## 🌟 Visão Geral do Projeto

Este é o módulo de **Front-end** do projeto final para as disciplinas de Desenvolvimento Back-end I e II da Unilavras. Desenvolvido com React, esta aplicação web serve como uma interface de usuário intuitiva para consumir a API RESTful construída em Node.js, gerenciando dados de **clientes**, **produtos** e **usuários**.

O principal objetivo deste front-end é demonstrar a integração completa com o back-end, exibindo funcionalidades como autenticação JWT, listagem de dados (públicos e protegidos) e operações CRUD.

## 🔗 Conexão com o Back-end

Este projeto front-end consome uma API RESTful que deve estar rodando localmente na porta `3001`.
Você pode encontrar o `README.md` do projeto back-end [aqui](LINK_PARA_O_REPOSITORIO_DO_BACKEND/README.md) (substitua pelo link real do seu repositório back-end).

## ✨ Funcionalidades do Front-end

A aplicação front-end oferece as seguintes funcionalidades principais:

* **Página Inicial (Landing Page)** 🏠: Uma tela de boas-vindas para o usuário.
* **Autenticação de Usuário** 🔑:
    * **Tela de Login**: Permite que usuários existentes façam login para obter um token JWT.
    * **Tela de Logout**: Gerencia a saída do usuário, invalidando o token no back-end.
* **Gerenciamento de Produtos** 📦:
    * **Listagem Pública de Produtos**: Exibe todos os produtos disponíveis sem a necessidade de autenticação.
* **Gerenciamento de Clientes e Usuários** 👥:
    * **Listagem de Clientes**: Apenas acessível para usuários autenticados.
    * **Listagem de Usuários**: Apenas acessível para usuários autenticados.

## 💻 Tecnologias Utilizadas

* **React**: Biblioteca JavaScript para construção de interfaces de usuário.
* **HTML5/CSS3**: Para a estrutura e estilização da interface.
* **JavaScript (ES6+)**: Linguagem de programação para a lógica do front-end.
* **Axios (ou Fetch API)**: Para realizar requisições HTTP à API back-end.
* **React Router DOM**: Para gerenciamento de rotas na aplicação single-page.
* **Consumo da API Node.js/Express**: Interage diretamente com os endpoints do back-end para todas as operações de dados.

## ⚙️ Instalação e Configuração

Para configurar e rodar este projeto front-end em sua máquina:

1.  **Pré-requisitos**:
    * Certifique-se de ter o **Node.js** (versão 18.14.0 ou superior) e o **npm** instalados.
    * Certifique-se de que o **módulo de Back-end** do projeto esteja instalado, configurado (com o banco de dados MySQL) e **rodando** na porta `3001` (`npm start` na pasta do back-end).

2.  **Clone o repositório** do front-end (assumindo que este é um repositório separado):
    ```bash
    git clone SEU_LINK_DO_REPOSITORIO_FRONTEND
    cd SEU_DIRETORIO_DO_PROJETO_FRONTEND
    ```

3.  **Instale as dependências** do projeto:
    ```bash
    npm install
    ```

## ▶️ Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo em modo de desenvolvimento.
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no seu navegador.

A página será recarregada automaticamente quando você fizer alterações. Quaisquer erros de lint também serão exibidos no console.

### `npm test`

Inicia o executor de testes no modo de observação interativo.
Consulte a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para obter mais informações.

### `npm run build`

Compila o aplicativo para produção na pasta `build`.
Ele empacota corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.
Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para obter mais informações.

## 📚 Aprenda Mais

Você pode aprender mais na [documentação do Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, consulte a [documentação do React](https://reactjs.org/).

---

## 🤝 Contribuições

Sinta-se à vontade para contribuir com melhorias neste projeto.

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

---