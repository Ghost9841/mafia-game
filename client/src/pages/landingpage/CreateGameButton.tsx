import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
export const CreateGameButton = () => {
    return (
           <div className="flex flex-col justify-center items-center gap-1 bg-gray-50 p-8 rounded-2xl">
                        <Button
                            size="icon-lg"
                            variant="outline"
                            className="rounded-full disabled:opacity-100"
                            aria-label="Create Game"
                            disabled
                        >
                            <Plus />
                        </Button>
                        <h3 className="text-sm font-bold">Host Your Game</h3>
                        <p className="text-sm">Create a new game and invite your friends to play.</p>
                        <Button variant="outline" size="lg">
                            Create Game
                        </Button>
                    </div>
    )
};

export default CreateGameButton;