import { rooms } from "./roomConnectionSocket.js";

export function startGame(socket, io) {
    socket.on("start_game", ({ roomCode }) => {
        const room = rooms[roomCode];

        // ✅ Validation
        if (!room) return socket.emit("error", "Room not found");
        if (room.host !== socket.id) return socket.emit("error", "Only host can start");
        if (room.players.length < 5) return socket.emit("error", "Need at least 5 players");
        if (room.gameState !== "lobby") return socket.emit("error", "Game already started");

        // ✅ Assign roles
        assignRoles(room);

        // ✅ Tell each player their role privately
        room.players.forEach(player => {
            io.to(player.socketId).emit("role_assigned", {
                role: player.role,
                description: getRoleDescription(player.role)
            });
        });
    }
    )
};

function assignRoles(room) {
    const playerCount = room.players.length;

    // For classic mode with 5+ players:
    // 1 Godfather, 1 Mafia, 1 Doctor, 1 Detective, rest are Villagers

    const roles = [];

    // Always include core roles
    roles.push("Godfather");
    roles.push("Mafia");
    roles.push("Doctor");
    roles.push("Detective");

    // Fill rest with Villagers
    const villagersNeeded = playerCount - 4;
    for (let i = 0; i < villagersNeeded; i++) {
        roles.push("Villager");
    }

    // Shuffle using Fisher-Yates
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    // Assign to players
    room.players.forEach((player, index) => {
        player.role = roles[index];
        player.team = getRoleTeam(roles[index]);  // "mafia" or "citizen"
    });
}

function getRoleTeam(roleName) {
    const mafiaRoles = ["Godfather", "Mafia"];
    return mafiaRoles.includes(roleName) ? "mafia" : "citizen";
}

function getRoleDescription(roleName) {
    const descriptions = {
        "Godfather": "Lead the mafia. Choose one person to kill each night.",
        "Mafia": "Work with the Godfather to eliminate citizens.",
        "Doctor": "Save one person from death each night.",
        "Detective": "Investigate one person each night to learn their team.",
        "Villager": "Use your vote wisely to find the mafia."
    };
    return descriptions[roleName] || "";
}