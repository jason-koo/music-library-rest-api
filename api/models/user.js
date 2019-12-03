const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    objectId: mongoose.Schema.Types.ObjectId,
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
    date: {
        type: Date,
        defualt: Date.now
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);