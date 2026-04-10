import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_SERVER_URL || "https://refactored-engine-67447vx7pq5cr567-3000.app.github.dev/";

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});