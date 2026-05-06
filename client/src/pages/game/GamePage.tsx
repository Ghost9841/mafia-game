import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import RoleReveal from "./phases/RoleReveal";
import NightPhase from "./phases/NightPhase";
import DayPhase from "./phases/DayPhase";
import VotingPhase from "./phases/VotingPhase";
import { socket } from "@/services/server";
import GameOver from "./phases/GameOver";
import EveningPhase from "./phases/EveningPhase";
import LeftSidebarPlayerComp from "./components/LeftBarPlayerComp";
import GameHeader from "./components/GameHeaderComp";
import GameLogComp from "./components/GameLogComp";
import PPMChatComp from "./components/PPMChatComp";

export const GamePage = () => {
  const { state } = useLocation();
  const { role, players, roomCode, username  } = state || {};

  const [phase, setPhase] = useState("role");
  const [nightResult, setNightResult] = useState(null);    // who died last night
  const [voteTargets, setVoteTargets] = useState([]);      // who can be voted out
  const [nightTargets, setNightTargets] = useState([]);    // who can be targeted at night
  const [alivePlayers, setAlivePlayers] = useState(players); // track who's alive
  const [winner, setWinner] = useState<string | null>(null);
  const [finalPlayers, setFinalPlayers] = useState([]); // 👈 new state for game over
  const [eliminated, setEliminated] = useState(null);
  const [gameLogs, setGameLogs] = useState<any[]>([]); // track game events
  const [timer, setTimer] = useState(0);
  const [dayCount, setDayCount] = useState(1);

  useEffect(() => {
    socket.on("phase_change", ({ phase, nightResult, targets, eliminated, phaseTimer, dayCount }) => {
      console.log("Phase change received:", phase, nightResult, targets, eliminated, phaseTimer, dayCount); // 👈 add this
      if (phase === "night") setNightTargets([]);
      setPhase(phase);
      if (dayCount !== undefined) setDayCount(dayCount); // 👈 guard
      if (phaseTimer !== undefined) setTimer(phaseTimer); // 👈 guard
      if (eliminated) setEliminated(eliminated);
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
          // Log the death
          setGameLogs((prev) => [
            ...prev,
            {
              phase: `${phase.charAt(0).toUpperCase() + phase.slice(1)}`,
              events: [`${nightResult.killedPlayer.name} was killed during the night.`],
            },
          ]);
        }
      }
      if (targets) setVoteTargets(targets);
    });

    socket.on("night_action", ({ message, targets }) => {
      console.log("night_action received:", targets, message); // 👈 add this
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
    <div className="min-h-screen">

      {/* ROLE REVEAL ONLY */}
      {phase === "role" ? (
        <RoleReveal
          role={role}
          onComplete={() => setPhase("night")}
        />
      ) : (
        <>
          <div className="min-h-screen bg-[#080808] overflow-hidden flex flex-col">
            <GameHeader              
              day={dayCount}
              timer={timer}
              roomCode={roomCode}
              playerCount={players?.length}
            />

            <div className="flex-1 overflow-hidden flex gap-4 min-h-0">
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
              <div className="fixed w-[700px] min-h-[calc(100vh-100px)] pointer-events-none z-0 bg-[radial-gradient(circle,rgba(160,0,0,0.2)_0%,transparent_70%)]" />    {/* LEFT SIDEBAR */}
              <LeftSidebarPlayerComp
                players={alivePlayers}
                currentPlayerName={role?.name || "You"}
              />

              {/* CENTER CONTENT */}
              <div className="flex-1 flex items-center justify-center relative z-10 overflow-y-auto">
                {phase === "night" && <NightPhase targets={nightTargets} role={role} roomCode={roomCode} />}
                {phase === "day" && <DayPhase nightResult={nightResult} players={alivePlayers} />}
                {phase === "voting" && <VotingPhase targets={voteTargets} roomCode={roomCode} />}
                {phase === "evening" && <EveningPhase eliminated={eliminated} players={alivePlayers} />}
                {winner && <GameOver winner={winner} players={finalPlayers} />}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="w-120 border-l border-yellow-700 relative z-0 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto min-h-0">
                  <GameLogComp logs={gameLogs} />
                </div>
                <div className="flex-shrink-0 border-t border-yellow-700">
                  <PPMChatComp role={"Mafia"} username={username} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;