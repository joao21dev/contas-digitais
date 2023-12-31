# Pojeto Contas Digitais

## Sobre o projeto

O objetivo deste projeto foi desenvolver um novo sistema de contas digitais, desde a análise de requisitos e levantamento dos casos de uso, modelagem do banco de dados relacional e desenvolvimento da API.

### Funcionalidades

O sistema incluirá as seguintes funcionalidades:

- Cadastro e atualização de clientes e contas
- Consulta de informações de contas e clientes
- Registro de transações (depósitos e saques)
- Consulta de histórico de transações de uma conta

### Banco de Dados

O sistema é baseado em um banco de dados relacional (PostgreSQL) que armazenará os seguintes tipos de informações:

- Dados do cliente a partir da tabela Customer
- Dados da conta a partir da tabela Account
- Dados da transação (depósitos e saques) a partir da tabela Transaction

### Artefatos

Para este projeto, serão entregues os seguintes artefatos:

- Diagrama Entidade-Relacionamento (DER) e Modelo Entidade-Relacionamento (MER). Se encontra em `src/infra/database/database.diagram.drawio`. Para vizualisá-lo dentro do projeto, é necessário uma extensão que leia arquivos draw.io.
  <a href="https://ibb.co/BLMCLD8"><img src="https://i.ibb.co/JnJsnLX/entities-diagram.png" alt="entities-diagram" border="0"></a>

- Scripts DDL (Data Definition Language) e DML (Data Manipulation Language) que estão localizados nos seguintes caminhos:
- DDL: `src/infra/database/ddl.sql`
- DML: `src/infra/database/dml.sql`

- API: A documentação dos endpoints pode ser acessada em `localhost:3333/api` após rodar o projeto 

### API

A api foi desenvolvida para fornecer os seguintes casos de uso:

- Cadastrar clientes e criar contas utilizando uma chave estrangeira para referenciar o cliente. Atualizar dados das contas e dos clientes. Consultar Contas pertencentes a um determinado cliente. Cadastrar transações de saque ou depósito utilizando uma chave estrangeira para referencia a conta que fez determinada transação. Consultar lista de transações efetuadas a partir de uma determinada conta.
- A api foi desenvolvida seguindo os princípios da Arquitetura Limpa, que enfatiza a separação de responsabilidades em camadas distintas. A estrutura adotada inclui a camada de Domínio, onde as regras de negócios e entidades são definidas; a camada de Casos de Uso (App), que contém a lógica específica da aplicação; a camada de Infraestrutura, cuidando de aspectos técnicos como banco de dados; a camada Presentation responsável por gerenciar a interação com o usuário através dos controllers. A Inversão de Dependência foi empregada, assegurando que camadas superiores dependam de abstrações e não de detalhes de implementação, aumentando o desacoplamento e a testabilidade dos casos de uso utilizando o Jest. A utilização do NestJS e TypeScript fortaleceu essa arquitetura, resultando em uma API modular, de fácil manutenção e escalável. As ferramentas empregadas, como o TypeORM para a persistência de dados e o Swagger para documentação.

### Testes

A aplicação foi desenvolvida com foco em testes, seguindo os princípios da Arquitetura Limpa, que facilita a cobertura total dos casos de uso graças ao seu desacoplamento do resto da aplicação. A Inversão de Dependência é crucial, permitindo substituir dependências por mocks nos testes. O cenário ideal  seria a criação de um repositório em memória (não sendo atingido na presente data pelo vencimento do prazo de entrega do projeto), possibilitando testes rápidos e consistentes, independentes do banco de dados real.

<a href="https://ibb.co/F5bbKDn"><img src="https://i.ibb.co/rxGGmwv/testsCov.png" alt="testsCov" border="0"></a>


### Principais tecnologias utilizadas:

- **Docker:** Uma plataforma de contêiner que facilita o empacotamento e implantação da aplicação e suas dependências. Foi utilizado para rodar o banco de dados.
- **NestJS:** Um framework que possibilita a criação de APIs eficientes e escaláveis.
- **TypeScript:** Uma linguagem que oferece tipagem estática e recursos de programação orientada a objetos.
- **Jest:** Uma biblioteca de testes em JavaScript/TypeScript que auxilia na criação de testes automatizados para a aplicação.
- **TypeORM:** Um ORM que viabiliza a manipulação de bancos de dados utilizando classes e objetos TypeScript.
- **PostgreSQL:** Um sistema de gerenciamento de banco de dados relacional utilizado para armazenar e recuperar informações de forma eficiente.
- **Swagger:** Usado para gerar documentação automática da API conforme o padrão Swagger/OpenAPI.

## Instalação do projeto

### Pré-requisitos

Antes de iniciar, certifique-se de que você tenha os seguintes pré-requisitos instalados:

- **VS Code** [https://code.visualstudio.com/](https://code.visualstudio.com/) ou qualquer outro editor de código

- **Node.js:** [https://nodejs.org/](https://nodejs.org/)

- **Docker:** [https://www.docker.com/get-started](https://www.docker.com/get-started)

- **psql:** Será usado para rodar o arquivo de scripts sql, caso não seja usado um gerenciador como o DBeaver (as credenciais estão no .env do projeto). Para instalar o psql, você pode seguir as instruções do site oficial ou usar o gerenciador de pacotes do seu sistema operacional. No linux:
```sh
   sudo apt install postgresql-client
   ```

- **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

Certifique-se de seguir as instruções de instalação apropriadas para o seu sistema operacional.

### Execução do projeto

1. Clone o repositório
   ```sh
   git clone git@github.com:joao21dev/contas-digitais.git
   ```
2. Acesse o diretório raiz
   ```sh
   cd contas-digitais
   ```
3. Rode o container docker com o banco de dados (porta padrão 5432)
   ```js
   sudo docker compose up
   ```
4. Abra outra janela do terminal no mesmo diretório e crie as tabelas do banco (password: admin). Aqui é necessário ter o psql, caso utilize um gerenciador, basta usar as credenciais que estão no .env e colar o script ddl localizado em src/infra/database/ddl.sql`.
   ```js
   npm run create-tables
   ```
5. Instale as dependências do projeto
   ```js
   npm install
   ```
6. Rode o projeto (porta 3333)
   ```js
   npm run start:dev
   ```
7. Abra a documentação dos endpoints em`localhost:3333/api`
