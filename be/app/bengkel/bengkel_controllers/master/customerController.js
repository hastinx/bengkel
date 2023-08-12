const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getAll: async (req, res) => {
        let endpoint = ''

        if (req.query.hp) {
            endpoint = `SELECT * FROM bkl_mst_customer WHERE is_deleted = 0 AND hp LIKE '%${req.query.hp}%'`
        } else {
            endpoint = `SELECT * FROM bkl_mst_customer WHERE is_deleted = 0`
        }

        const [result] = await promise.query(endpoint)

        res.json({
            status: 200,
            values: result
        })
    },

    getById: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM bkl_mst_customer WHERE id=${req.params.id} AND is_deleted = 0`)

        result.lenght > 0 ?
            res.json({
                status: 200,
                values: result
            }) :
            res.json({
                status: 400,
                message: 'Data customer kosong',
                values: result
            })
    },

    add: async (req, res) => {
        let { nama, hp, alamat } = req.body

        hp == undefined ? hp = "" : hp;
        alamat == undefined ? alamat = "" : alamat;

        const [result] = await promise.query(`SELECT * FROM bkl_mst_customer WHERE hp='${hp}'`)

        if (result.lenght > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Data customer sudah ada'
            })
        } else {
            await promise.query(`INSERT INTO bkl_mst_customer (
                nama, 
                hp, 
                alamat,
                is_deleted,
                createdAt)
             VALUES 
                (
                '${nama}',
                '${hp}',
                '${alamat}',
                0,
                now()
                )`
            )
            return res.json({
                status: 200,
                message: 'Data customer berhasil ditambahkan'
            })
        }

    },

    edit: async (req, res) => {
        try {
            const { nama, hp, alamat } = req.body
            const id = req.params.id

            await promise.query(`UPDATE bkl_mst_customer SET nama='${nama}',hp=${hp},alamat='${alamat}',updatedAt=now() WHERE id=${id}`)

            return res.json({
                status: 200,
                message: "Data customer berhasil diupdate"
            })
        } catch (error) {
            return res.status(400).json({
                message: 'Failed'
            })
        }

    },

    delete: async (req, res) => {
        const id = req.params.id

        await promise.query(`DELETE FROM bkl_mst_customer WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data customer berhasil dihapus"
        })
    }
}