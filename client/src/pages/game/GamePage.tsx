import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import RoleReveal from "./phases/RoleReveal";
import NightPhase from "./phases/NightPhase";
import DayPhase from "./phases/DayPhase";
import VotingPhase from "./phases/VotingPhase";
import { socket } from "@/services/server";
import GameOver from "./phases/GameOver";

export const GamePage = () => {
  const { state } = useLocation();
  const { username, room, role, players } = state || {};

  const [phase, setPhase] = useState("role");
  const [nightResult, setNightResult] = useState(null);    // who died last night
  const [voteTargets, setVoteTargets] = useState([]);      // who can be voted out
  const [nightTargets, setNightTargets] = useState([]);    // who can be targeted at night
  const [alivePlayers, setAlivePlayers] = useState(players); // track who's alive
  const [winner, setWinner] = useState<string | null>(null);
  const [finalPlayers, setFinalPlayers] = useState([]); // 👈 new state for game ove
  // r
  useEffect(() => {
    socket.on("phase_change", ({ phase, nightResult, targets }) => {
      setPhase(phase);
      if (nightResult) {
        setNightResult(nightResult);
        // update alive players list
        if (nightResult.killedPlayer) {
          setAlivePlayers((prev: any[]) =>
            prev.map(p =>
              p.name === nightResult.killedPlayer.name
                ? { ...p, alive: false }
                : p
            )
          );
        }
      }
      if (targets) setVoteTargets(targets);
    });

    socket.on("night_action", ({ message, targets }) => {
      setNightTargets(targets); // your private action targets
    });

    socket.on("game_over", ({ winner, finalPlayers }) => {
      setWinner(winner);
      setFinalPlayers(finalPlayers); // 👈 new state
    });


    return () => {
      socket.off("phase_change");
      socket.off("night_action");
    };
  }, []);

  return (
    <div>
      {phase === "role" && <RoleReveal role={role} onComplete={() => setPhase("night")} />}
      {phase === "night" && <NightPhase targets={nightTargets} role={role} />}
      {phase === "day" && <DayPhase nightResult={nightResult} players={alivePlayers} />}
      {phase === "voting" && <VotingPhase targets={voteTargets} />}
      {winner && <GameOver winner={winner} players={finalPlayers} />}

    </div>
  );
};

export default GamePage;