const express = require('express')
const db = require('./db');
const mongoose = require("mongoose");
const person = require('./models/entity.js')
const menu = require('./models/menu.js')

// Automatically parses the JSON data from the request body and converts into js object, it is stored in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const app = express();



// Routes
const personRouter = require('./routes/personRoutes.js')
const menuRouter = require('./routes/menuRoutes.js')
app.use('/person', personRouter)
app.use("/:id", personRouter)
app.use('/menu', menuRouter)
app.use("/:id", menuRouter)




app.listen(3500, () => {
    console.log("server running ")
})