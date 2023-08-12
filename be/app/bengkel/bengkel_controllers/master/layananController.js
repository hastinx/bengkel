const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getAll: async (req, res) => {
        let endpoint = ``
        console.log(req.query.nama)
        if (req.query.nama) {
            endpoint = `SELECT * FROM bkl_mst_layanan WHERE is_deleted = 0 AND nama LIKE '%${req.query.nama}%'`
        } else {
            endpoint = `SELECT * FROM bkl_mst_layanan WHERE is_deleted = 0`
        }
        const [result] = await promise.query(endpoint)

        res.json({
            status: 200,
            values: result
        })
    },

    getById: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM bkl_mst_layanan WHERE id=${req.params.id} AND is_deleted = 0`)

        result.lenght > 0 ?
            res.json({
                status: 200,
                values: result
            }) :
            res.json({
                status: 400,
                message: 'Data layanan kosong',
                values: result
            })
    },

    add: async (req, res) => {
        let { nama, harga } = req.body
        harga == undefined ? harga = null : harga

        const [result] = await promise.query(`SELECT * FROM bkl_mst_layanan WHERE nama='${nama}'`)
        console.log(result)
        if (result.length > 0) {
            return res.status(400).json({
                message: 'Data layanan sudah ada'
            })
        } else {
            await promise.query(`INSERT INTO bkl_mst_layanan (
                nama,
                harga,
                is_deleted,
                createdAt)
             VALUES 
                (
                '${nama}',
                ${harga},
                0,
                now()
                )`
            )
            return res.json({
                status: 200,
                message: 'Data layanan berhasil ditambahkan'
            })
        }

    },

    edit: async (req, res) => {
        const id = req.params.id
        const { nama, harga } = req.body
        console.log(nama, harga)
        await promise.query(`UPDATE bkl_mst_layanan SET nama='${nama}',harga=${harga},updatedAt = now() WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data layanan berhasil diupdate"
        })
    },

    delete: async (req, res) => {
        const id = req.params.id

        await promise.query(`DELETE FROM bkl_mst_layanan WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data layanan berhasil dihapus"
        })
    }
}