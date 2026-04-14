import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "@/services/server";

export const CreateGameButton = ({ username, avatarUrl }: { username: string, avatarUrl: string }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createGame = () => {
        socket.connect();
        setLoading(true);

        socket.emit("create_room", {
            playerName: username,
            avatarUrl: avatarUrl || "https://github.com/shadcn.png",
            host: true,
        });

        socket.on("room_created", (room) => {
            // Save room locally (important)
            localStorage.setItem("roomCode", room.roomCode);

            navigate(`/lobby/${room.roomCode}`, {
                state: {
                    username,
                    room
                }
            });
        });
    };
    return (
        <div className="flex flex-col justify-center items-center gap-1 bg-gray-50 p-8 rounded-2xl">
            <Button
                size="icon-lg"
                variant="outline"
                className="rounded-full disabled:opacity-100"
                aria-label="Create Game"
                disabled
            >
                <Plus />
            </Button>
            <h3 className="text-sm font-bold">Host Your Game</h3>
            <p className="text-sm">Create a new game and invite your friends to play.</p>
            <Button variant="outline" size="lg" onClick={createGame}>
                {loading ? "Creating..." : "Create Game"}
            </Button>
        </div>
    )
};

export default CreateGameButton;