import { Button } from "@/components/ui/button";
import { NumofPlayers } from "./NumofPlayers";
import { ArrowLeft, Music } from "lucide-react";
import PresetCustomSettings from "./PresetsCustomSettings";
import { ChatBox } from "./ChatBox";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@/services/server";

export const LobbyPage = () => {
  const location = useLocation();
  const { username, avatarUrl,room } = location.state || {};
    const [players, setPlayers] = useState(room?.players || []);
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

            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <Music className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </div>
          {/* THREE BOXES - side by side */}
          <div className="flex gap-6">
            {/* Box 1 */}
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <NumofPlayers players={players} />      
            </div>

            {/* Box 2 */}
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <PresetCustomSettings />
            </div>

            {/* Box 3 */}
            <div className="flex-1 ">
              <ChatBox username={username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LobbyPage;