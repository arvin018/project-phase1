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

router.get('/tabelCategory', Controller.tabelCategory)
// /admins/<%=el.id%>/editCategory
router.get('/admins/:id/editCategory', Controller.FormEditCategory)







module.exports = router