const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    objectID: {
        type: Number,
        unique: true
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
    },
    avgRating: {
        type: Number
    }
});

module.exports = mongoose.model('Review', reviewSchema);