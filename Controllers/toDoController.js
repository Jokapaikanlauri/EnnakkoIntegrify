const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const conn = require('sequelize');

//Otetaan muuttujalla yhteys tauluun
const ToDo = db.toDo;

//Lisätään toDo-listaus
const add = async (req, res) => {
 try {
   const { name, description, status } = req.body;
   const data = {
    name,
    description,
    status,
   };
   //Tallennetaan listauksen tiedot
   const toDo = await ToDo.create(data);

   //Jos tallennus onnistui luodaan sille Id ja se liitetään UserId:hen
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


const erase = async (req, res) => {
    let id = req.params.id;
    
    //Poistetaan tiedot id:n perusteella
    await ToDo.destroy({
      where: {
      id: id
    } 
    })
    return res.status(201).send("Great success");
  }

const modify = async (req, res) => {
  
  //Otetaan aika talteen
  const time=Date.now(); 
  try {
    //Kerätään tiedot bodysta
    const { name, description, status } = req.body;
    const data = {
     name,
     description,
     status,
     updatedAt:time
    };
    
    //Ja tallennetaan uudet tiedot
    const toDo = await ToDo.create(data);
    if(toDo){
    console.log(data);
    return res.status(201).send(toDo);
  }
  }
   catch (error) {
    console.log(error);
  }
 };

const getList = async (req, res) => {
  
  //Otetaan URL:stä parametri talteen
  try {
    let status = req.query.status;
    console.log(status);
  //Etsitään kaikki tällä statuksella olevat esiintymät  
    let toDo = await ToDo.findAll({
      where:{
        status:status
      }
    })

  //Palautetaan tiedot
    return res.status(201).send(toDo);
     } catch (error) {
       console.log(error);
     }
  
 };

 
  

module.exports = {
 add,
 erase,
 modify,
 getList
};