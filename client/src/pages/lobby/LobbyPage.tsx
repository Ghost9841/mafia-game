import { useEffect, useState } from "react";

import { NumofPlayers } from "./NumofPlayers";
import PresetCustomSettings from "./PresetsCustomSettings";
import { ChatBox } from "./ChatBox";
import CountDownComponent from "./CountDownComponent";
import { socket } from "@/services/server";


import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSound  from "@/hooks/useSound";



export const LobbyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, room } = location.state || {};

  const [players, setPlayers] = useState(room?.players || []);
  const [code] = useState(room?.roomId || []);
  const isHost = room.host === socket.id;
  const [countdown, setCountdown] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const {  toggleMute, isMuted } = useSound();

  const handleCopyCodeToClipBoard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Room code copied to clipboard!");
  };

  const slashStartGame = () => {
    socket.emit("start_game", { roomCode: room.roomCode });

  };

  const handlePresentChange = (preset: string) => {
    socket.emit("select_preset", {
      roomCode: room.roomCode,
      selectedPresets: preset
    });
  }

  useEffect(() => {
    socket.on("room_updated", (updatedRoom) => {
      setPlayers(updatedRoom.players);
    });

    socket.on("countdown", ({ countdown }) => {
      setIsVisible(true);
      setCountdown(countdown);
    });

    socket.on("game_started", ({ role, players }) => {
      setCountdown(0); // hide countdown
      navigate("/startgame", {
        state: { username, roomCode: room.roomCode, role, players }
      }); // or trigger game screen
    });
    return () => {
      socket.off("countdown");
      socket.off("game_started");
      socket.off("room_updated");
    };
  }, []);

  return (
    <>
       <div className="min-h-screen bg-[#080808] relative overflow-hidden text-white flex-col gap-4">
      
      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glow */}
      <div className="fixed -bottom-50 -left-25 w-175 h-175 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(160,0,0,0.2)_0%,transparent_70%)]" />

    <div className="flex-1 relative flex overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto w-full p-4">
        {/* MAIN BOX */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-3 items-center mb-6">
            <div className="flex justify-start">
              <Button onClick={() => navigate("/")}>
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
              <Button onClick={toggleMute} className="mr-2 text-black" variant={"outline"}>
                {isMuted
                  ? <VolumeX className="w-4 h-4" />
                  : <Volume2 className="w-4 h-4" />
                }
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
              <PresetCustomSettings
                isHost={isHost}
                onPresetChange={handlePresentChange} />
            </div>

            {/* Box 3 */}
            <div className="w-80 ">
              <ChatBox username={username} />
            </div>
          </div>
          {isHost ? (
            <Button
            onClick={slashStartGame}
            className="text-center mt-6">
              Start Game
            </Button>
          ) : (
            <div className="text-center mt-6 text-gray-500">
              <span className="inline-block animate-spin">⟳</span> Waiting for host to start the game...
            </div>
          )}
          {isVisible && (
            <CountDownComponent seconds={countdown} />
          )}
        </div>
      </div>
    </div>
    </div>
            </>
  );
}
export default LobbyPage;