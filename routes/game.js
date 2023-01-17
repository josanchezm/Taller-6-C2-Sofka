const express = require('express');
const router = express.Router();
const Post = require('../models/createGame');

// Request for getting a specific record form the DB
router.get('/:postId', async(req, res) => {
    try {
        const game = await Post.findById(req.params.postId);
        res.status(200).json(game);
    } catch (error) {
        res.json({message: error});
    }
});
router.get('/:postId/winner', async(req, res) => {
    try {
        const game = await Post.findById(req.params.postId);
        res.status(200).json(game.winner);
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;