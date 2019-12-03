const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    objectID: {
        type: Number,
        require: true,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    album: {
        type: String
    },
    year: {
        type: Number
    },
    comment: {
        type: String
    },
    genre: {
        type: String
    },
    avgRating: {
        type: Number,
        require: true,
        default:0
    },
    numOfReviews: {
        type: Number,
        require: true,
        default:0
    },
});

module.exports = mongoose.model('Song', songSchema);