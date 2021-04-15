
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    comment: String
});

const gameSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
    image: String,
    comments: [[String]],
    summary: String
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;