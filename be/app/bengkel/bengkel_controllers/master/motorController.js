const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getAll: async (req, res) => {
        let filter = `is_deleted=0`

        if (req.query.keyword) {
            filter += ` AND nama LIKE '%${req.query.keyword}%' OR merk LIKE '%${req.query.keyword}%'`
        }
        const [result] = await promise.query(`SELECT * FROM bkl_mst_kendaraan WHERE ${filter}`)

        res.json({
            status: 200,
            values: result
        })
    },

    getById: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM bkl_mst_kendaraan WHERE id=${req.params.id} AND is_deleted = 0`)

        result.lenght > 0 ?
            res.json({
                status: 200,
                values: result
            }) :
            res.json({
                status: 400,
                message: 'Data kendaraan kosong',
                values: result
            })
    },

    add: async (req, res) => {
        let { nama, merk } = req.body
        merk == undefined ? merk = "" : merk
        const [result] = await promise.query(`SELECT * FROM bkl_mst_kendaraan WHERE nama='${nama}'`)

        if (result.length > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Data kendaraan sudah ada'
            })
        } else {
            await promise.query(`INSERT INTO bkl_mst_kendaraan (
                merk,
                nama,
                is_deleted, 
                createdAt)
             VALUES 
                (
                '${merk}',
                '${nama}',
                0,
                now()
                )`
            )
            return res.json({
                status: 200,
                message: 'Data kendaraan berhasil ditambahkan'
            })
        }

    },

    edit: async (req, res) => {
        const id = req.params.id
        const { nama, merk } = req.body

        await promise.query(`UPDATE bkl_mst_kendaraan SET nama='${nama}',merk='${merk}',updatedAt=NOW() WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data kendaraan berhasil diupdate"
        })
    },

    delete: async (req, res) => {
        const id = req.params.id

        await promise.query(`DELETE FROM bkl_mst_kendaraan WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data kendaraan berhasil dihapus"
        })
    }
}