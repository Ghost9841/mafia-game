
const roles = ["Mafia", "Detective", "Doctor", "GodFather", "Villager"];
export const mafiaRoles = ["GodFather", "Mafia"];
export const citizenRoles = ["Doctor", "Detective", "Villager"];

export function assignRoles(players) {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // build roles array based on player count
    const baseRoles = ["Mafia", "Detective", "Doctor", "GodFather"];
    const filledRoles = [...baseRoles];
    
    // fill remaining slots with Villager
    while (filledRoles.length < players.length) {
        filledRoles.push("Villager");
    }

    const shuffledRoles = shuffleArray(filledRoles);

    for (let i = 0; i < players.length; i++) {
        players[i].role = shuffledRoles[i];
    }
    return players;
}