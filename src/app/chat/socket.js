import { io } from 'socket.io-client';

//const URL = process.env.NODE_ENV === "production" ? undefined : "https://apiconcord.dev.vilhena.ifro.edu.br";
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:9000";
export const socket = io(URL, { autoConnect: false });

export default socket;
// This socket connection can be used throughout the application to handle real-time events.