const db = require('../../../../config/db.js')
const promise = db.promise()
const { v4: uuidv4 } = require('uuid');
var async = require("async");

module.exports = {
    simpanPenjualan: (req, res) => {
        let code = ""
        let uuid = uuidv4().split("-")[0];
        let date = Date.now()
        let year = new Date(date).getFullYear()
        let month = (new Date(date).getMonth() + 1).toString().length !== 2 ? "0" + (new Date(date).getMonth() + 1) : (new Date(date).getMonth() + 1)
        let day = new Date(date).getDate().toString().length !== 2 ? "0" + new Date(date).getDate() : new Date(date).getDate()

        code = "INV-" + day + month + year + "-" + uuid

        const { customer, noHp, alamat, kendaraan, noPlat, kmMasuk, kmKeluar, tipeTransaksi, statusPembayaran, mekanik, produk, totalBayar } = req.body

        try {
            async.series([
                function (cb) {
                    promise.query(`INSERT INTO bkl_transaction (
                        code, 
                        customer, 
                        noHp, 
                        alamat, 
                        kendaraan, 
                        noPlat, 
                        kmMasuk, 
                        kmKeluar, 
                        tipeTransaksi, 
                        statusPembayaran, 
                        createdBy)
                        VALUES (
                        '${code}',
                        '${customer}',
                        '${noHp}',
                        '${alamat}',
                        '${kendaraan}',
                        '${noPlat}',
                        ${kmMasuk},
                        ${kmKeluar},
                        '${tipeTransaksi}',
                        '${statusPembayaran}',
                        'system'
                    ) `)

                    if (tipeTransaksi === 'hutang') {
                        promise.query(`INSERT INTO bkl_balance (deskripsi,status,piutang,log_act,log_createdBy) VALUES ('${code}','${statusPembayaran}',${totalBayar},'Trsansaksi hutang masuk','system')`)
                    } else {
                        promise.query(`INSERT INTO bkl_balance (deskripsi,status,debet,log_act,log_createdBy) VALUES ('${code}','${statusPembayaran}',${totalBayar},'Trsansaksi cash masuk','system')`)
                    }

                    cb(null, 'insert transaction')
                },
                function (cb) {
                    async.eachSeries(mekanik, function iteratee(item, cb1) {
                        promise.query(`INSERT INTO bkl_transaction_mekanik (codeTransaksi,mekanik,ongkos) VALUES ('${code}','${item.mekanik}',${item.ongkos})`)
                        cb1()
                    })
                    cb(null, 'insert transaction mekanik')
                },
                function (cb) {
                    async.eachSeries(produk, function iteratee(item, cb1) {
                        promise.query(`INSERT INTO bkl_transaction_produk (codeTransaksi,kodeProduk,qty,hargaSatuan,totalHarga) VALUES ('${code}','${item.kodeProduk}',${item.qty},${item.hargaSatuan},${Number(item.qty * item.hargaSatuan)})`)
                        cb1()
                    })
                    cb(null, 'insert transaction produk')
                },
                function (cb) {
                    async.eachSeries(produk, function iteratee(item, cb1) {
                        promise.query(`DELETE FROM bkl_cart WHERE id=${item.id}`)
                        cb1()
                    })
                    cb(null, 'delete cart')
                },

            ], function (err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ message: 'failed' })
                }
                console.log(produk)
                async function updateStock() {
                    for (let i = 0; i < produk.length; i++) {
                        let stock = 0
                        let [result] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE kode='${produk[i].kodeProduk}'`)
                        console.log(result)
                        stock = Number(result[0].qty) - Number(produk[i].qty)
                        await promise.query(`UPDATE bkl_mst_produk SET qty=${stock} WHERE kode='${produk[i].kodeProduk}'`)
                    }
                }

                updateStock()

                res.status(200).json({ message: 'Data transaksi berhasil ditambahkan' })
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }

    },
    getTransaksi: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT * FROM bkl_transaction`)

            res.status(200).json({ values: result })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getMekanikByKode: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT * FROM bkl_transaction_mekanik WHERE codeTransaksi='${req.params.kode}'`)

            res.status(200).json({ values: result })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getProdukByKode: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT tpr.*,mpr.nama FROM bkl_transaction_produk tpr JOIN bkl_mst_produk mpr ON tpr.kodeProduk=mpr.kode WHERE tpr.codeTransaksi='${req.params.kode}'`)
            console.log(result)
            res.status(200).json({ values: result })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}