const express = require('express');
const router = express.Router();
const menu = require('.././models/menu.js')
const mongoose = require('mongoose');

// GET and POST methods for menu
router.get("/", async (req, res) => {
    try{
        const data = await menu.find();
        console.log("Successfully found menu item");
        res.status(200).json({message: "Successfully found menu item", data})
    }
    catch(err){
        console.log("Error finding menu item");
        res.status(500).json({message: "Error finding menu item"})
    }
})

router.post("/", async (req, res) => {
    try{
        const data = req.body
        const newItem = new menu(data)
        const savedItem = await menu.save()
        console.log("Successfully saved menu item")
        res.status(201).json({message:"Successfully created new menu item.", data: savedItem}) 
    }
    catch{
        console.log("Error saving menu item")
        res.status(500).json({message: "Failed to add menu item"})
    }
})

router.put("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const updatedMenudata = req.body;
        const update = await menu.findByIdAndUpdate(id, updatedMenudata, {
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
        const deleteMenu = await menu.findByIdAndDelete(id);
        if (!deleteMenu){  
          return res.status(404).json({ message: 'No item with this ID was found.' });  
        }  
        res.status(200).json({ message: 'Deleted item' });
        
    }catch(err){
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})


module.exports = router