import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import RoleReveal from "./phases/RoleReveal";
import NightPhase from "./phases/NightPhase";
import DayPhase from "./phases/DayPhase";
import VotingPhase from "./phases/VotingPhase";

export const GamePage = () => {
  const { state} = useLocation();
  const { username, room , role, players } = state || {};
  

  const [phase, setPhase] = useState("role");

  useEffect(() => {
    // Later this will come from backend
  }, []);

  return (
    <div>
      {phase === "role" && <RoleReveal role={role} onComplete={()=> setPhase("night")} />}
      {phase === "night" && <NightPhase />}
      {phase === "day" && <DayPhase />}
      {phase === "voting" && <VotingPhase />}
    </div>
  );
};

export default GamePage;