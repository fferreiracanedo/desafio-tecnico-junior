/**
 * Servidor Express - Entry Point da Aplicação Backend
 * 
 * Este arquivo é responsável por:
 * - Configurar e iniciar o servidor Express
 * - Conectar ao banco de dados PostgreSQL via Sequelize
 * - Configurar middlewares (CORS, JSON parsing)
 * - Registrar rotas da aplicação
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const messageRoutes = require('./routes/messageRoutes');

// Inicializa a aplicação Express
const app = express();

// Configuração CORS - Permite requisições do frontend
// Necessário porque frontend (porta 3000) e backend (porta 4000) rodam em portas diferentes
app.use(cors({
  origin: 'http://localhost:3000', // Origem permitida (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Middleware para parsing de JSON nas requisições
app.use(express.json());

// Registra as rotas da aplicação
// Todas as rotas relacionadas a mensagens estão em /routes/messageRoutes.js
app.use('/', messageRoutes);

// Porta do servidor (padrão: 4000)
const PORT = process.env.PORT || 4000;

/**
 * Função assíncrona para iniciar o servidor
 * 
 * Fluxo de inicialização:
 * 1. Autentica conexão com o banco de dados
 * 2. Sincroniza modelos (não altera estrutura existente)
 * 3. Inicia servidor HTTP na porta configurada
 */
async function startServer() {
  try {
    // Testa conexão com o banco de dados
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sincroniza modelos com o banco (alter: false = não altera tabelas existentes)
    await sequelize.sync({ alter: false });
    console.log('Database synchronized');

    // Inicia servidor HTTP
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // Em caso de erro na conexão, encerra a aplicação
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();

// Exporta app para uso em testes
module.exports = app;

