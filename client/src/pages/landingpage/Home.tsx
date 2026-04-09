import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCcw } from "lucide-react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

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
                </div>

                {/* RIGHT SIDE - fixed width, vertical layout */}
                <div className="w-80 bg-gray-50 p-8">
                    <div className="space-y-2">
                        <h3 className="text-left text-sm font-bold">Join a Game</h3>
                        <p className="text-left text-sm">Enter the game code provided by your host.</p>
                        <InputOTP maxLength={8} className="mb-4">
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Button variant="outline" size="lg" className="w-full">
                            Join Game
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Home;