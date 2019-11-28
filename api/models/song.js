const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    artist: String,
    name: String,
    album: String,
    year: Number,
    genre: String,
    avgRating: Number,
    reviewNum: Number,
    ratingNum: Number
});

module.exports = mongoose.model('Song', songSchema);