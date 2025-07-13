import { io } from 'socket.io-client';

//const rota = "https://apiconcord.dev.vilhena.ifro.edu.br"
const rota = "http://localhost:9000"

const URL = process.env.NODE_ENV === "production" ? undefined : rota;
export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,               
  reconnectionAttempts: 3,          
  reconnectionDelay: 5000,          
  reconnectionDelayMax: 10000       
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