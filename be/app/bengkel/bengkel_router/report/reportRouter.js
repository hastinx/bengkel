const { c_report } = require('../../bengkel_controllers')

const router = require('express').Router()

// router.get('/report/cash', c_report.getReportTransaksiCash)
// router.get('/report/hutang', c_report.getReportTransaksiHutang)
router.get('/report/transaksi/cash', c_report.getReportCash)
router.get('/report/transaksi/hutang', c_report.getReportHutang)
router.get('/report/balance', c_report.getBalance)
router.get('/report/mekanik', c_report.getMekanik)
router.get('/report/produk', c_report.getProduk)

module.exports = router