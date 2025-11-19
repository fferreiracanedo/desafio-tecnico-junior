/**
 * MessageController - Controlador de Mensagens
 * 
 * Responsabilidades:
 * - Receber requisições HTTP relacionadas a mensagens
 * - Validar dados de entrada
 * - Chamar serviços apropriados
 * - Retornar respostas HTTP adequadas
 * 
 * Arquitetura: Routes -> Controller -> Service -> Model
 */

const messageService = require('../services/messageService');

class MessageController {
  /**
   * Cria uma nova mensagem do usuário
   * 
   * Fluxo:
   * 1. Valida se o conteúdo foi fornecido
   * 2. Cria mensagem do usuário via service
   * 3. Cria resposta automática do sistema
   * 4. Retorna ambas as mensagens
   * 
   * @param {Object} req - Request object (contém body com content)
   * @param {Object} res - Response object
   * @returns {Object} JSON com userMessage e systemMessage
   */
  async createMessage(req, res) {
    try {
      const { content } = req.body;

      // Validação: conteúdo não pode estar vazio
      if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Content is required' });
      }

      // Cria mensagem do usuário no banco de dados
      const userMessage = await messageService.createUserMessage(content);
      
      // Resposta automática do sistema (criada imediatamente após mensagem do usuário)
      const systemMessage = await messageService.createSystemMessage(
        'Mensagem recebida com sucesso!'
      );

      // Retorna ambas as mensagens criadas
      return res.status(201).json({
        userMessage,
        systemMessage
      });
    } catch (err) {
      console.error('Error creating message:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Retorna todas as mensagens do banco de dados
   * 
   * Ordenação: Mensagens mais antigas primeiro (ASC por createdAt)
   * 
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Array} Array com todas as mensagens
   */
  async getMessages(req, res) {
    try {
      const messages = await messageService.getAllMessages();
      return res.json(messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Deleta todas as mensagens do banco de dados
   * 
   * ATENÇÃO: Esta operação é irreversível!
   * 
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} JSON com mensagem de sucesso
   */
  async deleteAllMessages(req, res) {
    try {
      await messageService.deleteAllMessages();
      return res.status(200).json({ message: 'All messages deleted successfully' });
    } catch (err) {
      console.error('Error deleting messages:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// Exporta instância única do controller (Singleton pattern)
module.exports = new MessageController();

