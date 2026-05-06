// GameOver.tsx
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
        <div className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "rgba(0,0,0,0.92)" }}
        >
            <div className="text-center w-full max-w-md px-6">

                {/* Winner banner */}
                <div
                    className="mb-8 p-8 rounded-2xl relative overflow-hidden"
                    style={{
                        background: isMafiaWin
                            ? "rgba(127,29,29,0.3)"
                            : "rgba(20,83,45,0.3)",
                        border: isMafiaWin
                            ? "1px solid rgba(239,68,68,0.5)"
                            : "1px solid rgba(34,197,94,0.5)",
                        boxShadow: isMafiaWin
                            ? "0 0 60px rgba(185,28,28,0.2)"
                            : "0 0 60px rgba(21,128,61,0.2)",
                    }}
                >
                    {/* Top gold line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                            background: isMafiaWin
                                ? "linear-gradient(90deg, transparent, rgba(239,68,68,0.8), transparent)"
                                : "linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)",
                        }}
                    />
                    <p className="text-6xl mb-4">{isMafiaWin ? "🔴" : "🟢"}</p>
                    <h1
                        className="text-4xl font-black mb-2 tracking-widest uppercase"
                        style={{ color: isMafiaWin ? "#fca5a5" : "#86efac" }}
                    >
                        {isMafiaWin ? "Mafia Wins" : "Citizens Win"}
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                        {isMafiaWin
                            ? "The mafia has taken over the town..."
                            : "The town has been saved!"}
                    </p>
                </div>

                {/* Final results */}
                <div
                    className="rounded-xl p-5 mb-6"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(201,168,76,0.15)",
                    }}
                >
                    <p
                        className="text-xs tracking-[4px] uppercase mb-4"
                        style={{ color: "#c9a84c" }}
                    >
                        Final Results
                    </p>
                    <div className="space-y-2">
                        {players.map((player, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-2 rounded-lg"
                                style={{
                                    background: player.alive
                                        ? "rgba(255,255,255,0.03)"
                                        : "rgba(0,0,0,0.2)",
                                    border: "1px solid rgba(255,255,255,0.04)",
                                }}
                            >
                                <img
                                    src={player.avatar}
                                    className="w-8 h-8 rounded-full"
                                    style={{
                                        filter: !player.alive ? "grayscale(1) brightness(0.5)" : "none",
                                        border: "1px solid rgba(201,168,76,0.2)",
                                    }}
                                />
                                <span
                                    className="flex-1 text-left text-sm font-medium"
                                    style={{
                                        color: player.alive ? "white" : "rgba(255,255,255,0.3)",
                                        textDecoration: player.alive ? "none" : "line-through",
                                    }}
                                >
                                    {player.name}
                                </span>
                                <span
                                    className="text-xs px-2 py-0.5 rounded"
                                    style={{
                                        color: "rgba(201,168,76,0.7)",
                                        background: "rgba(201,168,76,0.08)",
                                        border: "1px solid rgba(201,168,76,0.15)",
                                    }}
                                >
                                    {player.role}
                                </span>
                                <span className="text-sm">{player.alive ? "✅" : "💀"}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p
                    className="text-xs tracking-widest uppercase animate-pulse"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                >
                    Returning to lobby...
                </p>
            </div>
        </div>
    );
};

export default GameOver;