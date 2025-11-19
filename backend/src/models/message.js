/**
 * Message Model - Modelo Sequelize para Mensagens
 * 
 * Define a estrutura da tabela Messages no banco de dados PostgreSQL.
 * 
 * Campos:
 * - id: UUID (chave primária, gerado automaticamente)
 * - content: Texto da mensagem (obrigatório)
 * - owner: Dono da mensagem - 'User' ou 'System' (obrigatório)
 * - createdAt: Data de criação (gerado automaticamente pelo Sequelize)
 * - updatedAt: Data de atualização (gerado automaticamente pelo Sequelize)
 * 
 * @param {Object} sequelize - Instância do Sequelize
 * @param {Object} DataTypes - Tipos de dados do Sequelize
 * @returns {Object} Modelo Message
 */
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    // ID único universal (UUID v4)
    // Usado para melhor escalabilidade e segurança
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Gera UUID automaticamente
      primaryKey: true
    },
    // Conteúdo da mensagem
    // Tipo TEXT para suportar mensagens longas
    content: {
      type: DataTypes.TEXT,
      allowNull: false // Campo obrigatório
    },
    // Identifica quem enviou a mensagem
    // Valores possíveis: 'User' ou 'System'
    owner: {
      type: DataTypes.STRING,
      allowNull: false // Campo obrigatório
    }
  }, {
    // Opções do modelo
    tableName: 'Messages', // Nome da tabela no banco
    timestamps: true, // Habilita createdAt e updatedAt
    underscored: false // Não usa snake_case para nomes de campos
  });
  
  return Message;
};

