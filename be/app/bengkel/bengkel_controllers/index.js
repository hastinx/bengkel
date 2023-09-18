const c_mst_produk = require('./master/produkController')
const c_mst_motor = require('./master/motorController')
const c_mst_customer = require('./master/customerController')
const c_mst_layanan = require('./master/layananController')
const c_mst_mekanik = require('./master/mekanikController')
const c_trx_penjualan = require('./transaksi/penjualanController')
const c_cart = require('./transaksi/cartController')
const c_report = require('./report/reportController')
const c_summary_dashboard = require('./dashboard/summaryController')
const c_user = require('./auth/authUser')

module.exports = {
    c_mst_produk,
    c_mst_motor,
    c_mst_customer,
    c_mst_layanan,
    c_mst_mekanik,
    //transaksi
    c_trx_penjualan,
    c_cart,
    //report
    c_report,
    //dashboard
    c_summary_dashboard,
    c_user
}