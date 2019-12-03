const mongoose = require('mongoose');
const path = require('path');


const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    objectID: {
        type: Number,
        unique: false
       
    },
    rating: {
        type: Number
    },
    songName: {
        type: String,
        required: true
    },
    submittedBy: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Review', reviewSchema);