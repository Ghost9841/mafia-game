import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { socket } from "@/services/server";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const JoinGameButton = ({ username, avatarUrl }: { username: string, avatarUrl: string }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");
    const joinRoom = () => {
        socket.connect();
        setLoading(true);
        socket.emit("join_room", {
            roomCode: roomCode,
            playerName: username,
            avatarUrl: avatarUrl || "https://github.com/shadcn.png",
        })
        socket.on("room_updated", (room) => {
            localStorage.setItem("roomCode", room.roomCode);
            navigate(`/lobby/${room.roomCode}`, {
                state: {
                    username,
                    avatarUrl,
                    room
                }
            });
        });
    };
    const handleOTPRoomCodeChange = (value: string) => {
        setRoomCode(value);
    };

    return (
        <div className="space-y-2">
            <h3 className="text-left text-sm font-bold">Join a Game</h3>
            <p className="text-left text-sm">Enter the game code provided by your host.</p>
            <InputOTP maxLength={8} className="mb-4" value={roomCode} onChange={handleOTPRoomCodeChange}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                </InputOTPGroup>
            </InputOTP>
            <Button
                onClick={joinRoom}
                variant="outline"
                size="lg"
                className="w-full">
                Join Game
            </Button>
        </div>
    )
};

export default JoinGameButton;