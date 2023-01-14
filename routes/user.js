const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()

router.get('/', Controller.homeUser)

router.get('/profiles', Controller.formProfile)
router.post('/profiles', Controller.handlerProfile)

router.get('/tabelInvoiceUser', Controller.TabelInvoice)

router.post('/buy/product', Controller.buyProcess)
router.get('/buy/:id', Controller.buyProduct)

router.get('/register', Controller.formRegister)
router.post('/register', Controller.handlerAddRegister)

module.exports = router