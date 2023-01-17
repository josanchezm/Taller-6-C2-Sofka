const mongoose = require('mongoose');

// Creating the schema object for the data to be stored in the database
const PostSchema = mongoose.Schema({
    "type": {
        type: String,
        default: "throw dice game"
    },
    "players": {
        type: Array,
        default: [
            {id: 1, name: "Player 1"},
            {id: 2, name: "Player 2"},
            {id: 3, name: "Player 3"},
        ],
        required: true
    },
    "inProgress": {
        type: Boolean,
    },
    "winner": {
        type: Object,
    }
});

module.exports = mongoose.model('NewGame', PostSchema);
