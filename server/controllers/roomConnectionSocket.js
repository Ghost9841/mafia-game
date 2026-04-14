const rooms = {}; // store all rooms (temporary memory DB)

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export const joinRoom = (socket, io) => {

  // 🔹 Create Room
  socket.on("create_room", (data) => {
    const roomCode = generateRoomCode();

    const newRoom = {
      roomCode,
      roomId: roomCode,
      host: socket.id,
      players: [
        {
          socketId: socket.id,
          name: data.hostName,
          avatar: data.avatarUrl,
          alive: true,
          role: null
        }
      ],
      gameState: "lobby",
      createdAt: Date.now()
    };

    rooms[roomCode] = newRoom;

    socket.join(roomCode);

    socket.emit("room_created", newRoom);

    console.log("Room created:", roomCode);
  });


  // 🔹 Join Room
  socket.on("join_room", ({ roomCode, playerName, avatarUrl }) => {
    const room = rooms[roomCode];

    if (!room) {
      return socket.emit("error", "Room not found");
    }

    room.players.push({
      socketId: socket.id,
      playerName,
      avatar: avatarUrl || "https://github.com/shadcn.png",
      alive: true,
      role: null
    });

    socket.join(roomCode);

    io.to(roomCode).emit("room_joined", room);

    console.log(`${socket.id} joined ${roomCode}`);
  });


  // 🔹 Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // (optional) remove player from rooms
  });
};