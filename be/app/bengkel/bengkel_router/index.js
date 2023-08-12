const r_mst_produk = require('./master/produkRouter')
const r_mst_motor = require('./master/motorRouter')
const r_mst_customer = require('./master/customerRouter')
const r_mst_layanan = require('./master/layananRouter')
const r_mst_mekanik = require('./master/mekanikRouter')

const r_trx_penjualan = require('./transaksi/penjualanRouter')

const r_cart = require('./transaksi/cartRouter')

const r_report = require('./report/reportRouter')

const r_dashboard = require('./dashboard/summaryRouter')




module.exports = {
    route: [
        r_mst_produk,
        r_mst_motor,
        r_mst_customer,
        r_mst_layanan,
        r_mst_mekanik,
        //========== transaksi =======
        r_trx_penjualan,
        r_cart,
        r_report,
        r_dashboard
    ]
}