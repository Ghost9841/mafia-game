// VotingPhase.tsx
import { useState } from "react";
import { socket } from "@/services/server";

type Target = {
    socketId: string;
    name: string;
    avatar: string;
}

type VotingPhaseProps = {
    targets: Target[];
    roomCode: string;
}

export const VotingPhase = ({ targets, roomCode }: VotingPhaseProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleVote = () => {
        if (!selected) return;
        socket.emit("submit_vote", {
            roomCode: roomCode,
            targetId: selected
        });
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col items-center w-full h-full px-4 py-6">

            {/* Header */}
            <h2
                className="text-lg font-bold tracking-[4px] mb-2"
                style={{ color: "#c9a84c" }}
            >
                VOTE
            </h2>
            <p
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.25)" }}
            >
                Who is the Mafia?
            </p>

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
                                            ? "2px solid #dc2626"
                                            : "2px solid rgba(180,30,30,0.4)",
                                        boxShadow: isSelected
                                            ? "0 0 20px rgba(220,38,38,0.5), inset 0 0 20px rgba(220,38,38,0.1)"
                                            : "0 0 10px rgba(180,30,30,0.2)",
                                        background: isSelected
                                            ? "rgba(127,29,29,0.3)"
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
                                                ? "brightness(1.0) saturate(1.3)"
                                                : "brightness(0.7) saturate(1.1)",
                                        }}
                                    />

                                    {/* Gradient overlay */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 30%, transparent 70%)",
                                        }}
                                    />

                                    {/* Selected red overlay */}
                                    {isSelected && (
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: "rgba(220,38,38,0.12)" }}
                                        />
                                    )}

                                    {/* Name */}
                                    <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                                        <p
                                            className="text-sm font-bold truncate"
                                            style={{
                                                color: isSelected ? "#fca5a5" : "#e9b50b",
                                                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                                            }}
                                        >
                                            {target.name}
                                        </p>
                                    </div>

                                    {/* Selected skull */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                                            <span className="text-white text-xs">☠</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Confirm button */}
                    <div className="w-full max-w-lg">
                        <button
                            onClick={handleVote}
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
                            Confirm Vote
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
                        <p className="text-white font-medium">Vote submitted!</p>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
                            Waiting for others to vote...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VotingPhase;