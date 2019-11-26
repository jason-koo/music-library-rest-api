const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// import admin route
const adminRoutes = require('./api/routes/admin');
// import secure route
const secureUserRoutes = require('./api/routes/secureUser');
// import open route
const openUserRoutes = require('./api/routes/openUser');


// Database connection
const db = require('./db');
db.connect(() => {
    mongoose.connection.on('connected', function(){
        console.log('connection was successful on' + mongoose.connection.name + '!');
    });
});

/*mongoose.connect(
    'mongodb+srv://jasonkoo-lab5:'+ process.env.PASSWORD +'@testcluster-hngww.mongodb.net/test?retryWrites=true&w=majority',
    {
        useMongoClient: true
    }
);*/


// use body-parser for user inputs
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// CORS handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});


// set routes
app.use('/api/admin', adminRoutes);
app.use('/api/secureUser', secureUserRoutes);
app.use('/api/openUser', openUserRoutes);


// error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});
app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;