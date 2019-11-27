const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255

    },
    email: {
        type: String,
        required: true,
        max: 255,
        max: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    data: {
        type: Date,
        defualt: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);