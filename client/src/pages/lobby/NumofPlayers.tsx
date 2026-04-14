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
        <Users className="w-4 h-4 text-black" />
        <h3 className="text-sm font-bold text-black">Players</h3>
        <span className="text-xs text-black">({players.length}/25)</span>
      </div>

      {/* Player List */}
      <PlayerSlots players={players} />
    </div>
  );
};

export default NumofPlayers;





export const PlayerSlots = ({ players = [] }: { players: Player[] }) => {
  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
      {players.map((player, idx) => (
        <div
          key={player.socketId}
          className={`flex items-center gap-3 p-2 rounded-md border ${
            player.host
              ? 'border-gray-300 bg-gray-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          {/* Avatar */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              player.host
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {player.host ? (
              <Crown className="w-4 h-4" />
            ) : (
              player.name?.[0]?.toUpperCase()
            )}
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
            className={`w-2 h-2 rounded-full ${
              player.alive ? 'bg-green-500' : 'bg-gray-300'
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