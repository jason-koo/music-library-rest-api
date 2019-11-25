const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'All paths will not require authentication to access the api.'
    });
});

router.get('/song',(req, res, next) => {
    res.status(200).json({
        message: 'Returns a list of 10 songs ordered by' +
         'average rating. Optionally, you may pass a query' +
         'parameter to indicate the number of the results to return.'
    });
});

router.get('/song/search', (req, res, next) => {
    res.status(200).json({
        message: 'Returns a list of songs matching the search criteria provided as query parameters'
    });
});

router.get('/song/reviews/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Returns all reviews for a given song ID'
    });
});

module.exports = router;

