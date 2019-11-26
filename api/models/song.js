const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    artist: String,
    name: String,
});

module.exports = mongoose.model('Song', songSchema);