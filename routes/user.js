const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()


// /users
router.get('/', Controller.homeUser)






module.exports = router