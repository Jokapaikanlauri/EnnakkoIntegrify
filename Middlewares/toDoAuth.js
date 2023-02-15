const express = require("express");
const db = require("../Models/toDoModel");

 const ToDo = db.toDo;

 const addToDo = async (req, res, next) => {
 try {
   const name = await To.findOne({
     where: {
       name: req.body.name,
     },
   });

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
  
  if (status != "NotStarted" || "OnGoing"|| "Completed") {
    return res.json(409).send("Invalid status");
  }
   next();
 } catch (error) {
   console.log(error);
 }
};

 module.exports = {
 addToDo,
};