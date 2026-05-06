// EveningPhase.tsx
import { useEffect, useState } from "react";
import NightCountdown from "../components/NightCountdownComp";

type EliminatedPlayer = {
    name: string;
    avatar: string;
    role: string | null;
}

type Player = {
    name: string;
    avatar: string;
    alive: boolean;
}

type EveningPhaseProps = {
    eliminated: EliminatedPlayer | null;
    players: Player[];
}

export const EveningPhase = ({ eliminated, players }: EveningPhaseProps) => {
    const [showCountdown, setShowCountdown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCountdown(true), 20000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-full px-4 py-6">

            {/* Header */}
            <h2
                className="text-lg font-bold tracking-[4px] mb-6"
                style={{ color: "#c9a84c" }}
            >
                EVENING
            </h2>

            {/* Voting result */}
            {eliminated ? (
                <div
                    className="w-full max-w-lg p-6 rounded-xl mb-6"
                    style={{
                        background: "rgba(127,29,29,0.25)",
                        border: "1px solid rgba(239,68,68,0.4)",
                    }}
                >
                    <p
                        className="text-center text-sm tracking-widest uppercase mb-4"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                        The town has spoken...
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="relative">
                            <img
                                src={eliminated.avatar}
                                className="w-16 h-16 rounded-full grayscale"
                                style={{ border: "2px solid rgba(239,68,68,0.6)" }}
                            />
                            <div
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                                style={{ background: "#7f1d1d" }}
                            >
                                💀
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-white font-bold text-xl">{eliminated.name}</p>
                            <p style={{ color: "rgba(239,68,68,0.8)" }}>was eliminated</p>
                            {eliminated.role && (
                                <p
                                    className="text-sm mt-1"
                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                >
                                    was {eliminated.role}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="w-full max-w-lg p-6 rounded-xl mb-6 text-center"
                    style={{
                        background: "rgba(161,138,0,0.15)",
                        border: "1px solid rgba(233,181,11,0.3)",
                    }}
                >
                    <p className="text-2xl mb-2">🤝</p>
                    <p className="text-white font-bold text-xl">It was a tie!</p>
                    <p style={{ color: "rgba(255,255,255,0.4)" }} className="mt-2 text-sm">
                        Nobody was eliminated today
                    </p>
                </div>
            )}

            {/* Players grid */}
            <div className="w-full max-w-lg">
                <p
                    className="text-xs tracking-[4px] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    Players
                </p>
                <div className="grid grid-cols-3 gap-3">
                    {players.map((player, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-xl overflow-hidden"
                            style={{
                                height: "100px",
                                border: player.alive
                                    ? "1px solid rgba(201,168,76,0.2)"
                                    : "1px solid rgba(255,255,255,0.05)",
                                opacity: player.alive ? 1 : 0.4,
                            }}
                        >
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    filter: player.alive
                                        ? "brightness(0.7)"
                                        : "grayscale(1) brightness(0.35)",
                                }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 35%, transparent 70%)",
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-1 text-center">
                                <p
                                    className="text-xs font-bold truncate"
                                    style={{
                                        color: player.alive ? "#c9a84c" : "rgba(255,255,255,0.25)",
                                        textDecoration: player.alive ? "none" : "line-through",
                                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {player.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showCountdown && <NightCountdown seconds={10} />}
        </div>
    );
};

export default EveningPhase;