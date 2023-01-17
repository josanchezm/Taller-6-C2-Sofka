const express = require('express');
const router = express.Router();
const Game = require('../models/createGame');

// Obtains all the game records in the database 
router.get('/', async (req, res) => {
    try {
        const savedGames = await Game.find();
        res.status(200).json(savedGames);
    } catch (error) {
        res.json({ message: error });
    }
})

// Post a new game to the database
router.post('/', async(req, res) => {
    const newGame = new Game({
        players: req.body.players,
        inProgress: req.body.inProgress,
        winner: req.body.winner
    })
    try {
        const savedGame = await newGame.save();
        res.status(200).json(savedGame);
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;