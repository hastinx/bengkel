const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getAll: async (req, res) => {

        let filter = `is_deleted=0`

        if (req.query.keyword) {
            filter += ` AND nama LIKE '%${req.query.keyword}%' OR email LIKE '%${req.query.keyword}%'`
        }
        if (req.query.keahlian) {
            filter += ` AND keahlian LIKE '%${req.query.keahlian}%'`
        }
        if (req.query.alamat) {
            filter += ` AND alamat LIKE '%${req.query.alamat}%'`
        }

        console.log(req.query)
        const [result] = await promise.query(`SELECT * FROM bkl_mst_mekanik WHERE ${filter}`)

        res.json({
            status: 200,
            values: result
        })
    },

    getById: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM bkl_mst_mekanik WHERE id=${req.params.id} AND is_deleted = 0`)

        result.lenght > 0 ?
            res.json({
                status: 200,
                values: result
            }) :
            res.json({
                status: 400,
                message: 'Data mekanik kosong',
                values: result
            })
    },

    add: async (req, res) => {
        let { nama, email, hp, umur, alamat, keahlian } = req.body
        nama == undefined ? nama = "" : nama = nama
        email == undefined ? email = "" : email = email
        hp == undefined ? hp = "" : hp = hp
        umur == undefined ? umur = null : umur = umur
        alamat == undefined ? alamat = "" : alamat = alamat
        keahlian == undefined ? keahlian = "" : keahlian = keahlian

        const [result] = await promise.query(`SELECT * FROM bkl_mst_mekanik WHERE nama='${nama}' OR hp='${hp}' OR email='${email}'`)

        if (result.length > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Data karyawan sudah ada'
            })
        } else {
            await promise.query(`INSERT INTO bkl_mst_mekanik (
                nama, 
                email,
                hp, 
                umur,
                alamat,
                keahlian,
                is_deleted,
                createdAt)
             VALUES 
                (
                '${nama}',
                '${email}',
                '${hp}',
                ${umur},
                '${alamat}',
                '${keahlian}',
                0,
                now()
                )`
            )
            return res.json({
                status: 200,
                message: 'Data karyawan berhasil ditambahkan'
            })
        }

    },

    edit: async (req, res) => {
        const id = req.params.id
        const { nama, email, hp, alamat, keahlian } = req.body
        try {
            await promise.query(`UPDATE bkl_mst_mekanik SET nama='${nama}', 
                email='${email}',
                hp=${hp},
                alamat='${alamat}',
                keahlian='${keahlian}',
                createdAt=NOW() AND updatedAt=now() WHERE id=${id}`)

            return res.json({
                status: 200,
                message: "Data karyawan berhasil diupdate"
            })
        } catch (error) {
            return res.status(400).json({
                message: "Data karyawan gagal diupdate"
            })
        }

    },

    delete: async (req, res) => {
        const id = req.params.id

        await promise.query(`DELETE FROM bkl_mst_mekanik WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data karyawan berhasil dihapus"
        })
    }
}