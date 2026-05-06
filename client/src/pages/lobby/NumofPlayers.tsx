import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Crown } from 'lucide-react';

type Player = {
  socketId: string;
  name: string;
  avatar?: string;
  alive: boolean;
  host: boolean;
};

export const NumofPlayers = ({ players = [] }: { players: Player[] }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 justify-center">
        <Users className="w-4 h-4 text-white" />
        <h3 className="text-sm font-bold text-white">Players</h3>
        <span className="text-xs text-white">({players.length}/25)</span>
      </div>

      {/* Player List */}
      <PlayerSlots players={players} />
    </div>
  );
};

export default NumofPlayers;





export const PlayerSlots = ({ players = [] }: { players: Player[] }) => {
  return (
    <div className="space-y-2 max-h-[800px] overflow-y-auto pr-1">
      {players.map((player) => (
        <div
          key={player.socketId}
          className={`flex items-center gap-3 p-2 rounded-md border ${player.host
            ? 'border-gray-300 bg-gray-50'
            : 'border-gray-200 bg-white'
            }`}
        >
          {/* Avatar */}
          <div className="w-8 h-8">
            <Avatar className="w-8 h-8">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-600 text-sm font-medium">
                {player.host ? (
                  <Crown className="w-4 h-4" />
                ) : (
                  player.name?.[0]?.toUpperCase()
                )}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">
                {player.name}
              </span>
              {player.host && (
                <span className="text-xs text-gray-500">(Host)</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div
            className={`w-2 h-2 rounded-full ${player.alive ? 'bg-green-500' : 'bg-gray-300'
              }`}
          />
        </div>
      ))}

      {/* Empty State */}
      {players.length === 0 && (
        <div className="text-center text-sm text-gray-400 py-4">
          Waiting for players...
        </div>
      )}
    </div>
  );
};