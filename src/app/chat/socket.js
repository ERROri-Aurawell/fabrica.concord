import { io } from 'socket.io-client';

const rotaDev = process.env.NEXT_PUBLIC_SOCKET_URL_DEV;
const rotaProd = process.env.NEXT_PUBLIC_SOCKET_URL_PROD;

const URL = process.env.NODE_ENV === "development" ? rotaDev : rotaProd;

export const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: false
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