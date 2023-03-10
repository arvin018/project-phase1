const express = require('express')
const Controller = require('../Controller/controller')
const router = express.Router()

router.get('/', Controller.homeAdmin)

router.get('/tabelUsers', Controller.tabelUser)
router.get('/tabelCategorys', Controller.tabelCategory)
router.get('/tabelProducts', Controller.tabelProduct)
router.get('/tabelCompanys', Controller.tabelCompany)

router.get('/add', Controller.formAddUser)
router.post('/add', Controller.handlerAddUser)

router.get('/addCategorys', Controller.formAddCategory)
router.post('/addCategorys', Controller.handlAddCategory)

router.get('/addCompanys',Controller.formAddCompany)
router.post('/addCompanys',Controller.handlerAddCompany)

router.get('/addPrdoucts',Controller.formAddProduct)
router.post('/addPrdoucts',Controller.handlerAddProduct)

router.get('/report',Controller.showReport)

router.get('/tabelInvoiceAdmin',Controller.tabelInvoiceAdmin)

router.get('/:id/editCategorys', Controller.FormEditCategory)
router.post('/:id/editCategorys', Controller.handletEditCategory)

// /admins/<%=el.id%>/edit
router.get('/:id/edit', Controller.formEditUser)
router.post('/:id/edit', Controller.handlerEditAddUser)

// /admins/<%=el.id%>/editCompanys
router.get('/:id/editCompanys', Controller.formEditCompany)
router.post('/:id/editCompanys', Controller.handlerEditCompany)

// /admins/<%=el.id%>/editProducts
router.get('/:id/editProducts', Controller.formEditProduct)
router.post('/:id/editProducts', Controller.handlerEditProduct)

// /admins/<%=el.id%>/delete
router.get('/:id/delete', Controller.deleteUser)

// /admins/<%=el.id%>/deleteProducts
router.get('/:id/deleteProducts', Controller.deleteProduct)






// /admins/<%=el.id%>/editCategory








module.exports = router