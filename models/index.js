const {Sequelize, DataTypes} = require('sequelize')

//portti = 5432
const sequelize = new Sequelize(`postgres://account:1234@localhost:5432/Integrify`, {dialect: "postgres"})

    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

db.users = require('./userModel.js') (sequelize, DataTypes)
db.toDo = require('./toDoModel.js') (sequelize, DataTypes)

module.exports = db