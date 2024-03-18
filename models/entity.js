const mongoose = require('mongoose');

const ENschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    work:{
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false
    }
})

const model = mongoose.model("person", ENschema)

module.exports = person