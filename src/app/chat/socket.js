import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:9000";
export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,               
  reconnectionAttempts: 3,          
  reconnectionDelay: 2000,          
  reconnectionDelayMax: 5000       
});

socket.on('connect_error', (err) => {
  console.error('Erro de conexão com o servidor Socket.IO:', err.message);
});

socket.on('connect_timeout', () => {
  console.error('Tempo de conexão esgotado ao tentar conectar ao servidor Socket.IO.');
});

socket.on('disconnect', (reason) => {
  console.warn('Desconectado do servidor Socket.IO:', reason);
});

export default socket;