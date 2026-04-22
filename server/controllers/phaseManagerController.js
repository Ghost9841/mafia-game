import { resolveNight } from "../miscellanous/nightActionsResolver.js";

export function startPhaseManager(io, roomCode, room) {
    // phase order:
    // night (30s) → day (60s) → voting (30s) → repeat
    function startNight() {
        room.gameData.currentPhase = "night";

        // 1. Tell EVERYONE night has started
        io.to(roomCode).emit("phase_change", { phase: "night" });

        // 2. Tell each role what to do privately
        // mafia needs: list of alive citizens to pick from
        // doctor needs: list of alive players to save
        // detective needs: list of alive players to investigate

        room.players
            .filter(p => p.alive)
            .forEach(player => {
                if (mafiaRoles.includes(player.role)) {
                    io.to(player.socketId).emit("night_action", {
                        message: "Choose someone to eliminate",
                        targets: room.players
                            .filter(p => p.alive && !mafiaRoles.includes(p.role)) // 👈 only citizens
                            .map(p => ({ socketId: p.socketId, name: p.name, avatar: p.avatar }))
                    });
                } else if (player.role === "Doctor") {
                    io.to(player.socketId).emit("night_action", {
                        message: "Choose someone to save",
                        targets: room.players
                            .filter(p => p.alive)
                            .map(p => ({ socketId: p.socketId, name: p.name, avatar: p.avatar }))
                    });
                } else if (player.role === "Detective") {
                    io.to(player.socketId).emit("night_action", {
                        message: "Choose someone to investigate",
                        targets: room.players
                            .filter(p => p.alive && !mafiaRoles.includes(p.role))
                            .map(p => ({ socketId: p.socketId, name: p.name, avatar: p.avatar }))
                    });
                }
            });
        setTimeout(() => {
            const nightResult = resolveNight(room);
            startDay(nightResult);
        }, 30000);
    }
    startNight();

    function startDay(nightResult) {
        room.gameData.currentPhase = "day";

        // 1. Tell EVERYONE day has started + night results
        io.to(roomCode).emit("phase_change", { phase: "day", nightResult });

        // 2. After 60s, start voting phase
        setTimeout(() => {
            startVoting();
        }, 60000);
    }
    
}

