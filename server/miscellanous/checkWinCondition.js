import { citizenRoles, mafiaRoles } from "./assignRoles.js";

export function checkWinCondition(players) {
    const alivePlayers = players.filter(p => p.alive);

    const mafiaCount = alivePlayers.filter(p => mafiaRoles.includes(p.role)).length;
    const citizenCount = alivePlayers.filter(p => citizenRoles.includes(p.role)).length;

    if (mafiaCount === 0) return "citizens";  // all mafia dead
    if (mafiaCount >= citizenCount) return "mafia";  // mafia outnumbers/equals citizens
    return null;
}