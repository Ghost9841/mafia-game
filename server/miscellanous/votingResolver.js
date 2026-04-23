function resolveVoting(room) {
    const voteCounts = {};
    room.gameData.votes.forEach(vote => {
        voteCounts[vote.targetId] = (voteCounts[vote.targetId] || 0) + 1;
    });
    // find the socketId with most votes
    const eliminated = Object.entries(voteCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0];
    
    if (eliminated) {
        const player = room.players.find(p => p.socketId === eliminated);
        if (player) {
            player.alive = false;
            return {        // 👈 return eliminated player info
                name: player.name,
                avatar: player.avatar,
                role: room.gameData.revealRoleOnDeath ? player.role : null
            };
        }
    }
    
    room.gameData.votes = []; // reset
    return null; // no one eliminated
}
export default resolveVoting;