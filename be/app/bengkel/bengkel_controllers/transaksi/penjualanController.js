const db = require('../../../../config/db.js')
const promise = db.promise()
const { v4: uuidv4 } = require('uuid');
var async = require("async");

module.exports = {
    simpanPenjualan: (req, res) => {
        let code = ""
        let uuid = uuidv4().split("-")[0].toUpperCase();
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
                        no_plat, 
                        km_masuk, 
                        km_keluar, 
                        tipe_transaksi, 
                        status_pembayaran, 
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
                        promise.query(`INSERT INTO bkl_balance (deskripsi,status,piutang,log_act,log_createdBy) VALUES ('${code}','${statusPembayaran}',${totalBayar},'Transaksi hutang masuk','system')`)
                    } else {
                        promise.query(`INSERT INTO bkl_balance (deskripsi,status,debet,log_act,log_createdBy) VALUES ('${code}','${statusPembayaran}',${totalBayar},'Transaksi cash masuk','system')`)
                    }

                    cb(null, 'insert transaction')
                },
                function (cb) {
                    async.eachSeries(mekanik, function iteratee(item, cb1) {
                        promise.query(`INSERT INTO bkl_transaction_mekanik (kode_transaksi,mekanik,ongkos) VALUES ('${code}','${item.mekanik}',${item.ongkos})`)
                        cb1()
                    })
                    cb(null, 'insert transaction mekanik')
                },
                function (cb) {
                    async.eachSeries(produk, function iteratee(item, cb1) {
                        promise.query(`INSERT INTO bkl_transaction_produk (kode_transaksi,kode_produk,stok_terjual,harga_satuan,total_harga) VALUES ('${code}','${item.kode_produk}',${item.stok_terjual},${item.harga_satuan},${Number(item.stok_terjual * item.harga_satuan)})`)
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
                        let stock_terjual = 0
                        let stock_sisa = 0
                        let [result] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE kode='${produk[i].kode_produk}'`)
                        console.log(result)
                        stock_terjual = Number(result[0].stok_terjual) + Number(produk[i].stok_terjual)
                        stock_sisa = Number(result[0].stok_sisa) - Number(produk[i].stok_terjual)
                        await promise.query(`UPDATE bkl_mst_produk SET stok_terjual=${stock_terjual},stok_sisa=${stock_sisa} WHERE kode='${produk[i].kode_produk}'`)
                    }
                }

                updateStock()

                res.status(200).json({ message: 'Data transaksi berhasil ditambahkan', invoice: code })
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }

    },
    getTransaksi: async (req, res) => {
        let query = `WHERE deletedAt is null `
        if (req.query.start !== 'undefined' && req.query.end !== 'undefined') {
            query += `AND createdAt BETWEEN '${req.query.start}%' AND '${req.query.end}%'`
        }
        console.log(req.query.inv)
        if (req.query.inv !== 'undefined') {
            query += ` AND code = '${req.query.inv}'`
        }
        try {
            const [result] = await promise.query(`SELECT * FROM bkl_transaction ${query} `)

            res.status(200).json({ values: result })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getMekanikByKode: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT * FROM bkl_transaction_mekanik WHERE kode_transaksi='${req.params.kode}'`)

            res.status(200).json({ values: result })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getProdukByKode: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT tpr.*,mpr.nama FROM bkl_transaction_produk tpr JOIN bkl_mst_produk mpr ON tpr.kode_produk=mpr.kode WHERE tpr.kode_transaksi='${req.params.kode}' AND tpr.stok_terjual <> 0`)

            res.status(200).json({ values: result })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getTransaksiById: async (req, res) => {
        try {
            const inv = req.params.invoice
            const [transaksi] = await promise.query(`SELECT * FROM bkl_transaction WHERE code='${inv}'`)
            const [mekanik] = await promise.query(`SELECT * FROM bkl_transaction_mekanik WHERE kode_transaksi='${inv}'`)
            const [produk] = await promise.query(`SELECT btp.stok_terjual as qty,btp.total_harga as totalHarga, btp.harga_satuan as hargaSatuan, btp.kode_produk as kode, bmp.nama as nama FROM bkl_transaction_produk btp JOIN bkl_mst_produk bmp ON btp.kode_produk= bmp.kode WHERE btp.kode_transaksi='${inv}' AND btp.stok_terjual > 0`)

            const data = {
                transaksi,
                mekanik,
                produk
            }

            res.status(200).json({ values: data })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    createRetur: async (req, res) => {
        const { retur } = req.body
        try {
            var arrProduk = []
            var arrSpare = []
            async function getProduk(invoice, kodeProduk) {
                const [produk] = await promise.query(`SELECT * FROM bkl_transaction_produk WHERE kode_transaksi='${invoice}' AND kode_produk='${kodeProduk}'`)
                console.log(produk)
                arrProduk = produk
            }

            async function getSparePart(kodeProduk) {
                const [part] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE kode='${kodeProduk}'`)

                arrSpare = part
            }

            async.eachSeries(retur, function iteratee(item, cb1) {
                console.log(arrProduk)
                console.log(arrSpare)
                getProduk(item.invoice, item.kodeProduk)
                getSparePart(item.kodeProduk)
                setTimeout(() => {
                    let stok_terjual = Number(arrProduk[0].stok_terjual) - Number(item.qty)
                    let stok_sisa = Number(arrSpare[0].stok_sisa) + Number(item.qty)
                    let newTotalHarga = Number(stok_terjual) * Number(arrProduk[0].harga_satuan)
                    promise.query(`UPDATE bkl_transaction_produk SET stok_terjual=${stok_terjual},total_harga=${newTotalHarga} WHERE kode_transaksi='${item.invoice}' AND kode_produk='${item.kodeProduk}'`)
                    let newQtyPart = Number(arrSpare[0].qty) + Number(item.qty)
                    promise.query(`UPDATE bkl_mst_produk SET stok_terjual=${stok_terjual},stok_sisa=${stok_sisa} WHERE kode='${item.kodeProduk}'`)
                    promise.query(`INSERT INTO bkl_balance (deskripsi,status,kredit,log_act,log_createdBy) VALUES ('${item.invoice}','retur',${Number(item.qty) * Number(arrProduk[0].harga_satuan)},'Transaksi keluar retur ${item.kodeProduk}, qty ${item.qty} pcs','system')`)
                    cb1()
                }, 1000)

            }, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ status: 'failed', message: err })
                }

                res.status(200).json({ message: 'Retur Berhasil' })
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    },

    updateStatusBill: async (req, res) => {
        const id = req.params.invoice
        var ongkos_mekanik = 0
        var spare_part = 0
        try {
            const [transaction] = await promise.query(`SELECT * FROM bkl_transaction WHERE code='${id}'`)
            const [mekanik] = await promise.query(`SELECT * FROM bkl_transaction_mekanik WHERE kode_transaksi='${id}'`)
            const [produk] = await promise.query(`SELECT * FROM bkl_transaction_produk WHERE kode_transaksi='${id}'`)

            mekanik.map(i => ongkos_mekanik += i.ongkos)
            produk.map(i => spare_part += i.total_harga)

            promise.query(`UPDATE bkl_transaction SET status_pembayaran='lunas' WHERE code='${id}'`)
            setTimeout(() => {
                promise.query(`INSERT INTO bkl_balance (deskripsi,status,debet,log_act,log_createdBy) VALUES ('${transaction[0].code}','pelunasan hutang',${Number(ongkos_mekanik) + Number(spare_part)},'Transaksi pelunasan hutang','system')`)
            }, 500)

            res.status(200).json({ message: 'Pembayaran Berhasil' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }
}