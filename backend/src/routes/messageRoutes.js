/**
 * messageRoutes - Rotas da API de Mensagens
 * 
 * Define os endpoints HTTP para operações relacionadas a mensagens:
 * - POST /messages - Criar nova mensagem
 * - GET /messages - Listar todas as mensagens
 * - DELETE /messages - Deletar todo o histórico
 * 
 * Todas as rotas são direcionadas para o MessageController.
 */

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST /messages - Criar nova mensagem do usuário (e resposta automática do sistema)
router.post('/messages', (req, res) => messageController.createMessage(req, res));

// GET /messages - Retornar todas as mensagens ordenadas por data
router.get('/messages', (req, res) => messageController.getMessages(req, res));

// DELETE /messages - Deletar todas as mensagens do banco
router.delete('/messages', (req, res) => messageController.deleteAllMessages(req, res));

module.exports = router;

