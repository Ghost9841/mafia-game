import { useState } from 'react';
import { Plus, Minus, Users, User, Crown } from 'lucide-react';

export const NumofPlayers = () => {
  const [playerCount, setPlayerCount] = useState(8);

  const increment = () => {
    if (playerCount < 25) {
      setPlayerCount(playerCount + 1);
    }
  };

  const decrement = () => {
    if (playerCount > 5) {
      setPlayerCount(playerCount - 1);
    }
  };


  return (
    <div className="">
      {/* Players Grid */}
        <div className="flex items-center gap-2 mb-3 justify-center">
          <Users className="w-4 h-4 text-black" />
          <h3 className="text-sm font-bold text-black">Players</h3>
          <span className="text-xs text-black">({playerCount}/25)</span>
        </div>            
      {/* Counter controls */}
      <div className="flex items-center justify-center gap-4 my-4">
        <button 
          onClick={decrement}
          disabled={playerCount <= 5}
          className={`p-2 border rounded-lg transition-colors ${
            playerCount <= 5 
              ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="text-lg font-bold w-16 text-center">
          {playerCount}
        </span>
        
        <button 
          onClick={increment}
          disabled={playerCount >= 25}
          className={`p-2 border rounded-lg transition-colors ${
            playerCount >= 25 
              ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <PlayerSlots playerCount={playerCount} />
    </div>
  );
}

export default NumofPlayers;


export const PlayerSlots = ({playerCount=8}: {playerCount: number}) => {
  
  // Generate player slots based on count
  const getPlayerSlots = () => {
    const slots = [];
    for (let i = 0; i < playerCount; i++) {
      slots.push({
        id: i,
        name: i === 0 ? 'You' : `Player ${i + 1}`,
        isHost: i === 0,
        isReady: i === 0,
        isEmpty: i > 0
      });
    }
    return slots;
  };

  const playerSlots = getPlayerSlots();

  return (

<>
      {/* Players Grid */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 ">
        {playerSlots.map((player, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-3 p-2 rounded-md border ${
              player.isHost 
                ? 'border-gray-300 bg-gray-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              player.isHost 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {player.isHost ? <Crown className="w-4 h-4" /> : idx + 1}
            </div>
            
            {/* Name */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  player.isHost ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {player.name}
                </span>
                {player.isHost && (
                  <span className="text-xs text-gray-500">(Host)</span>
                )}
              </div>
              {player.isEmpty && !player.isHost && (
                <p className="text-xs text-gray-400">Waiting to join...</p>
              )}
            </div>

            {/* Status indicator */}
            {player.isReady ? (
              <div className="w-2 h-2 rounded-full bg-green-500" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            )}
          </div>
        ))}
      </div>
      </>
  );
};

