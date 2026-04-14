
export const chatSocket = (socket) => {
    socket.on("send_message", (data) => {
        io.to(data.room).emit("receive_message", data);
    });
};

