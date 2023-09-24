const db = require('../../../../config/db.js')
const promise = db.promise()


module.exports = {
    getCart: async (req, res) => {
        try {
            const [cart] = await promise.query(`SELECT cr.*,pr.nama FROM bkl_cart cr JOIN bkl_mst_produk pr ON cr.kode_produk=pr.kode`)

            res.status(200).json({ values: cart })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    addToCart: async (req, res) => {
        const { qty, kodeProduk, hargaSatuan } = req.body
        try {

            if (qty == 0) {
                await promise.query(`DELETE FROM bkl_cart WHERE kode_produk='${kodeProduk}'`)
                return res.status(200).json({ message: 'OK' })
            }

            //cek ketersediaan spare part
            const [produk] = await promise.query(`SELECT * FROM bkl_mst_produk WHERE kode='${kodeProduk}'`)

            if (produk[0].stok_sisa < qty) {
                return res.status(400).json({ message: "Spare part kurang, hanya tersedia " + produk[0].stok_sisa + " pcs" })
            }
            //========================================================

            //cek spare part didalam cart
            const [result] = await promise.query(`SELECT * FROM bkl_cart WHERE kode_produk='${kodeProduk}'`)

            if (result.length === 0) {
                await promise.query(`INSERT INTO bkl_cart (kode_produk,stok_terjual,harga_satuan,total_harga) VALUES ('${kodeProduk}',${qty},${hargaSatuan},${qty * hargaSatuan})`)
            } else {
                await promise.query(`UPDATE bkl_cart SET stok_terjual=${qty},total_harga=${qty * hargaSatuan} WHERE kode_produk='${kodeProduk}'`)
            }

            res.status(200).json({ message: 'OK' })
        } catch (error) {
            res.status(500).json({ message: 'failed' })
        }
    }
}