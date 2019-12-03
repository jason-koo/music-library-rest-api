const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Song = require('../models/song');
const Review = require('../models/review');
const { registerValidation, loginValidation } = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var stringSimilarity = require('string-similarity');


// REGISTER
router.post('/register', async (req, res) => {
    // VALIDATE DATA BEFORE CREAING USER
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    // CHECK IF THE USER IS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) { 
        return res.status(400).send('Email already exists')
    }
    // CHECK FOR USERNAME DUPLICATES
    const userExists = await User.findOne({username: req.body.username});
    if(userExists) {return res.status(400).send('Username has already been taken');}

    // HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch (err) {
        res.status(400).send(err);
    }
});

// ROUTE FOR LOGIN
router.post('/login', async (req, res) => {
    // VALIDATE DATA BEFORE CREAING USER
    const { error } = loginValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }
     // CHECK IF THE USER IS ALREADY IN THE DATABASE
    const user = await User.findOne({email: req.body.email});
    if(!user) { return res.status(400).send('Email or password is incorrect'); }
    
    //if(!user.confirmed) { return res.status(400).send("Please confirm your email to login")}
    if(!user.active) { return res.status(400).send("This account is deactivated, please contact admin")}
    // CHECK IF PASSWORD IS CORRECT
    const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){ return res.status(400).send("Invalid password")}

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('authorization', token).send({token});

});


// Home page
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'All paths will not require authentication to access the api.'
    });
});


// Returns a list of songs, top 10, returns rating
router.get('/songs',(req, res, next) => {
    Song.find()
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

router.get('/allSongs', (req, res, next) => {
    Song.find()
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
})


// search for songs
router.get('/song/search/:value', (req, res) => {
    var arr = []
    var songArr = []
    song = req.params.value
    Song.find((err, docs) => {
        if(err) {
            console.log("Error" + JSON.stringify(err, undefined, 2));
        } else {
            arr = docs;
            for(var i = 0; i < arr.length; i++) {
                if(stringSimilarity.compareTwoStrings(arr[i].title, song) > 0.5) {
                    songArr.push(arr[i]);
                } else if(stringSimilarity.compareTwoStrings(arr[i].artist, song) > 0.5) {
                    songArr.push(arr[i]);
                } else if(stringSimilarity.compareTwoStrings(arr[i].album, song) > 0.5) {
                    songArr.push(arr[i]);
                } 
            }
            res.send(songArr)
        }
    })
});


// gets all the reviews for a song
router.get('/show-reviews/:objID', (req, res, next) => {
    Review.find({objectID: req.params.objID})
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

router.get('/song-details/:objID', (req, res, next) => {
    Song.find({objectID: req.params.objID})
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
})

module.exports = router;

