// submitVoteController.js
import { rooms } from "./roomConnectionSocket.js";

export function submitVoteController(socket, io) {
    socket.on("submit_vote", ({ roomCode, targetId }) => {
        const room = rooms[roomCode];
        if (!room) return;

        const player = room.players.find(p => p.socketId === socket.id);
        if (!player || !player.alive) return;

        // only allow voting during voting phase
        if (room.gameData.currentPhase !== "voting") return;

        // validate target player
        const target = room.players.find(p => p.socketId === targetId);
        if (!target || !target.alive) return;

        // prevent double voting
        const alreadyVoted = room.gameData.votes.find(
            v => v.voterId === player.socketId
        );
        if (alreadyVoted) return;

        // store vote
        room.gameData.votes.push({
            voterId: player.socketId,
            targetId
        });

        // optional: emit vote progress (useful for UI)
        const alivePlayers = room.players.filter(p => p.alive);
        io.to(roomCode).emit("vote_progress", {
            voted: room.gameData.votes.length,
            total: alivePlayers.length
        });

        // check if all alive players have voted
        const votedIds = new Set(
            room.gameData.votes.map(v => v.voterId)
        );

        const allVoted = alivePlayers.every(p =>
            votedIds.has(p.socketId)
        );

        if (allVoted) {
            room.gameData.currentPhase = "resolving_votes";
            io.to(roomCode).emit("all_votes_cast"); // still tell clients

            // trigger early resolution in phaseManager
            if (room.gameData.onAllVotesCast) {
                room.gameData.onAllVotesCast(); // 👈 call the callback
                room.gameData.onAllVotesCast = null; // cleanup
            }
        }
    });
}

export default submitVoteController;