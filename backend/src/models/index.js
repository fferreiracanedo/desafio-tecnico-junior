/**
 * Models Index - Carregador Automático de Modelos Sequelize
 * 
 * Este arquivo é responsável por:
 * - Carregar automaticamente todos os modelos da pasta
 * - Configurar conexão Sequelize com o banco de dados
 * - Executar associações entre modelos (se houver)
 * - Exportar todos os modelos e instância do Sequelize
 * 
 * Padrão: Carrega todos os arquivos .js da pasta (exceto index.js e testes)
 * e os registra no objeto db para uso em outras partes da aplicação.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Carrega configuração do banco baseada no ambiente (development/test/production)
const config = require(path.resolve(__dirname, '../../config/config.js'))[env];
const db = {};

// Cria instância do Sequelize baseada na configuração
let sequelize;
if (config.use_env_variable) {
  // Usa variável de ambiente para conexão (útil em produção)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Usa configuração direta (development/test)
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Carrega automaticamente todos os modelos da pasta
fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filtra apenas arquivos .js, excluindo index.js e arquivos de teste
    return (
      file.indexOf('.') !== 0 && // Não arquivos ocultos
      file !== basename && // Não o próprio index.js
      file.slice(-3) === '.js' && // Apenas arquivos .js
      file.indexOf('.test.js') === -1 // Exclui arquivos de teste
    );
  })
  .forEach(file => {
    // Carrega cada modelo e o registra no objeto db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Registra como db.Message, db.User, etc.
  });

// Executa associações entre modelos (se definidas)
// Permite relacionamentos como hasMany, belongsTo, etc.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta instância do Sequelize e classe Sequelize
// Útil para migrações, transações, etc.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

