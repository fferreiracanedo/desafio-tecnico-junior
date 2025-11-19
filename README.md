# Desafio Técnico - Chat App 💬

## 📋 Sobre o Desafio

Este projeto foi desenvolvido como resposta ao **Desafio Técnico: Desenvolvedor Júnior** da DKW System.

### Descrição Original do Desafio

Estamos em busca de um desenvolvedor júnior para integrar nossa equipe de tecnologia em nossa startup. Este desafio foi criado para avaliar seus conhecimentos em **React.js**, **Node.js (Express)**, **PostgreSQL** e **Sequelize**. A ideia é construir uma pequena aplicação para gerenciar interações com usuários.

**Objetivo**: Criar uma aplicação simples onde os usuários podem enviar mensagens para um atendente, e o sistema deve responder com uma mensagem de confirmação. O sistema deve ser dividido em **Frontend** e **Backend**.

**Requisitos:**
1. **Frontend**: Interface de chat simples utilizando **React.js** e **Material-UI**, onde o usuário pode enviar mensagens e visualizar histórico.
2. **Backend**: API com **Node.js/Express** e **Sequelize** para receber, salvar mensagens e enviar resposta automática.
3. **Banco de Dados**: PostgreSQL com migrations do Sequelize contendo ID, conteúdo, proprietário (User/System) e timestamp.

**Nota**: Na DKW System apoiamos o uso de IA's no dia-a-dia. O uso de inteligência artificial para **AUXÍLIO** no desafio não é proibido, desde que o código seja de entendimento total do candidato.

---

# Desafio Técnico - Chat App 💬

Aplicação de chat completa desenvolvida com React, Material-UI, Node.js/Express, PostgreSQL e Sequelize.

## 🎯 Objetivo do Projeto

Implementar uma aplicação de chat onde usuários podem enviar mensagens e receber respostas automáticas do sistema. O projeto demonstra boas práticas de desenvolvimento, incluindo Docker e documentação completa.

## ✨ Funcionalidades

- ✅ Interface de chat moderna e responsiva com Material-UI
- ✅ Envio de mensagens com Enter ou botão
- ✅ Resposta automática do sistema para cada mensagem
- ✅ Histórico completo de conversas
- ✅ Exclusão de todo o histórico com confirmação
- ✅ Auto-scroll para última mensagem
- ✅ Loading states e feedback visual
- ✅ Tratamento de erros

## ⚡ Início Rápido

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd dk-tech-test

# 2. Configure o PostgreSQL e crie o banco
createdb desafio

# 3. Configure e inicie o backend
cd backend
npm install
cp .env-example .env
# Edite o .env com suas credenciais do PostgreSQL
npm run migrate
npm run dev

# 4. Em outro terminal, inicie o frontend
cd frontend
npm install
npm start
```

Acesse **http://localhost:3000** no navegador! 🎉

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** 18+
- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **ESLint** + **Prettier** - Linting e formatação

### Frontend
- **React** 19
- **Material-UI (MUI) v6** - Biblioteca de componentes
- **Axios** - Cliente HTTP

### DevOps
- **Docker** + **Docker Compose** - Containerização

## 📋 Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL 15 (ou Docker)
- npm ou pnpm
- Git

## 🚀 Como Iniciar o Projeto (Guia Rápido)

### Pré-requisitos

Certifique-se de ter instalado:
- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **PostgreSQL** 15 ou superior ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- **npm** (vem com Node.js) ou **pnpm**

### Passo a Passo para Iniciar

#### 1️⃣ Clone o Repositório

```bash
git clone <url-do-repositorio>
cd dk-tech-test
```

#### 2️⃣ Configure o Banco de Dados PostgreSQL

Certifique-se de que o PostgreSQL está rodando. Crie o banco de dados:

```bash
# No terminal (ou use pgAdmin/qualquer cliente PostgreSQL)
createdb desafio
```

Ou via SQL:
```sql
CREATE DATABASE desafio;
```

#### 3️⃣ Configure o Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Crie o arquivo .env
cp .env-example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL:
```env
PORT=4000
DB_USER=postgres          # Seu usuário do PostgreSQL
DB_PASS=postgres          # Sua senha do PostgreSQL
DB_NAME=desafio           # Nome do banco de dados
DB_HOST=127.0.0.1         # Host do PostgreSQL (localhost)
```

#### 4️⃣ Execute as Migrations do Banco de Dados

```bash
# Ainda na pasta backend
npm run migrate
```

Isso criará a tabela de mensagens no banco de dados.

#### 5️⃣ Inicie o Backend

```bash
# Ainda na pasta backend
npm run dev
```

O backend estará rodando em **http://localhost:4000**

Você deve ver no terminal:
```
Database connected successfully
Database synchronized
Server running on port 4000
```

#### 6️⃣ Configure e Inicie o Frontend

Abra um **novo terminal** e execute:

```bash
# Volte para a raiz do projeto
cd ..

# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

O frontend será aberto automaticamente no navegador em **http://localhost:3000**

> **Nota:** O frontend está configurado para se conectar automaticamente ao backend em `http://localhost:4000`. Não é necessário criar arquivo `.env` no frontend, a menos que queira usar uma URL diferente.

### 🎉 Pronto!

Agora você pode:
- Enviar mensagens no chat
- Ver as respostas automáticas do sistema
- Excluir todo o histórico usando o botão de lixeira no header

---

### 🔧 Alternativa: Usando Docker (Opcional)

Se preferir usar Docker:

```bash
# Na raiz do projeto
docker-compose up --build
```

Isso iniciará:
- PostgreSQL na porta 5432
- Backend na porta 4000  
- Frontend na porta 3000

Depois execute as migrations:
```bash
docker-compose exec backend npm run migrate
```

## 📚 Endpoints da API

### POST /messages

Cria uma nova mensagem do usuário e retorna automaticamente uma resposta do sistema.

**Request:**
```json
{
  "content": "Olá!"
}
```

**Response (201):**
```json
{
  "userMessage": {
    "id": "uuid",
    "content": "Olá!",
    "owner": "User",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "systemMessage": {
    "id": "uuid",
    "content": "Mensagem recebida com sucesso!",
    "owner": "System",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Erros:**
- `400` - Content é obrigatório
- `500` - Erro interno do servidor

### GET /messages

Retorna todas as mensagens ordenadas por data de criação (mais antigas primeiro).

**Response (200):**
```json
[
  {
    "id": "uuid",
    "content": "Olá!",
    "owner": "User",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "uuid",
    "content": "Mensagem recebida com sucesso!",
    "owner": "System",
    "createdAt": "2024-01-01T00:00:01.000Z",
    "updatedAt": "2024-01-01T00:00:01.000Z"
  }
]
```

### DELETE /messages

Deleta todas as mensagens do banco de dados.

**Response (200):**
```json
{
  "message": "All messages deleted successfully"
}
```

**Erros:**
- `500` - Erro interno do servidor

## 🗄️ Migrations

### Criar nova migration:
```bash
cd backend
npx sequelize-cli migration:generate --name nome-da-migration
```

### Executar migrations:
```bash
cd backend
npm run migrate
```

### Reverter última migration:
```bash
cd backend
npm run migrate:undo
```

## 🧹 Linting e Formatação

### Backend

Linter:
```bash
cd backend
npm run lint
npm run lint:fix  # Auto-corrige problemas
```

Formatação:
```bash
cd backend
npm run format
```

### Frontend

O React Scripts já inclui ESLint. Para formatação com Prettier:
```bash
cd frontend
npx prettier --write "src/**/*.{js,jsx,json,css}"
```

## 📁 Estrutura do Projeto

```
dk-tech-test/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controllers da API
│   │   ├── models/           # Modelos Sequelize
│   │   ├── migrations/       # Migrations do banco
│   │   ├── routes/           # Definição de rotas
│   │   ├── services/         # Lógica de negócio
│   │   └── index.js          # Entry point
│   ├── config/               # Configurações Sequelize
│   ├── .sequelizerc          # Config Sequelize CLI
│   ├── Dockerfile
│   ├── package.json
│   └── .env-example
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Serviços de API
│   │   ├── App.js            # Componente principal
│   │   └── index.js          # Entry point
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔧 Scripts Disponíveis

