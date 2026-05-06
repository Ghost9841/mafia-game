export const rooms = {}; // store all rooms (temporary memory DB)

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
          name: data.playerName,
          avatar: data.avatarUrl,
          alive: true,
          host: true,
          role: null
        }
      ],
      gameState: "lobby",
      selectedPresets: null,
      gameData: {
        nightActions: {
          mafiaTarget: null,
          doctorSave: null,
          detectiveTarget: null
        },
        currentPhase: null,
        phaseTimer: null,
        dayCount: 1,
        revealRoleOnDeath: false,
        onAllVotesCast : null, // callback to trigger when all votes are in
        votes:[],
      }, 
      createdAt: Date.now()
    };

    rooms[roomCode] = newRoom;

    socket.join(roomCode);

    socket.emit("room_created", newRoom);
    console.log("Room created:", roomCode);
    io.to(roomCode).emit("room_updated", newRoom);
  });


  // 🔹 Join Room
  socket.on("join_room", ({ roomCode, playerName, avatarUrl }) => {
    const room = rooms[roomCode];

    if (!room) {
      return socket.emit("error", "Room not found");
    }

    room.players.push({
      socketId: socket.id,
      name: playerName,
      avatar: avatarUrl || "https://github.com/shadcn.png",
      alive: true,
      host: false,
      role: null
    });

    socket.join(roomCode);

    io.to(roomCode).emit("room_joined", room);

    io.to(roomCode).emit("roomMaAayo", {
      message: `${playerName} has joined the room`
    });

    io.to(roomCode).emit("room_updated", room);

    console.log(`${socket.id} joined ${roomCode}`);
  });


  // 🔹 Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // (optional) remove player from rooms
  });
};

