const express = require('express')
const router = express.Router()
const passport = require('passport')


const { userLogin, userRegister, getUser} = require('../controller/userController')



//USER REGISTER
router.post('/register', userRegister)

// USER LOGIN
router.post('/login', userLogin)

//GET USER
router.post('/get', getUser)


module.exports = router