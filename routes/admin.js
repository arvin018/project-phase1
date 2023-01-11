const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()


// /admins
router.use('/', Controller.homeAdmin)






module.exports = router