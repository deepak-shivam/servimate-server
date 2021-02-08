const express = require('express')
const router = express.Router()
const passport = require('passport')


const {addService, removeServie, updateService, getServicesByCity
} = require('../controller/serviceController')


//GET SERVICES IN GIVEN CITY
router.post('/city/service',  passport.authenticate('jwt', { session: false }), getServicesByCity)

//ADD SERVICE
router.post('/',  passport.authenticate('jwt', { session: false }),  addService)

//REMOVE SERVICE
router.delete('/', passport.authenticate('jwt', { session: false }), removeServie)

//UDPATE SERVIE
router.put('/',  passport.authenticate('jwt', { session: false }),  updateService)


module.exports = router