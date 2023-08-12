const { c_trx_penjualan } = require('../../bengkel_controllers')


const router = require('express').Router()

router.post('/transaksi', c_trx_penjualan.simpanPenjualan)
router.get('/transaksi', c_trx_penjualan.getTransaksi)
router.get('/transaksi/:kode/mekanik', c_trx_penjualan.getMekanikByKode)
router.get('/transaksi/:kode/produk', c_trx_penjualan.getProdukByKode)

module.exports = router