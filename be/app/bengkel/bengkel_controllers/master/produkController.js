const db = require('../../../../config/db.js')
const promise = db.promise()

module.exports = {
    getAll: async (req, res) => {
        let filter = `is_deleted=0`

        if (req.query.filterBy && req.query.filterBy !== '') {
            filter += ` AND nama LIKE '%${req.query.filterBy}%' OR kode LIKE '%${req.query.filterBy}%'`
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
        let { nama, kode, harga_modal, harga_jual, stok_input, createdAt, createdBefore } = req.body

        //===================== validai ========================
        console.log(!Number(stok_input))
        if (kode === '' || kode === undefined) return res.status(400).json({ message: 'Kode spare part harus di isi' })
        if (nama === '' || nama === undefined) return res.status(400).json({ message: 'Nama spare part harus di isi' })
        if (stok_input === '' || stok_input === undefined || !Number(stok_input)) return res.status(400).json({ message: 'Jumlah spare part harus di isi angka' })
        if (harga_modal === '' || harga_modal === undefined || !Number(harga_modal)) return res.status(400).json({ message: 'Harga Modal spare part harus di isi angka' })
        if (harga_jual === '' || harga_jual === undefined || !Number(harga_jual)) return res.status(400).json({ message: 'Harga jual spare part harus di isi angka' })
        //===================== validai ========================

        let final_stok = stok_input
        const [result] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE (nama='${nama}' OR kode='${kode}') AND createdAt like '${createdAt}%'`)
        const [result_before] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE (nama='${nama}' OR kode='${kode}') AND createdAt like '${createdBefore}%'`)
        if (result_before.lenght > 0) {
            final_stok = stok_input + Number(result_before[0].stok_sisa)
        } result_before.stok_sisa
        if (result.length > 0) {
            return res.status(400).json({
                status: 400,
                message: `Data spare part ${kode} bulan ${createdAt} sudah ada `
            })
        } else {

            await promise.query(`INSERT INTO bkl_mst_produk (
                nama, 
                kode, 
                harga_modal, 
                harga_jual, 
                stok,
                stok_input,
                stok_sisa,
                stok_terjual,
                is_deleted, 
                createdAt)
             VALUES (
                '${nama.toUpperCase()}',
                '${kode.toUpperCase()}',
                ${harga_modal},
                ${harga_jual},
                ${final_stok},
                ${stok_input},
                ${final_stok},
                0,
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
        let { nama, kode, harga_modal, harga_jual } = req.body
        console.log(req.body)

        await promise.query(`UPDATE bkl_mst_produk SET nama='${nama.toUpperCase()}',kode='${kode.toUpperCase()}',harga_modal=${harga_modal},harga_jual=${harga_jual},updatedAt=NOW() WHERE id=${id}`)

        return res.json({
            status: 200,
            message: "Data spare part berhasil diupdate"
        })
    },

    editStokProduk: async (req, res) => {
        const id = req.params.id
        let { stok_input } = req.body
        console.log(req.body)
        const [result_before] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE id=${id}`)
        let final_stok = Number(result_before[0].stok) + Number(stok_input)
        let stok_sisa = Number(result_before[0].stok_sisa) + Number(stok_input)
        await promise.query(`UPDATE bkl_mst_produk SET stok_input='${stok_input}',stok='${final_stok}',stok_sisa=${stok_sisa},updatedAt=NOW() WHERE id=${id}`)

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