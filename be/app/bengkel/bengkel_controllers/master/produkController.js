const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getAll: async (req, res) => {
        let filter = `is_deleted=0`

        if (req.query.nama) {
            filter += ` AND nama LIKE '%${req.query.nama}%'`
        }
        if (req.query.kode) {
            filter += ` AND kode LIKE '%${req.query.kode}%'`
        }
        const [result] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE ${filter}`)

        res.json({
            status: 200,
            values: result
        })
    },

    getById: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE id=${req.params.id} AND is_deleted = 0`)

        result.lenght > 0 ?
            res.json({
                status: 200,
                values: result
            }) :
            res.json({
                status: 400,
                message: 'Data spare part kosong',
                values: result
            })
    },

    addProduk: async (req, res) => {
        let { nama, kode, harga_modal, harga_jual, qty } = req.body
        kode == undefined ? kode = "" : kode
        harga_modal == undefined ? harga_modal = null : harga_modal
        harga_jual == undefined ? harga_jual = null : harga_jual
        qty == undefined ? qty = null : qty
        const [result] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE nama='${nama}' OR kode='${kode}'`)

        if (result.length > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Data spare part sudah ada'
            })
        } else {
            await promise.query(`INSERT INTO bkl_mst_produk (
                nama, 
                kode, 
                harga_modal, 
                harga_jual, 
                qty, 
                is_deleted, 
                createdAt)
             VALUES 
                (
                '${nama}',
                '${kode}',
                ${harga_modal},
                ${harga_jual},
                ${qty},
                0,
                now()
                )`
            )
            return res.json({
                status: 200,
                message: 'Data spare part berhasil ditambahkan'
            })
        }

    },

    editProduk: async (req, res) => {
        const id = req.params.id
        let { nama, kode, harga_modal, harga_jual, qty } = req.body
        console.log(req.body)
        await promise.query(`UPDATE bkl_mst_produk SET nama='${nama}',kode='${kode}',harga_modal=${harga_modal},harga_jual=${harga_jual},qty=${qty},updatedAt=NOW() WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data spare part berhasil diupdate"
        })
    },

    deleteProduk: async (req, res) => {
        const id = req.params.id

        await promise.query(`DELETE FROM bkl_mst_produk WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data spare part berhasil dihapus"
        })
    }
}