//importing modules
const express = require("express");
const db = require("../Models/toDoModel");
//Assigning db.users to User variable
 const ToDo = db.toDo;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const addToDo = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const name = await To.findOne({
     where: {
       name: req.body.name,
     },
   });
   //if username exist in the database respond with a status of 409
   if (name) {
     return res.json(409).send("username already taken");
   }

   const description = await ToDo.findOne({
     where: {
       description: req.body.description,
     },
   });

   const status = await To.findOne({
    where: {
        status: req.body.status,
    },
  });
  
  //if username exist in the database respond with a status of 409
  if (status != "NotStarted" || "OnGoing"|| "Completed") {
    return res.json(409).send("Invalid status");
  }
   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 addToDo,
};