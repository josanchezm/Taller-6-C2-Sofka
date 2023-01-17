const express = require('express');
const router = express.Router();
const Game = require('../models/startGame');

router.post('/', async(req, res) => {
    const newPost = new Game({
        gamerBet: req.body.gamerBet
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;