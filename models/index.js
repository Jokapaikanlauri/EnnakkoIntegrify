const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp
};

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.toDo = require("../models/toDo.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

db.toDo.belongsToMany(db.toDo, {
  through: "user_roles",
  foreignKey: "userId",
});
db.user.belongsToMany(db.user, {
  through: "user_roles"
});

db.ROLES = ["user", "logged"];

module.exports = db;