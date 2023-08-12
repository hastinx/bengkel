const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getSummaryProduk: async (req, res) => {
        try {
            const [produk] = await promise.query(`SELECT COUNT(tpr.kodeProduk) as count, pr.nama FROM bkl_transaction_produk tpr
            JOIN bkl_mst_produk pr ON tpr.kodeProduk=pr.kode
            GROUP BY tpr.kodeProduk
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
            const [mekanik] = await promise.query(`SELECT tr.tipeTransaksi, SUM(tpr.totalHarga) as total FROM bkl_transaction tr
            JOIN bkl_transaction_produk tpr ON tpr.codeTransaksi=tr.code
            WHERE tr.tipeTransaksi='cash'
            GROUP BY tr.tipeTransaksi
            ORDER BY total DESC LIMIT 1`)

            res.status(200).json({ values: mekanik })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getSummaryHutang: async (req, res) => {
        try {
            const [mekanik] = await promise.query(`SELECT tr.tipeTransaksi, SUM(tpr.totalHarga) as total FROM bkl_transaction tr
            JOIN bkl_transaction_produk tpr ON tpr.codeTransaksi=tr.code
            WHERE tr.tipeTransaksi='hutang'
            GROUP BY tr.tipeTransaksi
            ORDER BY total DESC LIMIT 1`)

            res.status(200).json({ values: mekanik })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

}