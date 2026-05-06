import { assignRoles } from "../miscellanous/assignRoles.js";
import { startPhaseManager } from "./phaseManagerController.js";
import { rooms } from "./roomConnectionSocket.js";


export function startGame(socket, io) {
    socket.on("start_game", ({ roomCode }) => {
        const room = rooms[roomCode];
        console.log("start_game event received for room:", roomCode);
        // ✅ Validation
        // if (!room) return socket.emit("error", "Room not found");
        // if (room.host !== socket.id) return socket.emit("error", "Only host can start");
        // if (room.players.length < 5) return socket.emit("error", "Need at least 5 players");
        // if (room.gameState !== "lobby") return socket.emit("error", "Game already started");

        let countdown = 5;
        io.to(roomCode).emit("countdown", { countdown });
        const interval = setInterval(() => {
            countdown--;
            io.to(roomCode).emit("countdown", { countdown });

            if (countdown < 0) {
                clearInterval(interval);
                assignRoles(room.players);

                for (const player of room.players) {
                    io.to(player.socketId).emit("game_started", {
                        role: player.role,
                        players: room.players.map(p => ({ name: p.name, avatar: p.avatar, alive: p.alive }))
                    });
                };
                // give frontend time to mount GamePage
                setTimeout(() => {
                    console.log("Starting phase manager for room:", roomCode); // 👈
                    console.log("Room players:", room?.players?.map(p => p.name)); // 👈
                    startPhaseManager(io, roomCode, room);
                }, 3000);
            };
        }, 1000);

    });
};

