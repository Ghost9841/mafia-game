import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";

import CreateGameButton from "./CreateGameButton";
import JoinGameButton from "./JoinGameButton";

export const Home = () => {
    return (
        <div className="mx-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Mafia Game!</h1>
            <div className="flex w-full min-h-screen">
                {/* LEFT SIDE */}
                <div className="flex-1 flex flex-col p-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-lg mb-8">
                        <Avatar className="size-24">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                            <Button className="absolute -bottom-1 -right-1 w-9 h-9 bg-black rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all ring-2 ring-gray-200">
                                <RefreshCcw className="w-5 h-5 text-white" />
                            </Button>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                            <h6 className="text-lg text-black font-bold">Agent Name</h6>
                            <Input
                                type="text"
                                placeholder="Enter your Name"
                                className="text-2xl"
                            />
                        </div>
                    </div>

                    {/* Create Game Button - centered */}
                    <CreateGameButton/>
                </div>

                {/* RIGHT SIDE - fixed width, vertical layout */}
                <div className="w-80 bg-gray-50 p-8">
                   <JoinGameButton/>
                </div>
            </div>

        </div>
    )
}
export default Home;