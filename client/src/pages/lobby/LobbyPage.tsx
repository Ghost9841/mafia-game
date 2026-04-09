import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { socket } from "@/services/server";
import { useState } from "react";

export const LobbyPage = () => {
    const [msg,setMsg] = useState("");
    const [servermsg,setServerMsg] = useState("");

    const sendMessage = () => {
        socket.emit("send_message", {
            message: msg,
            room: "123"
        })
    }

    return (
        <div className="mx-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Mafia Game Lobby</h1>
            <div className="flex w-full min-h-screen">
                {/* LEFT SIDE */}
                <div className="flex-1 flex flex-col p-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-lg mb-8">
                        <Avatar className="size-24">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h6 className="text-lg text-black font-bold">Agent Name</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default LobbyPage;
