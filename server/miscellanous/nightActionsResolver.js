export function resolveNight(room) {
    const { mafiaTarget, doctorSave } = room.gameData.nightActions;

    let killedPlayer = null;

    if (mafiaTarget && mafiaTarget !== doctorSave) {
        const player = room.players.find(p => p.socketId === mafiaTarget);
        if (player) {
            player.alive = false;
            killedPlayer = {                    // 👈 replace "killedPlayer = player"
                name: player.name,
                avatar: player.avatar,
                role: room.gameData.revealRoleOnDeath ? player.role : null
            };
        }
    }
    // reset for next night
    room.gameData.nightActions = { mafiaTarget: null, doctorSave: null, detectiveTarget: null };

    return {
        killedPlayer,
        doctorSaved: doctorSave !== null && mafiaTarget === doctorSave // true/false only
    };
}

