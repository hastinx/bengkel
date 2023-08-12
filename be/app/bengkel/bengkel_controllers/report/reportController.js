const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    // getReportTransaksiCash: async (req, res) => {
    //     try {
    //         const [result] = await promise.query(`SELECT tpr.*, mpr.*, SUM(tpr.qty) as qtyTerjual, DATE(t.createdAt) as tanggal FROM
    //         bkl_transaction_produk tpr
    //         LEFT JOIN bkl_transaction t ON t.code=tpr.codeTransaksi
    //         LEFT JOIN bkl_mst_produk mpr ON tpr.kodeProduk=mpr.kode
    //         WHERE t.tipeTransaksi = 'cash'
    //         GROUP BY tpr.kodeProduk
    //         `)

    //         res.status(200).json({ values: result })
    //     } catch (error) {
    //         res.status(500).json({ message: error })
    //     }
    // },

    // getReportTransaksiHutang: async (req, res) => {
    //     try {
    //         const [result] = await promise.query(`SELECT tpr.*, mpr.*, SUM(tpr.qty) as qtyTerjual, DATE(t.createdAt) as tanggal FROM
    //         bkl_transaction_produk tpr
    //         LEFT JOIN bkl_transaction t ON t.code=tpr.codeTransaksi
    //         LEFT JOIN bkl_mst_produk mpr ON tpr.kodeProduk=mpr.kode
    //         WHERE t.tipeTransaksi = 'hutang'
    //         GROUP BY tpr.kodeProduk
    //         `)

    //         res.status(200).json({ values: result })
    //     } catch (error) {
    //         res.status(500).json({ message: error })
    //     }
    // },
    getReportCash: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT id,deskripsi,debet,DATE(log_createdAt) as tanggal FROM bkl_balance WHERE status='lunas'`)

            res.status(200).json({ values: result })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getReportHutang: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT id,deskripsi,piutang,DATE(log_createdAt) as tanggal FROM bkl_balance WHERE status='belum lunas'`)

            res.status(200).json({ values: result })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

}