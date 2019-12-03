const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Song = require('../models/song')
const Review = require('../models/review')


const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.status(200).json({
        message: 'All paths will require authentication as a regular user.'
    });
});

router.put('/song',(req, res, next) => {
    res.status(200).json({
        message: 'Saves the JSON array for a song in the database and returns the ID.'
    });
});


router.post('/add-song', async (req, res) => {

    const song = new Song({
        objectID: req.body.objectID,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        comment: req.body.comment,
        genre: req.body.genre,
        avgRating: req.body.avgRating,
        numOfReviews: req.body.numOfReviews
    });
    try {
        const savedSong = await song.save();
        res.send({song})
    } catch (err) {
        res.status(400).send(err);
    }
});

function update(objID, rating){
    Song.update({objectID: objID}, {"$set": {"avgRating": rating}})
            .then(docs => {
                res.status(200).json(docs);
                res.send(docs)
            })
            .catch(err => {
                res.status(400).json({
                error: err
            })
        })
}

router.post('/add-review/:objID', async (req, res) => {
    
 
    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        objectID: req.params.objID,
        rating: req.body.rating,
        songName: req.body.songName,
        submittedBy: req.body.submittedBy,
        description: req.body.description
    });
    try {
        const savedReview = await review.save();
        res.send({review})
        update(req.params.objID, req.body.rating)
        
    } catch (err) {
        res.status(400).send(err);
    }

    Review.find({objectID: objID})
    .exec()
    .then(docs => {
        if(err) {
            console.log("Error" + JSON.stringify(err, undefined, 2));
        } else {
            var arr =[]
            
            arr = docs

            for(var i = 0; i < arr.length; i++) {
                total += arr[i]['rating'];
            }
            avg = total/arr.length;
            
        }
        
    });

});



module.exports = router;