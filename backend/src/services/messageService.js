/**
 * MessageService - Camada de Serviço para Mensagens
 * 
 * Responsabilidades:
 * - Lógica de negócio relacionada a mensagens
 * - Interação com o modelo de dados (Sequelize)
 * - Validações de dados
 * - Operações CRUD no banco de dados
 * 
 * Esta camada separa a lógica de negócio dos controllers,
 * facilitando testes e manutenção.
 */

const { Message } = require('../models');

class MessageService {
  /**
   * Cria uma nova mensagem do usuário
   * 
   * @param {string} content - Conteúdo da mensagem
   * @returns {Promise<Object>} Mensagem criada no banco
   * @throws {Error} Se content estiver vazio
   */
  async createUserMessage(content) {
    // Validação: conteúdo obrigatório
    if (!content || content.trim() === '') {
      throw new Error('Content is required');
    }
    
    // Cria registro no banco com owner = 'User'
    return await Message.create({
      content: content.trim(), // Remove espaços extras
      owner: 'User' // Identifica como mensagem do usuário
    });
  }

  /**
   * Cria uma nova mensagem do sistema
   * 
   * Usado para respostas automáticas do sistema.
   * 
   * @param {string} content - Conteúdo da mensagem do sistema
   * @returns {Promise<Object>} Mensagem criada no banco
   */
  async createSystemMessage(content) {
    // Cria registro no banco com owner = 'System'
    return await Message.create({
      content,
      owner: 'System' // Identifica como mensagem do sistema
    });
  }

  /**
   * Retorna todas as mensagens ordenadas por data de criação
   * 
   * Ordenação: Mais antigas primeiro (cronológica)
   * 
   * @returns {Promise<Array>} Array com todas as mensagens
   */
  async getAllMessages() {
    return await Message.findAll({
      order: [['createdAt', 'ASC']] // Ordena por data de criação (ascendente)
    });
  }

  /**
   * Deleta todas as mensagens do banco de dados
   * 
   * Usa truncate para melhor performance ao deletar tudo.
   * ATENÇÃO: Operação irreversível!
   * 
   * @returns {Promise<number>} Número de registros deletados
   */
  async deleteAllMessages() {
    return await Message.destroy({
      where: {}, // Sem filtro = todas as mensagens
      truncate: true // Otimiza deletando e resetando auto-increment
    });
  }
}

// Exporta instância única do service (Singleton pattern)
module.exports = new MessageService();

