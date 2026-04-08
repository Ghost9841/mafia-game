import { Server } from 'socket.io';


export const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });    
  
  io.on('connection', (socket) => {
        console.log('a user connected');
    });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

}

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};