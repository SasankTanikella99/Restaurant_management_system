const express = require('express')
const router = express.Router();
const person = require('./models/entity.js')
const mongoose = require('mongoose');


router.get("/", async (req,res) => {
    try{
        const data = await person.find()
        console.log("Successfully found person");
        res.status(201).json({message: "Successfully found person", data});
    }catch(err){
        console.log("Error finding person");
        res.status(500).json({message: "Error finding person"})
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



router.get("/:workType", async(req,res) => {
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

module.exports = router;