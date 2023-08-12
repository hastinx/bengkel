const { c_summary_dashboard } = require('../../bengkel_controllers')

const router = require('express').Router()

router.get('/dashboard/summary/produk', c_summary_dashboard.getSummaryProduk)
router.get('/dashboard/summary/mekanik', c_summary_dashboard.getSummaryMekanik)
router.get('/dashboard/summary/cash', c_summary_dashboard.getSummaryCash)
router.get('/dashboard/summary/hutang', c_summary_dashboard.getSummaryHutang)

module.exports = router