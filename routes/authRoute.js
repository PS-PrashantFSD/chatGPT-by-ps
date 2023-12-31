const express = require('express')
const { registerController, loginController, logoutController } = require('../controller/authController.js')

const router = express.Router()


//Register
router.post('/register', registerController)

//Login
router.post('/login', loginController)

//Logout
router.post('/logout', logoutController)


module.exports = router