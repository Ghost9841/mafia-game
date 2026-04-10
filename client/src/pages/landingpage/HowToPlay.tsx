// HowToPlaySimple.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const gameSteps = [
    {
        title: "🎭 Get Your Role",
        description: "At least 5 players must join to start the game. You can get your role in the lobby setup.",
        emoji: "🎭",
        bg: "bg-purple-100"
    },
    {
        title: "🌙 Night Time",
        description: "Everyone goes to sleep. You'll be prompted for actions specific to your role.",
        emoji: "🌙",
        bg: "bg-blue-100"
    },
    {
        title: "☀️ Daytime",
        description: "Who died is revealed. Everyone discusses who the Mafia might be.",
        emoji: "☀️",
        bg: "bg-yellow-100"
    },
    {
        title: "⚖️ Voting",
        description: "Nominate someone to the stand, then vote to lynch or spare them.",
        emoji: "⚖️",
        bg: "bg-red-100"
    },
    {
        title: "🔄 Game Continues",
        description: "Game continues until all threats are eliminated or one side wins.",
        emoji: "🔄",
        bg: "bg-green-100"
    }
];

export const HowToPlay = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="mt-6">
            <h2 className="text-sm font-bold text-center mb-4">HOW TO PLAY</h2>
            <div className={`${gameSteps[step].bg} rounded-xl p-4 transition-all`}>
                <div className="text-6xl text-center mb-3">
                    {gameSteps[step].emoji}
                </div>
                <h4 className="font-bold text-center mb-2">
                    {gameSteps[step].title}
                </h4>
                <p className="text-sm text-center text-gray-700 mb-4">
                    {gameSteps[step].description}
                </p>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setStep((s) => (s - 1 + 5) % 5)}
                        className="flex-1"
                    >
                        <ChevronLeft className="w-3 h-3" />
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setStep((s) => (s + 1) % 5)}
                        className="flex-1"
                    >
                        <ChevronRight className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default HowToPlay;