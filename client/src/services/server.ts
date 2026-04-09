import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5173";

export const socket = io(URL, {
  autoConnect: false
});