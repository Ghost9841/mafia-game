// DayPhase.tsx

type KilledPlayer = {
    name: string;
    avatar: string;
    role: string | null;
}

type NightResult = {
    killedPlayer: KilledPlayer | null;
    doctorSaved: boolean;
}

type Player = {
    name: string;
    avatar: string;
    alive: boolean;
}

type DayPhaseProps = {
    nightResult: NightResult | null;
    players: Player[];
}

export const DayPhase = ({ nightResult, players }: DayPhaseProps) => {

    const getAnnouncement = () => {
        if (!nightResult) return null;
        if (nightResult.doctorSaved)
            return "🧪 Doctor saved someone! Uff uff uff, such a guardian angel!";
        if (nightResult.killedPlayer)
            return `💀 ${nightResult.killedPlayer.name} was killed last night!`;
        return "😴 The mafia didn't kill anyone... they must be lazy!";
    };

    return (
        <div className="flex items-center justify-center bg-amber-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-4 text-center">☀️ Day Phase</h1>

                {/* Night result announcement */}
                {nightResult && (
                    <div className={`p-4 rounded-lg mb-6 text-center font-medium ${nightResult.killedPlayer
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                        {getAnnouncement()}
                        {/* Show killed player card if role is revealed */}
                        {nightResult.killedPlayer && (
                            <div className="flex items-center justify-center gap-3 mt-3">
                                <img
                                    src={nightResult.killedPlayer.avatar}
                                    className="w-10 h-10 rounded-full grayscale"
                                />
                                <div className="text-left">
                                    <p className="font-bold">{nightResult.killedPlayer.name}</p>
                                    {nightResult.killedPlayer.role && (
                                        <p className="text-sm">was {nightResult.killedPlayer.role}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Alive players */}
                <h2 className="text-lg font-semibold mb-3">Players</h2>
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {players.map((player, idx) => (
                        <div key={idx} className={`flex items-center gap-2 p-3 rounded-lg border
                            ${player.alive
                                ? "border-gray-200 bg-gray-50"
                                : "border-gray-100 bg-gray-100 opacity-50"
                            }`}>
                            <img
                                src={player.avatar}
                                className={`w-8 h-8 rounded-full ${!player.alive ? "grayscale" : ""}`}
                            />
                            <div>
                                <p className={`text-sm font-medium ${!player.alive ? "line-through text-gray-400" : ""}`}>
                                    {player.name}
                                </p>
                                {!player.alive && <p className="text-xs text-gray-400">💀 Dead</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayPhase;