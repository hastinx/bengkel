const { c_mst_produk } = require("../../bengkel_controllers");
const router = require('express').Router()

router.get('/master/produk', c_mst_produk.getAll)
router.get('/master/produk/byid/:id', c_mst_produk.getById)
router.post('/master/produk/add', c_mst_produk.addProduk)
router.post('/master/produk/edit/:id', c_mst_produk.editProduk)
router.post('/master/produk/stok/:id', c_mst_produk.editStokProduk)
router.post('/master/produk/delete/:id', c_mst_produk.deleteProduk)

module.exports = router