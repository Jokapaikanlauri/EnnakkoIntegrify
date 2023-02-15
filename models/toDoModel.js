const { ENUM } = require("sequelize")

//user model
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define( "toDo", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: ENUM('NotStarted', 'OnGoing', 'Completed'),
            allowNull: false
        }
    }, {timestamps: true}, )
    return Todo
 }