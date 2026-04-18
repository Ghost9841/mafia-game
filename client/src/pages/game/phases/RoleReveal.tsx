import { useEffect, useState } from "react";

import backCard from "@/assets/cards/back_mafia.png";
import mafiaImg from "@/assets/cards/mafia.png";
import doctorImg from "@/assets/cards/Doctor.png";
import detectiveImg from "@/assets/cards/detective.png";
import villagerImg from "@/assets/cards/Citizen.png";

const roleImages: Record<string, string> = {
  Mafia: mafiaImg,
  Doctor: doctorImg,
  Detective: detectiveImg,
  Villager: villagerImg,
};

export const RoleReveal = ({ role }: { role: string }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const handleReveal = () => {
    setRevealed(true);
  };
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      
      <div className="text-center">
        <h2 className="text-white text-xl mb-4 font-bold">
          {revealed ? `You are ${role}` : "Tap to reveal your role"}
        </h2>

        <img
          src={revealed ? roleImages[role] : backCard}
          alt="card"
          onClick={handleReveal}
          className="w-64 h-96 object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
        />

      </div>
    </div>
  );
};

export default RoleReveal;