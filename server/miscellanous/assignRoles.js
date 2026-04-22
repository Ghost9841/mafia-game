
const roles = ["Mafia", "Detective", "Doctor", "GodFather", "Villager"];
export const mafiaRoles = ["GodFather", "Mafia"];
export const citizenRoles = ["Doctor", "Detective", "Villager"];

export function assignRoles(players) {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // swap
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledRoles = shuffleArray([...roles]); // shuffle first

    for (let i = 0; i < players.length; i++) {
        players[i].role = shuffledRoles[i];   // then assign
    }
    return players;
}