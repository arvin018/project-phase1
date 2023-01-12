const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()


// /users
router.get('/', Controller.homeUser)


router.post('/buy/product', Controller.buyProcess)
router.get('/buy/:id', Controller.buyProduct)

router.get('/:id/edit/profiles', Controller.formProfile)
router.post('/:id/edit/profiles', Controller.handlerProfile)

// /users/register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.handlerAddRegister)

module.exports = router