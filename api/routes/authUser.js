const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Song = require('../models/song')
const User = require('../models/user');
const { registerValidation, loginValidation } = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// ROUTE FOR
router.post('/login', async (req, res) => {
    // VALIDATE DATA BEFORE CREAING USER
    const { error } = loginValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }
     // CHECK IF THE USER IS ALREADY IN THE DATABASE
    const user = await User.findOne({email: req.body.email});
    if(!user) { return res.status(400).send('Email or password is incorrect'); }
    // CHECK IF PASSWORD IS CORRECT
    const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){ return res.status(400).send("Invalid password")}

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token').send(token);

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