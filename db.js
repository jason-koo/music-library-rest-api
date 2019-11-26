// For database connections
const mongoose = require('mongoose');
//const mongoClient = require('mongodb').MongoClient;
// Use dotenv to read .env vars in Node
require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
//Reference .env vars off of the process.env object
const mongoDbURL = 'mongodb+srv://jasonkoo:'+ process.env.PASSWORD +'@testcluster-hngww.mongodb.net/test?retryWrites=true&w=majority';
let mongodb;

// Connect to database
function connect(callback){
    mongoose.connect(mongoDbURL, (err, db) => {
        if(err) console.log(err);
        console.log('connection was successful on ' + mongoose.connection.name + '!');
        mongodb = db;
        callback();
    });
}
    
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};
