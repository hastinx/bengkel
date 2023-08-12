const { c_mst_layanan } = require("../../bengkel_controllers");

const { authKey } = require('../../../../middleware/authKey')
const router = require('express').Router()

router.get('/master/layanan', c_mst_layanan.getAll)
router.get('/master/layanan/byid/:id', c_mst_layanan.getById)
router.post('/master/layanan/add', c_mst_layanan.add)
router.post('/master/layanan/edit/:id', c_mst_layanan.edit)
router.post('/master/layanan/delete/:id', c_mst_layanan.delete)

module.exports = router