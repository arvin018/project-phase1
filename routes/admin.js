const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()


// /admins
router.get('/', Controller.homeAdmin)

router.get('/tabelUsers', Controller.tabelUser)
router.get('/tabelCategory', Controller.tabelCategory)

router.get('/add', Controller.formAddUser)
router.post('/add', Controller.handlerAddUser)

// /admins/addCategorys
router.get('/addCategorys', Controller.formAddCategory)
router.post('/addCategorys', Controller.handlAddCategory)

router.get('/:id/editCategorys', Controller.FormEditCategory)
router.post('/:id/editCategorys', Controller.handletEditCategory)

// /admins/<%=el.id%>/edit
router.get('/:id/edit', Controller.formEditUser)
router.post('/:id/edit', Controller.handlerEditAddUser)

// /admins/<%=el.id%>/delete
router.get('/:id/delete', Controller.deleteUser)







// /admins/<%=el.id%>/editCategory








module.exports = router