//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const conn = require('sequelize');
// Assigning users to the variable User
const ToDo = db.toDo;

//signing a user up
const add = async (req, res) => {
 try {
   const { name, description, status } = req.body;
   const data = {
    name,
    description,
    status,
   };
   //saving the user
   const toDo = await ToDo.create(data);

   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (toDo) {
    jwt.sign({ id: toDo.id }, process.env.secretKey, {
      expiresIn: 1 * 24 * 60 * 60 * 1000
    });

    jwt.sign({ userId: toDo.userId }, process.env.secretKey, {
      expiresIn: 1 * 24 * 60 * 60 * 1000
    });
     console.log("toDo", JSON.stringify(toDo, null, 2));
     
     //send users details
     return res.status(201).send(toDo);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};

//login authentication
const search = async (req, res) => {
 try {
const { email, password } = req.body;

   //find a user by their email
   const user = await User.findOne({
     where: {
     email: email
   } 
     
   });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       //send user data
       return res.status(201).send(user);
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

const erase = async (req, res) => {
    let id = req.params.id;
    
    
    await ToDo.destroy({
      where: {
      id: id
    } 
    })
    return res.status(201).send("Great success");
  }

const modify = async (req, res) => {
  
  const time=Date.now(); 
  try {
    const { name, description, status } = req.body;
    const data = {
     name,
     description,
     status,
     updatedAt:time
    };
    
    const toDo = await ToDo.create(data);
    if(toDo){
    let id = req.params.id;

   console.log(data);
    return res.status(201).send(toDo);
  }
  }
   catch (error) {
    console.log(error);
  }
  
 };

const getList = async (req, res) => {
  
  try {
    let status = req.query.status;
    console.log(status);
    
    const toDo = await ToDo.findAll({
      where:{
        status:status
      }
    })
    return res.status(201).send(toDo);
     } catch (error) {
       console.log(error);
     }
  
 };


module.exports = {
 add,
 search,
 erase,
 modify,
 getList
};