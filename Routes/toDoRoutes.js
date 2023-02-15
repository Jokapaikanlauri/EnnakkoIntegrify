const express = require('express')
const toDoAuth = require('../Middlewares/toDoAuth')
const toDoController = require('../Controllers/toDoController')
const {erase, add, modify, getList} = toDoController
const router = express.Router()
const { sequelize } = require('../Models')
const db = require("../Models");



router.post('/todos', add)

router.delete('/todos/:id', erase )

router.put('/todos/:id',  modify)

router.get('/todos', getList)



module.exports = router