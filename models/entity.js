const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ENschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
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
        required: true
    },
    username:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true
    }
})

ENschema.pre('save', async function(next) {
    const person = this;
    // Hashing only if password has been changed
    if(!person.isModified('password')) return next();

    try {
        // hashing password
        const salt = await bcrypt.genSalt(10)

        const hashedpassword = await bcrypt.hashPassword(person.password, salt)
        // override the password with hashed password
        person.password = hashedpassword
        next()
    } catch (error) {
        return next(error)
    }
})

ENschema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatched = await bcrypt.compare(candidatePassword, this.password)
        return isMatched
    } catch (error) {
        throw error

    }
}

const model = mongoose.model("person", ENschema)

module.exports = model