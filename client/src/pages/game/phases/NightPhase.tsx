// NightPhase.tsx
import { useState, useEffect } from "react";
import { socket } from "@/services/server";
import { useLocation } from "react-router-dom";

type Target = {
    socketId: string;
    name: string;
    avatar: string;
}

type DetectiveResult = {
    name: string;
    isMafia: boolean;
}

type NightPhaseProps = {
    targets: Target[];
    role: string;
}

export const NightPhase = ({ targets, role }: NightPhaseProps) => {
    const { state } = useLocation();
    const { room } = state || {};

    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [detectiveResult, setDetectiveResult] = useState<DetectiveResult | null>(null);

    useEffect(() => {
        socket.on("detective_result", ({ name, isMafia }: DetectiveResult) => {
            setDetectiveResult({ name, isMafia });
        });
         console.log("NightPhase mounted, targets:", targets);
        return () => { socket.off("detective_result"); };
    }, [targets]);

    const getMessage = () => {
        if (role === "Mafia" || role === "GodFather") return "Choose someone to eliminate";
        if (role === "Doctor") return "Choose someone to save";
        if (role === "Detective") return "Choose someone to investigate";
        return null;
    };

    const handleSubmit = () => {
        if (!selected) return;
        socket.emit("night_action", {
            roomCode: room.roomCode,
            targetId: selected
        });
        setSubmitted(true);
    };

    if (role === "Villager") {
        return (
            <div className="flex items-center justify-center bg-gray-900">
                <div className="text-center text-white">
                    <h1 className="text-3xl font-bold mb-4">🌙 Night Phase</h1>
                    <p className="text-gray-400">The town is asleep... something stirs in the dark</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-white text-center">🌙 Night Phase</h1>
                <p className="text-gray-400 text-center mb-6">{getMessage()}</p>

                {!submitted ? (
                    <>
                        <div className="space-y-2 mb-6">
                            {targets.map(target => (
                                <div
                                    key={target.socketId}
                                    onClick={() => setSelected(target.socketId)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                                        ${selected === target.socketId
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                        }`}
                                >
                                    <img src={target.avatar} className="w-8 h-8 rounded-full" />
                                    <span>{target.name}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!selected}
                            className="w-full py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
                        >
                            Confirm
                        </button>
                    </>
                ) : (
                    <div className="text-center text-gray-400">
                        <p>✅ Action submitted. Waiting for others...</p>
                        {detectiveResult && (
                            <div className={`mt-4 p-3 rounded-lg ${detectiveResult.isMafia
                                    ? "bg-red-900 text-red-200"
                                    : "bg-green-900 text-green-200"
                                }`}>
                                <p>{detectiveResult.name} is {detectiveResult.isMafia ? "🔴 Mafia!" : "🟢 Innocent"}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NightPhase;