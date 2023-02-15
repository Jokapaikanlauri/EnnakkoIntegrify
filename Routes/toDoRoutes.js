//importing modules
const express = require('express')
const toDoAuth = require('../Middlewares/toDoAuth')
const toDoController = require('../Controllers/toDoController')
const {search, erase, add} = toDoController
const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/todos', add)

//login route
router.post('/signin', search)

router.post('/signin', erase )

module.exports = router