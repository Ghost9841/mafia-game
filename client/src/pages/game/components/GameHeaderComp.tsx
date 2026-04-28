import { toast } from "sonner";

import {  Music, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

type GameHeaderProps = {
  day: number;
  timer: number;
  room?: any;
  roomCode?: string;
};

export const GameHeader = ({
  day,
  timer,
  room,
  roomCode,
}: GameHeaderProps) => {
  const handleCopyCodeToClipBoard = () => {
    navigator.clipboard.writeText(roomCode || "");
    toast.success("Room code copied to clipboard!");
  };
  return (
    <div className="w-full h-12 border-b border-yellow-700 bg-black flex items-center justify-between px-8 relative">

      {/* Left Logo */}
      <div className="text-3xl">🎭</div>

      {/* Center Info */}
      <div className="text-center">
        <h1 className="text-yellow-500 font-bold text-sm">
          DAY: {day}
        </h1>
        <p className="text-yellow-400 text-sm">
          TIME: {timer}s
        </p>
      </div>

      {/* Right Room Code */}
      <div className="rounded-lg text-yellow-400">
        <div className="flex justify-end gap-4">
          <InputOTP maxLength={8} className="mb-4 rounded-none  hover:cursor-pointer" value={roomCode} onClick={handleCopyCodeToClipBoard}>
            <InputOTPGroup className="border border-yellow-600 font-bold text-base">
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
          <Button variant="outline" className="mr-2">
            <Music className="w-4 h-4 mr-1 text-black" />
          </Button>
          <Button className="flex items-center justify-center border border-yellow-700 rounded-lg px-2 py-1 text-sm text-yellow-400">
            <User className="w-4 h-4 mr-1 text-white" />
            {room?.players?.length || 0} / 25
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;