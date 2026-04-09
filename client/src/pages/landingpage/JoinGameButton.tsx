import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export const JoinGameButton = () => {

    const joinRoom = () => {
        
    }
    return (
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
    )
};

export default JoinGameButton;