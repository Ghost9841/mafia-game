import { mafiaRoles } from "../miscellanous/assignRoles.js";
import checkWinCondition from "../miscellanous/checkWinCondition.js";
import { resolveNight } from "../miscellanous/nightActionsResolver.js";
import resolveVoting from "../miscellanous/votingResolver.js";

export function startPhaseManager(io, roomCode, room) {

    function startNight() {
        console.log("startNight called, dayCount:", room.gameData.dayCount); // 👈
        room.gameData.currentPhase = "night";
        io.to(roomCode).emit("phase_change", {
            phase: "night",
            phaseTimer: 30,
            dayCount: room.gameData.dayCount
        });

        room.players.filter(p => p.alive).forEach(player => {
            if (mafiaRoles.includes(player.role)) {
                io.to(player.socketId).emit("night_action", {
                    message: "Choose someone to eliminate",
                    targets: room.players
                        .filter(p => p.alive && !mafiaRoles.includes(p.role))
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
                        .filter(p => p.alive && p.socketId !== player.socketId)
                        .map(p => ({ socketId: p.socketId, name: p.name, avatar: p.avatar }))
                });
            }
        });

        setTimeout(() => {
            const nightResult = resolveNight(room);
            startDay(nightResult);
        }, 30000);
    }

    function startDay(nightResult) {
        room.gameData.currentPhase = "day";
        io.to(roomCode).emit("phase_change", {
            phase: "day", nightResult, phaseTimer: 60, dayCount: room.gameData.dayCount
        });

        setTimeout(() => {
            startVoting();
        }, 60000);
    }

    function startVoting() {
        room.gameData.currentPhase = "voting";
        io.to(roomCode).emit("phase_change", {
            phase: "voting",
            dayCount: room.gameData.dayCount,
            phaseTimer: 30,
            targets: room.players
                .filter(p => p.alive)
                .map(p => ({ socketId: p.socketId, name: p.name, avatar: p.avatar })),
        });

        let resolved = false; // 👈 prevent double resolution

        const resolveEarly = () => {
            if (resolved) return; // already resolved
            resolved = true;
            clearTimeout(votingTimer); // cancel the 30s timer
            io.removeListener("all_votes_cast_internal", resolveEarly); // cleanup
            resolveAndMoveOn();
        };

        // listen for all votes cast
        // we use a custom internal event via room object
        room.gameData.onAllVotesCast = resolveEarly; // 👈 store callback on room

        // 30 second fallback timer
        const votingTimer = setTimeout(() => {
            resolveEarly();
        }, 30000);

        function resolveAndMoveOn() {
            const eliminated = resolveVoting(room);
            room.gameData.currentPhase = "evening";
            io.to(roomCode).emit("phase_change", {
                phase: "evening", eliminated, phaseTimer: 30, dayCount: room.gameData.dayCount
            });

            setTimeout(() => {
                const result = checkWinCondition(room.players);
                if (result) {
                    io.to(roomCode).emit("game_over", {
                        winner: result,
                        finalPlayers: room.players.map(p => ({
                            name: p.name, avatar: p.avatar, alive: p.alive, role: p.role
                        }))
                    });
                    room.gameState = "lobby";
                    room.gameData = {
                        nightActions: { mafiaTarget: null, doctorSave: null, detectiveTarget: null },
                        currentPhase: null,
                        dayCount: 1,
                        revealRoleOnDeath: false,
                        votes: []
                    };
                    room.players.forEach(p => { p.role = null; p.alive = true; });
                    io.to(roomCode).emit("room_updated", room);
                } else {
                    room.gameData.dayCount++;
                    startNight();
                }
            }, 30000);
        }
    }
    startNight();
}