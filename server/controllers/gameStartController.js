import { rooms } from "./roomConnectionSocket.js";



export function startGame(socket, io) {
    socket.on("start_game", ({ roomCode }) => {
        const room = rooms[roomCode];
        console.log("start_game event received for room:", roomCode);
        
        let countdown = 7;
        io.to(roomCode).emit("countdown", { countdown });
        const interval = setInterval(() => {
            countdown--;
            io.to(roomCode).emit("countdown", { countdown });
            
            if (countdown < 0) {
                clearInterval(interval);
                // Broadcast to all players that the game is starting
                io.to(roomCode).emit("game_starting", { message: "Game is starting!" });
            };
        }, 1000);
        
        // ✅ Validation
        if (!room) return socket.emit("error", "Room not found");
        if (room.host !== socket.id) return socket.emit("error", "Only host can start");
        if (room.players.length < 5) return socket.emit("error", "Need at least 5 players");
        if (room.gameState !== "lobby") return socket.emit("error", "Game already started");

    });
};

