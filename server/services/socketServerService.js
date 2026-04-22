import { Server } from 'socket.io';
import { joinRoom } from '../controllers/roomConnectionSocket.js';
import { chatSocket } from '../controllers/chatSocket.js';
import { startGame } from '../controllers/gameStartController.js';
import { selectPresetController } from '../controllers/selectPresetController.js';


export const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173","https://refactored-engine-67447vx7pq5cr567-5173.app.github.dev/"  ],
      methods: ["GET", "POST"]
    }
  });    
  
  io.on('connection', (socket) => {
      console.log('a user connected');
      chatSocket(socket);
      joinRoom(socket,io);
      selectPresetController(socket,io);
      startGame(socket,io);
    });

server.listen(3000,"0.0.0.0", () => {
  console.log('server running at http://localhost:3000');
});

}

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};