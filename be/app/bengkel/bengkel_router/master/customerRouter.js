const { c_mst_customer } = require("../../bengkel_controllers");

const router = require('express').Router()

router.get('/master/customer', c_mst_customer.getAll)
router.get('/master/customer/byid/:id', c_mst_customer.getById)
router.post('/master/customer/add', c_mst_customer.add)
router.post('/master/customer/edit/:id', c_mst_customer.edit)
router.post('/master/customer/delete/:id', c_mst_customer.delete)
router.get('/master/customer/byPlat', c_mst_customer.getByNoPlat)

module.exports = router