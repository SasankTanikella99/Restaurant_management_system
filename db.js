const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/hotel";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

// defining the EVENT LISTENERS

db.on('connected', () => {
    console.log("connection established")
})

db.on('error', () => {
    console.log(" error while connection is established")
})

db.on('disconnected', () => {
    console.log("disconnected")
})

module.exports = db