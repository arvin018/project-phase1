const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()
const admin  =require('./admin')
const user  =require('./user')



  router.get('/', Controller.home)
  router.use('/admins',admin)
  router.use('/users',user)





module.exports = router