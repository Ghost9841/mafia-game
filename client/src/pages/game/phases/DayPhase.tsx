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
        <div className="flex flex-col items-center w-full h-full px-4 py-6">

            {/* Header */}
            <h2
                className="text-lg font-bold tracking-[4px] mb-6"
                style={{ color: "#c9a84c" }}
            >
                DAY PHASE
            </h2>

            {/* Night result announcement */}
            {nightResult && (
                <div
                    className="w-full max-w-lg p-5 rounded-xl mb-6 text-center font-medium"
                    style={{
                        background: nightResult.killedPlayer
                            ? "rgba(127,29,29,0.3)"
                            : "rgba(20,83,45,0.3)",
                        border: nightResult.killedPlayer
                            ? "1px solid rgba(239,68,68,0.4)"
                            : "1px solid rgba(34,197,94,0.4)",
                    }}
                >
                    <p className="text-white text-base mb-3">{getAnnouncement()}</p>

                    {/* Show killed player card if role is revealed */}
                    {nightResult.killedPlayer && (
                        <div className="flex items-center justify-center gap-3 mt-3">
                            <img
                                src={nightResult.killedPlayer.avatar}
                                className="w-12 h-12 rounded-full grayscale"
                                style={{ border: "2px solid rgba(239,68,68,0.5)" }}
                            />
                            <div className="text-left">
                                <p className="font-bold text-white">{nightResult.killedPlayer.name}</p>
                                {nightResult.killedPlayer.role && (
                                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        was {nightResult.killedPlayer.role}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Players grid */}
            <div className="w-full max-w-lg">
                <p
                    className="text-xs tracking-[4px] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    Players
                </p>
                <div className="grid grid-cols-3 gap-3">
                    {players.map((player, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-xl overflow-hidden"
                            style={{
                                height: "120px",
                                border: player.alive
                                    ? "1px solid rgba(201,168,76,0.25)"
                                    : "1px solid rgba(255,255,255,0.05)",
                                opacity: player.alive ? 1 : 0.4,
                            }}
                        >
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    filter: player.alive
                                        ? "brightness(0.75) saturate(1.1)"
                                        : "grayscale(1) brightness(0.4)",
                                }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 35%, transparent 70%)",
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                                <p
                                    className="text-xs font-bold truncate"
                                    style={{
                                        color: player.alive ? "#c9a84c" : "rgba(255,255,255,0.3)",
                                        textDecoration: player.alive ? "none" : "line-through",
                                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {player.name}
                                </p>
                                {!player.alive && (
                                    <p className="text-xs" style={{ color: "rgba(239,68,68,0.7)" }}>💀</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayPhase;