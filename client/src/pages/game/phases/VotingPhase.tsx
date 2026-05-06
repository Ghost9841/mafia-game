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
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-center">🗳️ Voting Phase</h1>
                <p className="text-gray-500 text-center mb-6">
                    Who do you think is Mafia? Vote to eliminate.
                </p>

                {!submitted ? (
                    <>
                        <div className="space-y-2 mb-6">
                            {targets.map(target => (
                                <div
                                    key={target.socketId}
                                    onClick={() => setSelected(target.socketId)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2
                                        ${selected === target.socketId
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <img src={target.avatar} className="w-10 h-10 rounded-full" />
                                    <span className="font-medium">{target.name}</span>
                                    {selected === target.socketId && (
                                        <span className="ml-auto text-red-500">☠️ Selected</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleVote}
                            disabled={!selected}
                            className="w-full py-3 bg-red-600 text-white font-bold rounded-lg disabled:opacity-50 hover:bg-red-700"
                        >
                            Confirm Vote
                        </button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-2xl mb-2">✅</p>
                        <p className="font-medium text-gray-700">Vote submitted!</p>
                        <p className="text-gray-400 text-sm mt-2">Waiting for others to vote...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VotingPhase;