const { c_mst_produk } = require("../../bengkel_controllers");

const { authKey } = require('../../../../middleware/authKey')
const router = require('express').Router()

router.get('/master/produk', c_mst_produk.getAll)
router.get('/master/produk/byid/:id', c_mst_produk.getById)
router.post('/master/produk/add', c_mst_produk.addProduk)
router.post('/master/produk/edit/:id', c_mst_produk.editProduk)
router.post('/master/produk/delete/:id', c_mst_produk.deleteProduk)

module.exports = router