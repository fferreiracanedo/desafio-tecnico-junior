# Guia de Commits para o Repositório

## Comandos para Executar

Execute os seguintes comandos no Git Bash ou Terminal (um por vez):

### 1. Inicializar repositório (se ainda não estiver inicializado)
```bash
git init
```

### 2. Configurar o remote
```bash
git remote add origin https://github.com/fferreiracanedo/desafio-tecnico-junior.git
```

Ou se já existir um remote, atualizar:
```bash
git remote set-url origin https://github.com/fferreiracanedo/desafio-tecnico-junior.git
```

### 3. Commits por partes:

#### Commit 1: Configuração inicial do projeto
```bash
git add README.md .gitignore docker-compose.yml
git commit -m "feat: configuração inicial do projeto

- Adiciona README com instruções detalhadas
- Configura docker-compose para desenvolvimento
- Adiciona .gitignore"
```

#### Commit 2: Estrutura do backend
```bash
git add backend/package.json backend/Dockerfile backend/jest.config.js backend/.sequelizerc backend/config/
git commit -m "feat: estrutura inicial do backend

- Configuração do Express e Sequelize
- Arquivos de configuração do banco de dados
- Configuração do Docker
- Setup de testes com Jest"
```

#### Commit 3: Modelos e migrações do banco
```bash
git add backend/src/models/ backend/src/migrations/
git commit -m "feat: modelos e migrações do banco de dados

- Modelo Message com UUID, content e owner
- Migration para criação da tabela Messages
- Carregador automático de modelos"
```

#### Commit 4: Camada de serviço do backend
```bash
git add backend/src/services/
git commit -m "feat: camada de serviço para mensagens

- MessageService com operações CRUD
- Criação de mensagens de usuário e sistema
- Método para deletar todo histórico"
```

#### Commit 5: Controllers do backend
```bash
git add backend/src/controllers/
git commit -m "feat: controllers da API de mensagens

- MessageController com validações
- Endpoints para criar, listar e deletar mensagens
- Tratamento de erros"
```

#### Commit 6: Rotas do backend
```bash
git add backend/src/routes/
git commit -m "feat: rotas da API REST

- Rotas POST, GET e DELETE /messages
- Integração com controllers"
```

#### Commit 7: Servidor principal do backend
```bash
git add backend/src/index.js
git commit -m "feat: servidor Express com CORS configurado

- Configuração do servidor
- Middleware CORS para frontend
- Conexão com banco de dados PostgreSQL
- Inicialização do servidor"
```

#### Commit 8: Testes do backend
```bash
git add backend/src/__tests__/
git commit -m "test: testes unitários do backend

- Testes da API de mensagens
- Testes de integração com Supertest"
```

#### Commit 9: Estrutura do frontend
```bash
git add frontend/package.json frontend/Dockerfile frontend/public/ frontend/src/index.js
git commit -m "feat: estrutura inicial do frontend

- Configuração do React com Material-UI
- Estrutura básica do projeto
- Configuração do Docker"
```

#### Commit 10: Serviço de API do frontend
```bash
git add frontend/src/services/
git commit -m "feat: cliente HTTP para comunicação com backend

- Configuração do Axios
- Base URL configurável via variável de ambiente"
```

#### Commit 11: Componente principal do chat
```bash
git add frontend/src/App.js frontend/src/App.css frontend/src/index.css
git commit -m "feat: interface de chat completa

- Componente principal do chat com Material-UI
- Envio e recebimento de mensagens
- Histórico de conversas
- Modal de confirmação para exclusão
- Auto-scroll para últimas mensagens
- Design moderno com gradientes e animações
- Estados de loading e feedback visual"
```

#### Commit 12: Estilos e configurações finais
```bash
git add frontend/src/App.test.js frontend/src/setupTests.js frontend/src/reportWebVitals.js
git commit -m "chore: configurações de teste e scripts auxiliares

- Setup de testes do React
- Scripts de web vitals"
```

### 4. Verificar status antes de fazer push
```bash
git status
```

### 5. Fazer push para o repositório remoto
```bash
# Primeiro push (criar branch main)
git branch -M main
git push -u origin main

# Ou se já existe conteúdo no remoto, fazer pull primeiro
git pull origin main --rebase
git push -u origin main
```

### 6. Se houver conflitos, resolver e continuar:
```bash
# Após resolver conflitos manualmente
git add .
git rebase --continue
git push origin main
```

## Observações

- Os commits estão organizados por funcionalidade
- Cada commit tem uma mensagem descritiva seguindo Conventional Commits
- Execute os comandos na ordem apresentada
- Certifique-se de que está na pasta raiz do projeto (dk-tech-test)


