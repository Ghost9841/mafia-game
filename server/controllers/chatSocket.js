
export const chatSocket = (socket) => {
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    });

    socket.on("update_will", ({ roomCode, willText }) => {
        const room = rooms[roomCode];
        if (!room) return;

        const player = room.players.find(p => p.socketId === socket.id);
        if (!player || !player.alive) return;

        room.gameData.wills[socket.id] = willText;
        socket.emit("will_saved");
    });
};

