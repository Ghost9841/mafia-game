import { useEffect, useState } from "react";

import backCard from "@/assets/cards/back_mafia.png";
import mafiaImg from "@/assets/cards/mafia.png";
import doctorImg from "@/assets/cards/Doctor.png";
import detectiveImg from "@/assets/cards/detective.png";
import villagerImg from "@/assets/cards/Citizen.png";
import godfatherImg from "@/assets/cards/GodFather.png";
const roleImages: Record<string, string> = {
  Mafia: mafiaImg,
  Doctor: doctorImg,
  Detective: detectiveImg,
  Villager: villagerImg,
  GodFather: godfatherImg,
};

export const RoleReveal = ({ role, onComplete }: { role: string; onComplete: () => void }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      setTimeout(() => onComplete(), 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const handleReveal = () => {
    setRevealed(true);
    setTimeout(() => onComplete(), 3000); // Short delay to allow user to see the revealed role 
  };
  return (
    <>
        <div className="min-h-screen bg-[#080808] relative overflow-hidden flex-col gap-4">
      
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

      {/* Glow */}
      <div className="fixed -bottom-50 -left-25 w-175 h-175 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(160,0,0,0.2)_0%,transparent_70%)]" />

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
    </div>
    </>
  );
};

export default RoleReveal;