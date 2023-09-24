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
        let query = `WHERE status='lunas' `
        if (req.query.start !== 'undefined' && req.query.end !== 'undefined') {
            query += `AND log_createdAt BETWEEN '${req.query.start}%' AND '${req.query.end}%'`
        }
        console.log(req.query.inv)
        if (req.query.inv !== 'undefined') {
            query += ` AND deskripsi = '${req.query.inv}'`
        }
        try {
            const [result] = await promise.query(`SELECT id,deskripsi,debet,DATE(log_createdAt) as tanggal FROM bkl_balance ${query}`)

            res.status(200).json({ values: result })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getReportHutang: async (req, res) => {
        let query = `WHERE status='belum lunas' `
        if (req.query.start !== 'undefined' && req.query.end !== 'undefined') {
            query += `AND log_createdAt BETWEEN '${req.query.start}%' AND '${req.query.end}%'`
        }
        console.log(req.query.inv)
        if (req.query.inv !== 'undefined') {
            query += ` AND deskripsi = '${req.query.inv}'`
        }
        try {
            const [result] = await promise.query(`SELECT id,deskripsi,piutang,DATE(log_createdAt) as tanggal FROM bkl_balance ${query}`)

            res.status(200).json({ values: result })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getBalance: async (req, res) => {
        let query = `WHERE is_deleted is null `
        if (req.query.start !== 'undefined' && req.query.end !== 'undefined') {
            query += `AND log_createdAt BETWEEN '${req.query.start}%' AND '${req.query.end}%'`
        }
        console.log(req.query.inv)
        if (req.query.inv !== 'undefined') {
            query += ` AND deskripsi = '${req.query.inv}'`
        }
        try {
            const [result] = await promise.query(`SELECT * FROM bkl_balance ${query}`)
            const [piutang] = await promise.query(`SELECT SUM(piutang) as piutang FROM bkl_balance ${query}`)
            const [debet] = await promise.query(`SELECT SUM(debet) as debet FROM bkl_balance ${query}`)
            const [kredit] = await promise.query(`SELECT SUM(kredit) as kredit FROM bkl_balance ${query}`)

            const data = {
                result,
                piutang,
                debet,
                kredit
            }

            res.status(200).json({ values: data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    },

    getMekanik: async (req, res) => {
        let query = `WHERE is_deleted is null `
        if (req.query.date !== 'undefined') {
            query += `AND createdAt LIKE '${req.query.date}%'`
        }
        console.log(req.query.mekanik)
        if (req.query.mekanik !== 'undefined') {
            query += ` AND mekanik = '${req.query.mekanik}'`
        }
        try {
            const [result] = await promise.query(`SELECT mekanik,createdAt,SUM(ongkos) as ongkos FROM bkl_transaction_mekanik ${query} GROUP BY mekanik`)
            res.status(200).json({ values: result })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }
    ,

    getProduk: async (req, res) => {
        let query = `WHERE tpr.is_deleted is null `
        if (req.query.date !== 'undefined') {
            query += `AND tpr.createdAt LIKE '${req.query.date}%' AND mpr.createdAt LIKE '${req.query.date}%' `
        }
        console.log(req.query.produk)
        if (req.query.produk !== 'undefined') {
            query += ` AND mpr.nama LIKE '%${req.query.produk}%'`
        }
        try {
            const [result] = await promise.query(`SELECT tpr.createdAt, mpr.nama, (mpr.harga_jual * SUM(tpr.stok_terjual)) as total_jual, (mpr.harga_modal * mpr.stok) as modal, ((mpr.harga_jual * SUM(tpr.stok_terjual)) - (mpr.harga_modal * mpr.stok)) as keuntungan FROM bkl_transaction_produk tpr JOIN bkl_mst_produk mpr ON tpr.kode_produk=mpr.kode ${query} GROUP BY tpr.kode_produk`)
            res.status(200).json({ values: result })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }


}