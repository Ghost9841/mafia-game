import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import RoleReveal from "./phases/RoleReveal";
import NightPhase from "./phases/NightPhase";
import DayPhase from "./phases/DayPhase";
import VotingPhase from "./phases/VotingPhase";

export const GamePage = () => {
  const { state } = useLocation();
  const { room } = state || {};

  const [phase, setPhase] = useState("role");

  useEffect(() => {
    // Later this will come from backend
  }, []);

  return (
    <div>
      {phase === "role" && <RoleReveal />}
      {phase === "night" && <NightPhase />}
      {phase === "day" && <DayPhase />}
      {phase === "voting" && <VotingPhase />}
    </div>
  );
};