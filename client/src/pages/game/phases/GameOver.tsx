import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "@/services/server";

type Player = {
    name: string;
    avatar: string;
    alive: boolean;
    role: string;
}

type GameOverProps = {
    winner: string;
    players: Player[];
}

export const GameOver = ({ winner, players }: GameOverProps) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { username } = state || {};

    const isMafiaWin = winner === "mafia";

    useEffect(() => {
        socket.on("room_updated", (updatedRoom) => {
            navigate("/lobby", {
                state: { username, room: updatedRoom }
            });
        });
        return () => { socket.off("room_updated"); };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-center">
                <div className={`mb-8 p-6 rounded-2xl ${isMafiaWin
                        ? "bg-red-900 border border-red-500"
                        : "bg-green-900 border border-green-500"
                    }`}>
                    <p className="text-6xl mb-4">{isMafiaWin ? "🔴" : "🟢"}</p>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {isMafiaWin ? "Mafia Wins!" : "Citizens Win!"}
                    </h1>
                    <p className="text-gray-300">
                        {isMafiaWin
                            ? "The mafia has taken over the town..."
                            : "The town has been saved!"}
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 mb-6 max-w-md mx-auto">
                    <h2 className="text-white font-bold mb-4">Final Results</h2>
                    <div className="space-y-2">
                        {players.map((player, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700">
                                <img
                                    src={player.avatar}
                                    className={`w-8 h-8 rounded-full ${!player.alive ? "grayscale" : ""}`}
                                />
                                <span className={`flex-1 text-left ${!player.alive
                                        ? "line-through text-gray-400"
                                        : "text-white"
                                    }`}>
                                    {player.name}
                                </span>
                                <span className="text-xs text-gray-400">{player.role}</span>
                                <span>{player.alive ? "✅" : "💀"}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-gray-400 text-sm animate-pulse">
                    Returning to lobby...
                </p>
            </div>
        </div>
    );
};

export default GameOver;