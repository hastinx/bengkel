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
        let { nama, hp, alamat, kendaraan, no_plat } = req.body

        hp == undefined ? hp = "" : hp;
        alamat == undefined ? alamat = "" : alamat;
        kendaraan == undefined ? kendaraan = "" : kendaraan;
        no_plat == undefined ? no_plat = "" : no_plat;
        try {
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
                kendaraan,
                no_plat,
                is_deleted,
                createdAt)
             VALUES 
                (
                '${nama.toUpperCase()}',
                '${hp}',
                '${alamat.toUpperCase()}',
                '${kendaraan.toUpperCase()}',
                '${no_plat.toUpperCase()}',
                0,
                now()
                )`
                )
                return res.status(200).json({
                    status: 'success',
                    message: 'Data customer berhasil ditambahkan'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 'failed' })
        }


    },

    edit: async (req, res) => {
        try {
            const { nama, hp, alamat, kendaraan, no_plat } = req.body
            const id = req.params.id

            await promise.query(`UPDATE bkl_mst_customer SET nama='${nama.toUpperCase()}',hp=${hp},alamat='${alamat.toUpperCase()}',kendaraan='${kendaraan.toUpperCase()}',no_plat='${no_plat.toUpperCase()}',updatedAt=now() WHERE id=${id}`)

            return res.json({
                status: 200,
                message: "Data customer berhasil diupdate"
            })
        } catch (error) {
            console.log(error)
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
    },
    getByNoPlat: async (req, res) => {
        try {
            const [result] = await promise.query(`SELECT * FROM bkl_mst_customer WHERE no_plat='${req.query.noPlat}'`)

            res.status(200).json({ status: 'success', values: result })
        } catch (error) {
            res.status(500).json({ status: 'failed' })
        }
    }
}