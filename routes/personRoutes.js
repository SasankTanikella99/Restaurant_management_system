const express = require('express')
const router = express.Router();
const person = require('../models/entity.js')
const mongoose = require('mongoose');
const {jwtAuthMiddleware, generateToken} = require('..jwt')


router.get("/signup", async (req,res) => {
    try{
        const data = await person.find()
        console.log("Successfully found person");

        const payload = {
            id: res.id,
            username: res.username,
        }
        const token = generateToken(payload)
        console.log(JSON.stringify(token))

        res.status(201).json({message: "Successfully found person", token : token});
    }catch(err){
        console.log("Error finding person");
        res.status(500).json({message: "Error finding person"})
    }  
})

// Login Route
router.post("/login", async (req, res) => {
    try {
        // Extract username and password from request body
        const {username, password} = req.body; 
        
        // find by username and password
        const user = await person.findOne({ username: username})

        // if user does not exist, or password is incorrect, return error message
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({errorMessage: 'Invalid Username or Password'})
        }

        // generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload)
        //return token as response

        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({errorMessage: 'Server Error'})
    }
})

router.post("/", async (req,res) => {
    try{
        const data = req.body
        const newPerson =  new person(data)
        const savedPerson = await person.save()
        console.log("Successfully saved person");
        res.status(201).json({message: "Successfully saved person", data:savedPerson});
    }catch(err){
        console.log("Error saving person");
        res.status(500).json({message: "Error saving person"})
    }        
    /*
    
    newPerson.save((error, savedPerson) => {
        if(error){
            console.log("Error saving person");
            res.status(500).json({message: "Error saving person"})
        }else{
            console.log("Successfully saved person");
            res.status(201).json({message: "Successfully saved person", data:savedPerson});
        }
    })
    save method no longer uses a callback function,
    to avoid callback, we use async await
    */
})

router.put("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const updatedPersondata = req.body;
        const update = await person.findByIdAndUpdate(id, updatedPersondata, {
            new: true, // return the new value so we can see it
            runValidators: true // run mongoose validation
        })
        if(!update){
            return res.status(404).json({message: "No person with this ID was found."})
        }
        console.log("Update Successful")
        res.status(200).json({message: "Updated successfully!", data:update})
    }
    catch(err){
        console.log("error fetching type")
        res.status(500).json({message:"Could not find the type"})
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const deletePerson = await person.findByIdAndDelete(id);
        if (!deletePerson){  
          return res.status(404).json({ message: 'No person with this ID was found.' });  
        }  
        res.status(200).json({ message: 'Deleted Person' });
        
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})



router.get("/:workType", jwtAuthMiddleware, async(req,res) => {
    try {
        const workType = req.params.workType;
        if(workType == "chef"|| workType == "waiter" || workType == "manager"){
            const response = await menu.find({work:workType})
            console.log("Work type fetched")
            res.status(200).json({message:"Work type fetched", data: response})
        }else{
            res.status(400).json({message: "Invalid workType"})
        }
    } catch (error) {
        console.log("error fetching type")
        res.status(500).json({message:"Could not find the type"})
    }
})


// Profile Routes
router.get("/profile", jwtAuthMiddleware, async(req,res) => { 
    try {
        const userData = req.user
        console.log("UserData :",userData);
        const userID = userData.id
        const user = await person.findById(userID)
        res.status(200).json({message: "User found.",data:user});
    } catch (error) {
        res.status(500).json({message:"Could not find the User."})
    }
})

module.exports = router;