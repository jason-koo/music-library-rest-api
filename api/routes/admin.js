const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Requires admin privileges'
    });
});


router.get('/copyright', (req, res, next) => {
    res.status(200).json({
        message: 'Returns all songs which are marked as copyright violations.'
    });
});

router.post('/copyright/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Set of update copyright violation' + 
        'attributes for a given song ID. JSON array with new values is provided in the body.'
    });
});


router.post('/deactivate/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Set or clear "account deactivated" flag for a given user'
    });
});




module.exports = router;
