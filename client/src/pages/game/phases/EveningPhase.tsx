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
        // show countdown in last 5 seconds
    const timer = setTimeout(() => setShowCountdown(true), 20000);
    return () => clearTimeout(timer);
}, []);

    return (
        <div className="flex items-center justify-center bg-orange-950">
            <div className="text-center w-full max-w-md px-6">
                <h1 className="text-3xl font-bold text-white mb-6">🌆 Evening</h1>

                {/* Voting result */}
                {eliminated ? (
                    <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-red-500">
                        <p className="text-gray-400 mb-3">The town has spoken...</p>
                        <div className="flex items-center justify-center gap-4">
                            <img
                                src={eliminated.avatar}
                                className="w-16 h-16 rounded-full grayscale border-2 border-red-500"
                            />
                            <div className="text-left">
                                <p className="text-white font-bold text-xl">{eliminated.name}</p>
                                <p className="text-red-400">was eliminated 💀</p>
                                {eliminated.role && (
                                    <p className="text-gray-400 text-sm">was {eliminated.role}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-yellow-500">
                        <p className="text-yellow-400 font-bold text-xl">🤝 It was a tie!</p>
                        <p className="text-gray-400 mt-2">Nobody was eliminated today</p>
                    </div>
                )}

                {/* Players list */}
                <div className="bg-gray-800 rounded-xl p-4 mb-6">
                    <h2 className="text-white font-semibold mb-3 text-left">Players</h2>
                    <div className="space-y-2">
                        {players.map((player, idx) => (
                            <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg
                                ${player.alive ? "bg-gray-700" : "bg-gray-900 opacity-50"}`}>
                                <img
                                    src={player.avatar}
                                    className={`w-8 h-8 rounded-full ${!player.alive ? "grayscale" : ""}`}
                                />
                                <span className={`flex-1 text-left text-sm
                                    ${player.alive ? "text-white" : "line-through text-gray-500"}`}>
                                    {player.name}
                                </span>
                                <span>{player.alive ? "✅" : "💀"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showCountdown && <NightCountdown seconds={10} />}
        </div>
    );
};

export default EveningPhase;