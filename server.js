const express = require('express')
const db = require('./db');
const mongoose = require("mongoose");
const person = require('./models/entity.js')
const menu = require('./models/menu.js')
const passport = require('./auth.js')
const app = express();
const menuRouter = require('./routes/menuRoutes.js');
const personRouter = require('./routes/personRoutes.js');


app.use(passport.initialize());


// Automatically parses the JSON data from the request body and converts into js object, it is stored in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//middleware
//Body parsing, Router, Authentication, ... 
const logRequest = (req, res, next) =>{
    console.log(`${new Date().toLocaleString()}Request made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest) // tell Express to use this Middleware for all routes
const localauthentication = passport.authenticate('local', {session: false})
app.get('/',(req,res) => {
    console.log("Welcome to our Hotel");
})

// Routes

app.use('/person', localauthentication, personRouter)
app.use("/:id", localauthentication, personRouter)
app.use('/menu', localauthentication ,menuRouter)
app.use("/:id", localauthentication, menuRouter)




app.listen(3500, () => {
    console.log("server running ")
})