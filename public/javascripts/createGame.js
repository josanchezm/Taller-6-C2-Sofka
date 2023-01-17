// Getting the players from the posted form
const player1 = document.getElementById('player-1').innerText;
const player2 = document.getElementById('player-2').innerText;
const player3 = document.getElementById('player-3').innerText;

// Getting the lauch button from the HTML
const launches = document.getElementById('launches');
let control = true;

launches.addEventListener('click', () => {
    while(control) {
        const throwing1 = Math.floor(Math.random() * (7 - 1) + 1);
        const throwing2 = Math.floor(Math.random() * (7 - 1) + 1);
        const throwing3 = Math.floor(Math.random() * (7 - 1) + 1);
        const result1 = document.getElementById('throwing-result-1');
        const result2 = document.getElementById('throwing-result-2');
        const result3 = document.getElementById('throwing-result-3');
        result1.innerHTML = `
            <b>Su lanzamiento</b>
            <p>${throwing1}</p>
        `
        result2.innerHTML = `
            <b>Su lanzamiento</b>
            <p>${throwing2}</p>
        `
        result3.innerHTML = `
            <b>Su lanzamiento</b>
            <p>${throwing3}</p>
        `
        result1.style.opacity = 1;
        result2.style.opacity = 1;
        result3.style.opacity = 1;

        const throwings = [throwing1, throwing2, throwing3];
        const throwingsSorted = [...throwings].sort((a, b) => a-b);
        
        if(throwingsSorted[2] === throwingsSorted[1]) {
            Swal.fire({
                title: `Hay un empate entre jugadores!
                Lanzamientos: 
                ${player1}: ${throwing1} ${player2}: ${throwing2} ${player3}: ${throwing3}
                Lanzando de nuevo...`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
        } else {
            const players = [
                {id: 1, player: player1, bet: throwing1},
                {id: 2, player: player2, bet: throwing2},
                {id: 3, player: player3, bet: throwing3}
            ];
            const biggerNumber = Math.max(...throwings);
            console.log(biggerNumber);
            const winnerPlayer = players.find(element => element.bet === biggerNumber);
            const winner = document.getElementById('winner');
            winner.innerHTML = `
                <h2>Ganador</h2>
                <h3>${winnerPlayer.player}<h3>
                <h3>Lanzamiento: ${winnerPlayer.bet}</h3>
            `
            winner.style.opacity = 1;
            control = false;

            // POST request for the form to be stored into the DB
            const postForm = async (req, res) => {
                try {
                    const response = await axios.post('http://localhost:8080/createGame', {
                        "players": [
                            {id: players[0].id, name: players[0].player, bet: players[0].bet},
                            {id: players[1].id, name: players[1].player, bet: players[1].bet},
                            {id: players[2].id, name: players[2].player, bet: players[2].bet}
                        ],
                        "inProgress": false,
                        "winner": winnerPlayer
                    });
                    if (response.status === 200) {
                        console.log(response);
                        // Getting the saved records on the DB
                        const getForm = async (req, res) => {
                            try {
                                const response = await axios.get('http://localhost:8080/createGame');
                                if (response.status === 200) {
                                    console.log(response);
                                    const game = document.getElementById('findRecord');
                                    let data = response.data;
                                    game.innerHTML = `
                                        <a href="http://localhost:8080/game/${data[data.length - 1]._id}">Query para consultar el juego y su estado</a>
                                    `
                                    game.style.opacity = 1;
                                    console.log(data[data.length - 1]._id);
                                    const winner = document.getElementById('findWinner');
                                    winner.innerHTML = `
                                        <a href="http://localhost:8080/game/${data[data.length - 1]._id}/winner">Query para determinar el ganador del juego</a>
                                    `
                                    winner.style.opacity = 1;
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                        getForm();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            postForm();
        }
    }
});
