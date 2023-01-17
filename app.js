const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const mongoose = require('mongoose');
require('dotenv/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting the static files
app.use(express.static('public')); // Setting the public directory
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/javascripts', express.static(__dirname + '/public/javascripts'));

// Set views
app.set('views', './views');
app.set('view engine', 'ejs'); 

// Import routes

// Create Game
const createGameRoute = require('./routes/createGame');
app.use('/createGame', createGameRoute); // Every time we go to createGame, make sure to use the createGameRoute

// Game
const gameRoute = require('./routes/game');
app.use('/game', gameRoute);

// Start Game
const startGameRoute = require('./routes/startGame');
app.use('/startGame', startGameRoute);

// ROUTES
app.get('/', (req, res) => res.render('index'));
app.post('/postedGameForm', (req, res) => res.render('game', {
    player1: req.body.jugador1,
    player2: req.body.jugador2,
    player3: req.body.jugador3,
}));

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected to DB!'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}/ `));