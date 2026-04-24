import { Server } from 'socket.io';
import { joinRoom } from '../controllers/roomConnectionSocket.js';
import { chatSocket } from '../controllers/chatSocket.js';
import { startGame } from '../controllers/gameStartController.js';
import { selectPresetController } from '../controllers/selectPresetController.js';
import nightActionController from '../controllers/nightActionController.js';
import submitVoteController from '../controllers/submitVoteController.js';


export const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.LOCALHOST_URL,process.env.CLIENT_URL_GITHUB,process.env.PROD_CLIENT_URL],
      methods: ["GET", "POST"]
    }
  });    
  
  io.on('connection', (socket) => {
      console.log('a user connected');
      chatSocket(socket);
      joinRoom(socket,io);
      selectPresetController(socket,io);
      startGame(socket,io);
      nightActionController(socket,io);
      submitVoteController(socket,io);
    });

server.listen(3000,"0.0.0.0", () => {
  console.log('server running at http://localhost:3000');
});

}

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};