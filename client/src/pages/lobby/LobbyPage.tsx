import { useEffect, useState } from "react";

import { NumofPlayers } from "./NumofPlayers";
import PresetCustomSettings from "./PresetsCustomSettings";
import { ChatBox } from "./ChatBox";
import { socket } from "@/services/server";


import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export const LobbyPage = () => {
  const location = useLocation();
  const { username,room } = location.state || {};
  const [players, setPlayers] = useState(room?.players || []);

  const [code] = useState(room?.roomId || []);
  const handleCopyCodeToClipBoard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Room code copied to clipboard!");
  };

  useEffect(() => {
    socket.on("room_updated", (updatedRoom) => {
      setPlayers(updatedRoom.players);
    });

    return () => {
      socket.off("room_updated");
    };
  }, []);
  return (
    <div className="flex-1 relative flex overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto w-full p-4">
        {/* MAIN BOX */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-3 items-center mb-6">
            <div className="flex justify-start">
              <Button onClick={() => navigation.navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            </div>

            <h1 className="text-2xl font-bold text-center">
              Game Lobby
            </h1>

            <div className="flex justify-end gap-4">
              <InputOTP maxLength={8} className="mb-4 hover:cursor-pointer" value={code} onClick={handleCopyCodeToClipBoard}>
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
              <Button variant="outline" className="mr-2">
                <Music className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </div>
          {/* THREE BOXES - side by side */}
          <div className="flex gap-6">
            {/* Box 1 */}
            <div className="w-80 border border-gray-200 rounded-lg p-4">
              <NumofPlayers players={players} />      
            </div>

            {/* Box 2 */}
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <PresetCustomSettings />
            </div>

            {/* Box 3 */}
            <div className="w-80 ">
              <ChatBox username={username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LobbyPage;