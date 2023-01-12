const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()


// /admins
router.get('/', Controller.homeAdmin)

router.get('/tabelUsers', Controller.tabelUser)

router.get('/add', Controller.formAddUser)
router.post('/add', Controller.handlerAddUser)
// /admins/<%=el.id%>/edit
router.get('/:id/edit', Controller.formEditUser)
router.post('/:id/edit', Controller.handlerEditAddUser)

// /admins/<%=el.id%>/delete
router.get('/:id/delete', Controller.deleteUser)






module.exports = router