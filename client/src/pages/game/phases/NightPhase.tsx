// NightPhase.tsx
import { useState, useEffect } from "react";
import { socket } from "@/services/server";

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
    roomCode: string;
}

export const NightPhase = ({ targets, role, roomCode }: NightPhaseProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [detectiveResult, setDetectiveResult] = useState<DetectiveResult | null>(null);

    useEffect(() => {
        socket.on("detective_result", ({ name, isMafia }: DetectiveResult) => {
            setDetectiveResult({ name, isMafia });
        });
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
        socket.emit("night_action", { roomCode, targetId: selected });
        setSubmitted(true);
    };

    if (role === "Villager") {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="text-center text-white">
                    <h1 className="text-3xl font-bold mb-4">🌙 Night Phase</h1>
                    <p className="text-[rgba(255,255,255,0.4)]">The town is asleep...<br />something stirs in the dark</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full h-full px-4 py-6">
            {/* Header */}
            <h2
                className="text-lg font-bold tracking-[4px] mb-6"
                style={{ color: "#c9a84c" }}
            >
                PHASE
            </h2>

            {!submitted ? (
                <>
                    {/* Card Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-lg">
                        {targets.map((target) => {
                            const isSelected = selected === target.socketId;
                            return (
                                <div
                                    key={target.socketId}
                                    onClick={() => setSelected(target.socketId)}
                                    className="relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200"
                                    style={{
                                        height: "160px",
                                        border: isSelected
                                            ? "2px solid #9333ea"
                                            : "2px solid rgba(180,30,30,0.6)",
                                        boxShadow: isSelected
                                            ? "0 0 20px rgba(147,51,234,0.5), inset 0 0 20px rgba(147,51,234,0.1)"
                                            : "0 0 10px rgba(180,30,30,0.3)",
                                        background: isSelected
                                            ? "rgba(88,28,135,0.3)"
                                            : "rgba(20,0,0,0.6)",
                                        transform: isSelected ? "scale(1.04)" : "scale(1)",
                                    }}
                                >
                                    {/* Avatar as background */}
                                    <img
                                        src={target.avatar}
                                        alt={target.name}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        style={{
                                            filter: isSelected
                                                ? "brightness(1.1)"
                                                : "brightness(0.75) saturate(1.2)",
                                        }}
                                    />

                                    {/* Gradient overlay at bottom */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 30%, transparent 70%)",
                                        }}
                                    />

                                    {/* Selected glow overlay */}
                                    {isSelected && (
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: "rgba(147,51,234,0.15)",
                                            }}
                                        />
                                    )}

                                    {/* Name at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                                        <p
                                            className="text-sm font-bold truncate"
                                            style={{
                                                color: isSelected ? "#c084fc" : "#e9b50b",
                                                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                                            }}
                                        >
                                            {target.name}
                                        </p>
                                    </div>

                                    {/* Selected checkmark */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Action info + confirm */}
                    <div className="w-full max-w-lg space-y-3">
                        <p
                            className="text-center text-sm tracking-widest uppercase"
                            style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                            {getMessage()}
                        </p>
                        <button
                            onClick={handleSubmit}
                            disabled={!selected}
                            className="w-full py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-all"
                            style={{
                                background: selected
                                    ? "linear-gradient(135deg, #7f1d1d, #991b1b)"
                                    : "rgba(255,255,255,0.05)",
                                color: selected ? "white" : "rgba(255,255,255,0.2)",
                                border: selected
                                    ? "1px solid rgba(239,68,68,0.5)"
                                    : "1px solid rgba(255,255,255,0.08)",
                                boxShadow: selected ? "0 0 20px rgba(185,28,28,0.3)" : "none",
                                cursor: selected ? "pointer" : "not-allowed",
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                    <div
                        className="p-6 rounded-xl"
                        style={{
                            border: "1px solid rgba(233,181,11,0.2)",
                            background: "rgba(255,255,255,0.02)",
                        }}
                    >
                        <p className="text-2xl mb-2">✅</p>
                        <p className="text-white font-medium">Action submitted</p>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
                            Waiting for others...
                        </p>
                    </div>

                    {/* Detective result */}
                    {detectiveResult && (
                        <div
                            className="p-4 rounded-xl w-full max-w-xs"
                            style={{
                                background: detectiveResult.isMafia
                                    ? "rgba(127,29,29,0.4)"
                                    : "rgba(20,83,45,0.4)",
                                border: detectiveResult.isMafia
                                    ? "1px solid rgba(239,68,68,0.4)"
                                    : "1px solid rgba(34,197,94,0.4)",
                            }}
                        >
                            <p className="font-bold text-white">
                                {detectiveResult.name} is{" "}
                                {detectiveResult.isMafia ? "🔴 Mafia!" : "🟢 Innocent"}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NightPhase;