### Backend
- `npm start` - Inicia servidor em produção
- `npm run dev` - Inicia servidor em desenvolvimento (com nodemon)
- `npm run migrate` - Executa migrations
- `npm run migrate:undo` - Reverte última migration
- `npm run lint` - Executa linter
- `npm run format` - Formata código com Prettier

### Frontend
- `npm start` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run eject` - Eject do Create React App (irreversível)

## 🚢 Deploy

### Build para Produção

**Backend:**
```bash
cd backend
npm install --production
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Os arquivos estarão em frontend/build/
```

## 🎨 Features Implementadas

- ✅ Interface de chat moderna e responsiva com Material-UI
- ✅ Design com gradientes e animações suaves
- ✅ Envio de mensagens via API (Enter ou botão)
- ✅ Resposta automática do sistema para cada mensagem
- ✅ Histórico completo de conversas
- ✅ Exclusão de todo histórico com modal de confirmação
- ✅ Auto-scroll para última mensagem
- ✅ Loading states e feedback visual
- ✅ Tratamento de erros
- ✅ Validação de entrada
- ✅ CORS configurado
- ✅ Dockerização completa
- ✅ Linting e formatação

## 💡 Como Usar as Funcionalidades

1. **Enviar Mensagem:**
   - Digite uma mensagem no campo de input
   - Pressione Enter ou clique no botão de enviar
   - A mensagem aparecerá à direita (roxo) e o sistema responderá à esquerda (cinza)

2. **Ver Histórico:**
   - Todas as mensagens enviadas e recebidas são exibidas automaticamente
   - O chat rola automaticamente para a última mensagem

3. **Excluir Histórico:**
   - Clique no ícone de lixeira no header (canto superior direito)
   - Confirme no modal que aparece
   - Todas as mensagens serão deletadas e o chat ficará vazio

## ⚠️ Troubleshooting

### Erro ao conectar no banco de dados

Certifique-se de que:
- O PostgreSQL está rodando
- As credenciais no arquivo `.env` estão corretas
- O banco de dados `desafio` foi criado

### Erro de CORS no navegador

Se aparecer erro de CORS:
- Verifique se o backend está rodando na porta 4000
- O frontend já está configurado para aceitar requisições do backend

### Frontend não abre

- Verifique se a porta 3000 não está em uso
- Tente limpar o cache: `npm start` novamente

### Migrations não executam

- Certifique-se de que o banco de dados existe
- Verifique as credenciais no `.env`
- Tente executar manualmente: `npx sequelize-cli db:migrate`

## 📝 Notas de Desenvolvimento

### Decisões Técnicas

1. **Arquitetura Backend**: Separação em camadas (Routes → Controllers → Services → Models) para facilitar manutenção e organização do código.

2. **Material-UI v6**: Utilizado por ser a versão mais recente estável com melhor suporte a React 19.

3. **UUID para IDs**: Uso de UUID em vez de inteiros auto-incrementais para melhor escalabilidade e segurança.

4. **Docker Compose**: Facilita o setup local e garante consistência entre ambientes.

### Padrões de Commit

Este projeto segue o padrão Conventional Commits:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `chore:` - Tarefas de manutenção

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👤 Autor

Desenvolvido seguindo as especificações do desafio técnico.

---

**Observação**: Certifique-se de configurar corretamente as variáveis de ambiente antes de executar a aplicação. O arquivo `.env-example` serve como referência.

