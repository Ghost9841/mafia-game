import { mafiaRoles } from "../miscellanous/assignRoles.js";
import { rooms } from "./roomConnectionSocket.js";

export function nightActionController(socket, io) {
    socket.on("night_action", ({ roomCode, targetId }) => {
        const room = rooms[roomCode];
        const player = room.players.find(p => p.socketId === socket.id);
        if (!player || !player.alive) return;
        if (room.gameData.currentPhase !== "night") return; // 👈 guard!

        if (mafiaRoles.includes(player.role)) {
            room.gameData.nightActions.mafiaTarget = targetId;
        } else if (player.role === "Doctor") {
            room.gameData.nightActions.doctorSave = targetId;
        } else if (player.role === "Detective") {
            room.gameData.nightActions.detectiveTarget = targetId;
            // 👇 send result privately back to detective only
            const investigated = room.players.find(p => p.socketId === targetId);
            const isMafia = mafiaRoles.includes(investigated.role);
            socket.emit("detective_result", {
                name: investigated.name,
                isMafia
            });
        }
    });
}
export default nightActionController;