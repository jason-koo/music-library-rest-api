const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/users', (req, res, next) => {
    User.find()
    .sort({avgRating:-1}).limit(10)
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
        res.send(docs);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

router.post('/makeAdmin/:userID', (req, res, next) => {
    User.update({ _id: req.params.userID }, {"$set": {"isAdmin":true}})
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
        res.send(docs)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/deactivate/:userID', (req, res, next) => {
    User.update({ _id: req.params.userID }, {"$set": {"active":false}})
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
        res.send(docs)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.post('/activate/:userID', (req, res, next) => {
    User.update({ _id: req.params.userID }, {"$set": {"active":true}})
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
        res.send(docs)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

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







module.exports = router;
