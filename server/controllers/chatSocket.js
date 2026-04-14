
export const chatSocket = (socket) => {
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message",data)
    });
};

