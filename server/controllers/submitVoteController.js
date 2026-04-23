import { rooms } from "./roomConnectionSocket.js";

export function submitVoteController(socket, io) {
    socket.on("submit_vote", ({ roomCode, targetId }) => {
        const room = rooms[roomCode];
        const player = room.players.find(p => p.socketId === socket.id);
        
        if (!player || !player.alive) return;
        if (room.gameData.currentPhase !== "voting") return;
        
        // prevent double voting
        const alreadyVoted = room.gameData.votes.find(v => v.voterId === player.socketId);
        if (alreadyVoted) return;
        
        room.gameData.votes.push({
            voterId: player.socketId,
            targetId: targetId
        });
    });
}
export default submitVoteController;