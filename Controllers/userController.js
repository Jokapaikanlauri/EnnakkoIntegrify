const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Otetaan user-taulu muuttujaan
const User = db.users;


const signup = async (req, res) => {
 try {
   const { userName, email, password } = req.body;
   const data = {
     userName,
     email,
     password: await bcrypt.hash(password, 10),
   };
   
   //Tallenetaan käyttäjä
   const user = await User.create(data);

   //Jos tallennus onnistui luodaan id sekä cryptataan salasana
   if (user) {
     let token = jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //Vastataan lähettämällä käyttäjän tiedot
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};

//sisäänkirjautuminen
const login = async (req, res) => {
 try {
const { email, password } = req.body;

   //Etsitään käyttäjä tietokannasta sähköpostin perusteella
   const user = await User.findOne({
     where: {
     email: email
   } 
     
   });

   //Jos sähköposti löytyy, tarkastetaan salasana
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //Jos salasana on sama siirrytään tänne
     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

       //Vastataanettä kaikki ok
       return res.status(201).send(user);
       } 
       //Vastataanettä kaikki ei ole ok
     else {
       return res.status(401).send("Sisäänkirjautuminen epäonnistui");
     }
   } else {
     return res.status(401).send("Sisäänkirjautuminen epäonnistui");
   }
 } catch (error) {
   console.log(error);
 }
};

//Salasanan vaihto id:n ja salasanan avulla, uusi salasana syötetään myös heti bodyyn.
const changePass = async (req, res) => {
  const {id,password,newPass } = req.body;
   const data = {
     id,
     newPass
   };

   //Etsitään käyttäjä jolla sopiva id
   const user = await User.findOne({
    where: {
    id:id
  }  
  });

  //Jos käyttäjä löytyy, mennään tänne
   if (user) {
   const isSame = await bcrypt.compare(password, user.password);

  //Jos käyttäjä löytyy, mennään tänne
   if (isSame) {
    User.findOneAndUpdate({ id: id }, { password: newPass})         
    }

  //Muutetaan käyttäjää datan tiedoilla
  const toDo = await ToDo.create(data);

  //Annetaan vastaus palvelimelta, jossa käyttäjän uudet tiedot
  return res.status(201).send(toDo);
}};


module.exports 
= {
 signup,
 login,
 changePass
};