const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()


// /users
router.get('/', Controller.homeUser)

router.get('/users/:id/edit/profiles',Controller.formProfile)
router.post('/users/:id/edit/profiles',Controller.handlerProfile)





module.exports = router