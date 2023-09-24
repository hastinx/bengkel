const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getSummaryProduk: async (req, res) => {
        try {
            const [produk] = await promise.query(`SELECT COUNT(tpr.kode_produk) as count, pr.nama FROM bkl_transaction_produk tpr
            JOIN bkl_mst_produk pr ON tpr.kode_produk=pr.kode
            GROUP BY tpr.kode_produk
            ORDER BY count DESC LIMIT 1`)

            res.status(200).json({ values: produk })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getSummaryMekanik: async (req, res) => {
        try {
            const [mekanik] = await promise.query(`SELECT mekanik, SUM(ongkos) as ongkos FROM bkl_transaction_mekanik
            GROUP BY mekanik
            ORDER BY ongkos DESC LIMIT 1`)

            res.status(200).json({ values: mekanik })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getSummaryCash: async (req, res) => {
        try {
            const [mekanik] = await promise.query(`SELECT tr.tipe_transaksi, SUM(tpr.total_harga) as total FROM bkl_transaction tr
            JOIN bkl_transaction_produk tpr ON tpr.kode_transaksi=tr.code
            WHERE tr.tipe_transaksi='cash'
            GROUP BY tr.tipe_transaksi
            ORDER BY total DESC LIMIT 1`)

            res.status(200).json({ values: mekanik })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getSummaryHutang: async (req, res) => {
        try {
            const [mekanik] = await promise.query(`SELECT tr.tipe_transaksi, SUM(tpr.total_harga) as total FROM bkl_transaction tr
            JOIN bkl_transaction_produk tpr ON tpr.kode_transaksi=tr.code
            WHERE tr.tipe_transaksi='hutang'
            GROUP BY tr.tipe_transaksi
            ORDER BY total DESC LIMIT 1`)

            res.status(200).json({ values: mekanik })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

}