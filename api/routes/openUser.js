const express = require('express');
const router = express.Router();
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

// ROUTE FOR LOGIN
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


router.get('/home',(req, res, next) => {
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

