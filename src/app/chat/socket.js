import { io } from 'socket.io-client';

const rotaDev = "http://localhost:9000";
const rotaProd = "https://apiconcord.dev.vilhena.ifro.edu.br"; // sua URL de API/socket

const URL = process.env.NODE_ENV === "production" ? rotaProd : rotaDev;

export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 5000,
  reconnectionDelayMax: 10000,
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