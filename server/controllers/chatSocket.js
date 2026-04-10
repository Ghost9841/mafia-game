
export const chatSocket = (socket) => {
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
};

