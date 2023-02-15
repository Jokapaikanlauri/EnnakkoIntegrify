const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isLogged = (req, res, next) => {
  User.findByPk(req.Id).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "logged") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require you to login!"
      });
      return;
    });
  });
};




const authJwt = {
  verifyToken: verifyToken,
  isLogged: this.isLogged,
};
module.exports = authJwt;