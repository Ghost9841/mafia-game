import { rooms } from "./roomConnectionSocket.js";

export function selectPresetController(socket, io) {
    socket.on("select_preset", ({ roomCode, selectedPresets }) => {
        const room = rooms[roomCode];
        if (!room) return socket.emit("error", "Room not found");
        if (room.host !== socket.id) return socket.emit("error", "Only host can select presets");

        room.selectedPresets = selectedPresets;
        
        io.to(roomCode).emit("preset_selected", { selectedPresets });
    });
}