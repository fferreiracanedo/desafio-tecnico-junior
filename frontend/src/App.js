/**
 * App.js - Componente Principal da Aplicação de Chat
 * 
 * Este componente gerencia toda a interface do chat, incluindo:
 * - Listagem de mensagens
 * - Envio de novas mensagens
 * - Exclusão do histórico
 * - Estados de loading e feedback visual
 * 
 * Arquitetura:
 * - Estados React para gerenciar dados locais
 * - Chamadas à API para comunicação com backend
 * - Material-UI para interface visual
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  CircularProgress,
  Avatar,
  Fade,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from './services/api';

export default function App() {
  // ==================== ESTADOS DO COMPONENTE ====================
  
  // Lista de todas as mensagens (user + system)
  const [messages, setMessages] = useState([]);
  
  // Texto digitado no input
  const [text, setText] = useState('');
  
  // Estado de loading ao enviar mensagem
  const [loading, setLoading] = useState(false);
  
  // Estado de loading ao buscar mensagens (inicial)
  const [fetching, setFetching] = useState(false);
  
  // Controla abertura do modal de confirmação de exclusão
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Estado de loading ao deletar mensagens
  const [deleting, setDeleting] = useState(false);
  
  // Referência para o elemento que marca o fim da lista (para scroll automático)
  const messagesEndRef = useRef(null);

  // ==================== EFEITOS ====================
  
  // Busca mensagens ao montar o componente (apenas uma vez)
  useEffect(() => {
    fetchMessages();
  }, []); // Array vazio = executa apenas uma vez

  // Faz scroll automático para o final sempre que há novas mensagens
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Executa sempre que messages muda

  // ==================== FUNÇÕES AUXILIARES ====================
  
  /**
   * Faz scroll suave até o final da lista de mensagens
   * Usado para garantir que novas mensagens sejam visíveis
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Busca todas as mensagens do backend
   * Executado na inicialização e pode ser chamado manualmente
   */
  async function fetchMessages() {
    try {
      setFetching(true);
      const res = await api.get('/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setFetching(false);
    }
  }

  /**
   * Envia uma nova mensagem do usuário
   * 
   * Fluxo:
   * 1. Valida se há texto
   * 2. Limpa o input
   * 3. Envia para o backend
   * 4. Adiciona mensagem do usuário + resposta do sistema ao estado
   * 5. Em caso de erro, restaura o texto no input
   */
  async function handleSend() {
    // Validação: não envia se estiver vazio ou já enviando
    if (!text.trim() || loading) return;

    const messageText = text.trim();
    setText(''); // Limpa o input imediatamente
    setLoading(true);

    try {
      // Envia mensagem e recebe resposta automática do sistema
      const res = await api.post('/messages', { content: messageText });
      
      // Adiciona ambas as mensagens ao estado (usuário + sistema)
      setMessages(prev => [...prev, res.data.userMessage, res.data.systemMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      // Em caso de erro, restaura o texto para o usuário poder tentar novamente
      setText(messageText);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handler para eventos de teclado no input
   * Permite enviar mensagem com Enter (mas não com Shift+Enter, para permitir quebras de linha)
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Previne quebra de linha
      handleSend();
    }
  };

  /**
   * Deleta todas as mensagens do banco de dados e limpa o estado local
   * Exibido após confirmação no modal
   */
  const handleDeleteAll = async () => {
    setDeleting(true);
    try {
      // Deleta todas as mensagens no backend
      await api.delete('/messages');
      
      // Limpa o estado local
      setMessages([]);
      
      // Fecha o modal
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Error deleting messages:', err);
      alert('Erro ao excluir mensagens. Tente novamente.');
    } finally {
      setDeleting(false);
    }
  };

  /**
   * Função auxiliar para identificar se uma mensagem é do usuário
   * Usada para estilização condicional
   */
  const isUserMessage = (owner) => owner === 'User';

  // ==================== RENDERIZAÇÃO ====================
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header com título e botão de exclusão */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <SmartToyIcon sx={{ fontSize: 28 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Chat
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDeleteDialogOpen(true)}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            title="Excluir todo histórico"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Container principal do chat */}
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 3 }}>
        {/* Paper que contém a área de mensagens e input */}
        <Paper
          elevation={0}
          sx={{
            p: 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            bgcolor: 'white'
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
                '&:hover': {
                  background: '#555',
                },
              },
            }}
          >
            {/* Estado: Carregando mensagens pela primeira vez */}
            {fetching && messages.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress sx={{ color: '#667eea' }} />
              </Box>
            ) : 
            /* Estado: Nenhuma mensagem (chat vazio) */
            messages.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                color: 'text.secondary'
              }}>
                <SmartToyIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 1 }}>
                  Nenhuma mensagem ainda
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Comece a conversar!
                </Typography>
              </Box>
            ) : 
            /* Estado: Lista de mensagens */
            (
              <List sx={{ width: '100%', py: 0 }}>
                {/* Renderiza cada mensagem com animação de fade-in */}
                {messages.map((m) => (
                  <Fade in={true} timeout={300} key={m.id}>
                    <ListItem
                      sx={{
                        justifyContent: isUserMessage(m.owner) ? 'flex-end' : 'flex-start',
                        py: 1.5,
                        px: 1
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: isUserMessage(m.owner) ? 'row-reverse' : 'row',
                          alignItems: 'flex-end',
                          gap: 1,
                          maxWidth: '85%',
                          minWidth: 0
                        }}
                      >
                        <Avatar
                          sx={{
                            background: isUserMessage(m.owner) 
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                              : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            width: 36,
                            height: 36,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            flexShrink: 0
                          }}
                        >
                          {isUserMessage(m.owner) ? (
                            <PersonIcon fontSize="small" />
                          ) : (
                            <SmartToyIcon fontSize="small" />
                          )}
                        </Avatar>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 0.5,
                          minWidth: 0,
                          flex: 1
                        }}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              background: isUserMessage(m.owner) 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : '#f0f0f0',
                              backgroundColor: isUserMessage(m.owner) 
                                ? 'transparent'
                                : '#f0f0f0',
                              color: isUserMessage(m.owner) ? 'white' : 'text.primary',
                              borderRadius: isUserMessage(m.owner) 
                                ? '18px 18px 4px 18px'
                                : '18px 18px 18px 4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              transition: 'transform 0.2s',
                              maxWidth: '100%',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              },
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.6,
                                fontSize: '15px',
                                maxWidth: '100%',
                                color: isUserMessage(m.owner) ? 'white' : 'text.primary'
                              }}
                            >
                              {m.content || ''}
                            </Typography>
                          </Paper>
                          <Typography
                            variant="caption"
                            sx={{ 
                              px: 1,
                              opacity: 0.6,
                              fontSize: '11px',
                              textAlign: isUserMessage(m.owner) ? 'right' : 'left'
                            }}
                          >
                            {isUserMessage(m.owner) ? 'Você' : 'Sistema'}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  </Fade>
                ))}
                {/* Elemento invisível usado para scroll automático */}
                <div ref={messagesEndRef} />
              </List>
            )}
          </Box>

          {/* Área de input para novas mensagens */}
          <Box 
            sx={{ 
              p: 2, 
              borderTop: 1, 
              borderColor: 'divider',
              bgcolor: 'white',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
            }}
          >
            <Box display="flex" gap={1.5} alignItems="flex-end">
              <TextField
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                disabled={loading}
                variant="outlined"
                multiline
                maxRows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f8f9fa',
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: '#f0f0f0',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'white',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!text.trim() || loading}
                sx={{ 
                  alignSelf: 'flex-end',
                  bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  background: !text.trim() || loading 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  width: 48,
                  height: 48,
                  boxShadow: !text.trim() || loading
                    ? 'none'
                    : '0 4px 12px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    background: !text.trim() || loading
                      ? '#ccc'
                      : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    transform: 'scale(1.05)',
                    boxShadow: !text.trim() || loading
                      ? 'none'
                      : '0 6px 16px rgba(102, 126, 234, 0.5)',
                  },
                  '&:disabled': {
                    bgcolor: '#ccc',
                    color: 'white',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  <SendIcon />
                )}
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Modal de confirmação para exclusão de mensagens */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleting && setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ fontWeight: 600 }}>
          Excluir todo histórico?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Você tem certeza que deseja excluir todas as mensagens? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={deleting}
            sx={{ color: 'text.secondary' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteAll}
            disabled={deleting}
            variant="contained"
            color="error"
            startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : <DeleteOutlineIcon />}
            sx={{
              background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              },
              '& .MuiCircularProgress-root': {
                color: 'white'
              }
            }}
          >
            {deleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
