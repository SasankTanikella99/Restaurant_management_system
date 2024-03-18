const mongoose = require('mongoose')

const menu = mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    taste:{
        enum: ["spicy", "sweet", "sour"],
        required: false
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        default: []
    },
    sales:{
        type: Number,
        required: false
    } 
})

const items = mongoose.model("menu", menu)

module.exports = items