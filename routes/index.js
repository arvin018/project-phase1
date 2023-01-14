const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()
const admin = require('./admin')
const user = require('./user')

router.get('/', Controller.home)

router.post('/login', Controller.handlerLogin)

router.use((req, res, next) => {
    // console.log(req.session)
  if(!req.session.userId){
    const error= 'Please login First'
    res.redirect(`/?error=${error}`)
  }else{
    next()
  }
})


router.use('/admins', admin)
router.use('/users', user)

// const coba =function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// }



module.exports = router
