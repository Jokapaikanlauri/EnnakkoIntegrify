//importing modules
const express = require('express')
const toDoAuth = require('../Middlewares/toDoAuth')
const toDoController = require('../Controllers/toDoController')
const {search, erase, add, modify, getList} = toDoController
const router = express.Router()
const { sequelize } = require('../Models')
const db = require("../Models");



router.post('/todos', add)
//login route
router.post('/signin', search)

router.delete('/todos/:id', erase )

router.put('/todos/:id',  modify)

router.get('/todos', getList)

module.exports = router