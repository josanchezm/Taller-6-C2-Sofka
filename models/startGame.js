const mongoose = require('mongoose');
let control = true;
const game = () => {
    while (control) {
        const gamerBet = [
            {id: 1, bet: Math.floor(Math.random() * (7 - 1) + 1)},
            {id: 2, bet: Math.floor(Math.random() * (7 - 1) + 1)},
            {id: 3, bet: Math.floor(Math.random() * (7 - 1) + 1)},
        ]
        const bets = [];
        gamerBet.forEach(element => bets.push(element.bet));
        const throwingsSorted = [...bets].sort((a, b) => a-b);
        if(throwingsSorted[2] === throwingsSorted[1]) {
            console.log('Tirando de nuevo por empate entre jugadores...');
        } else {
            const biggerNumber = Math.max(...bets);
            const winnerPlayer = gamerBet.find(element => element.bet === biggerNumber);
            control = false;
            return [gamerBet, winnerPlayer];
        }
    }
}
control = true;
const gameResult = game();

const PostSchema = mongoose.Schema({
    "type": {
        type: String,
        default: "throw dice game",
    },
    "gamerBet": {
        type: Array,
        default: gameResult[0],
        required: true,
    },
    "inProgress": {
        type: Boolean,
        default: false,
    },
    "winner": {
        type: Object,
        default: gameResult[1],
    }
})

module.exports = mongoose.model('PostedGame', PostSchema);