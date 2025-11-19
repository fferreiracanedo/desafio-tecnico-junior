/**
 * API Service - Configuração do Cliente HTTP
 * 
 * Este arquivo configura uma instância do Axios pré-configurada
 * para fazer requisições ao backend.
 * 
 * A URL base pode ser configurada via variável de ambiente:
 * - REACT_APP_API_URL (se definida)
 * - Padrão: http://localhost:4000 (backend local)
 */

import axios from 'axios';

// Cria instância do Axios com configuração base
// Todas as requisições usarão esta URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000'
});

export default api;

