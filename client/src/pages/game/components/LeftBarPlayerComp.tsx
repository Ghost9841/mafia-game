import { Crown, Skull } from "lucide-react";

type Player = {
  socketId: string;
  name: string;
  avatar?: string;
  alive: boolean;
  host?: boolean;
};

type LeftSidebarPlayerCompProps = {
  players: Player[];
  currentPlayerName: string;
};

export const LeftSidebarPlayerComp = ({
  players,
  currentPlayerName,
}: LeftSidebarPlayerCompProps) => {
  return (
    <div className="w-14 h-[554px] bg-[#080808] border-r border-yellow-700 flex flex-col items-center py-4 gap-4">
      {/* Player List */}
      {players.map((player) => {
        const isYou = player.name === currentPlayerName;

        return (
          <div
            key={player.socketId}
            className="relative flex flex-col items-center"
          >
            {/* Avatar */}
            <div
              className={`
                w-8 h-8 rounded-full overflow-hidden border-2
                ${
                  isYou
                    ? "border-yellow-400 scale-110"
                    : player.alive
                    ? "border-gray-500"
                    : "border-red-700 opacity-50"
                }
              `}
            >
              <img
                src={player.avatar || "https://github.com/shadcn.png"}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dead Icon */}
            {!player.alive && (
              <Skull className="absolute -top-1 -right-1 w-4 h-4 text-red-500 bg-black rounded-full" />
            )}

            {/* Host Crown */}
            {player.host && (
              <Crown className="absolute -bottom-1 -right-1 w-4 h-4 text-yellow-400 bg-black rounded-full" />
            )}

            {/* You Label */}
            {isYou && (
              <span className="text-[10px] text-yellow-400 mt-1">YOU</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeftSidebarPlayerComp;