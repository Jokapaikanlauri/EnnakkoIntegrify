//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./Models')
const userRoutes = require ('./Routes/userRoutes')
const toDoRoutes = require ('./Routes/toDoRoutes') 

const PORT = process.env.PORT || 8080

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

//Tässä määritetään url:n alku
app.use('/api/v1', userRoutes, toDoRoutes)


app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
