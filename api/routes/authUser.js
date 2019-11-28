const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Song = require('../models/song')
const User = require('../models/user');


// VALIDATION
 const Joi = require('@hapi/joi');
 const schema = {
     username: Joi.string()
     .min(6)
     .required(),
     email: Joi.string().min(6).required().email(),
     password: Joi.string().min(6).required()
 };


router.post('/register', async (req, res) => {
    // VALIDATE DATA BEFORE CREAING USER
    const { error } = Joi.validate(req.body, schema);
    if(error) return res.status(400).send(error.details[0].message);
    //res.send(error.details[0].message);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

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

router.post('/',(req, res, next) => {
    res.status(200).json({
        message: 'Updates the record of the given song ID with JSON array of properties sent in the body'
    });
});

router.post('/song/create',(req, res, next) => {
    const song = new Song({
        _id: new mongoose.Types.ObjectId(),
        artist: req.body.artist,
        name: req.body.name
    });
    song
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'handling post',
        createdSong: song
    })
});


router.put('/add-review/:id',(req, res, next) => {
    res.status(200).json({
        message: 'Create a new review for the song with the given ID based on JSON array provided in the body.'
    });
});

module.exports = router;