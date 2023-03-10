const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login,changePass } = userController
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)

router.post('/signin', login )

router.put('/changePassword',changePass)
module.exports = router