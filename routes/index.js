const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()
const admin = require('./admin')

const user = require('./user')



// router.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })
const coba =function (req, res, next) {
  console.log('Time:', Date.now())
  next()
}
router.post('/login',coba, Controller.handlerLogin)



router.get('/', Controller.home)



router.use('/admins', admin)
router.use('/users', user)

module.exports = router
