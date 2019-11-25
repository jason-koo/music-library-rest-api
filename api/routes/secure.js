const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'All paths will require authentication as a regular user.'
    });
});

router.put('/song',(req, res, next) => {
    res.status(200).json({
        message: 'Saves the JSON array for a song in the database and returns the ID.'
    });
});

router.post('/song/:id',(req, res, next) => {
    res.status(200).json({
        message: 'Updates the record of the given song ID with JSON array of properties sent in the body'
    });
});


router.put('/add-review/:id',(req, res, next) => {
    res.status(200).json({
        message: 'Create a new review for the song with the given ID based on JSON array provided in the body.'
    });
});

module.exports = router;