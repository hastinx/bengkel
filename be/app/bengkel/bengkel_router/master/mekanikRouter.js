const { c_mst_mekanik } = require("../../bengkel_controllers");

const { authKey } = require('../../../../middleware/authKey')
const router = require('express').Router()

router.get('/master/Karyawan', c_mst_mekanik.getAll)
router.get('/master/Karyawan/byid/:id', c_mst_mekanik.getById)
router.post('/master/Karyawan/add', c_mst_mekanik.add)
router.post('/master/Karyawan/edit/:id', c_mst_mekanik.edit)
router.post('/master/Karyawan/delete/:id', c_mst_mekanik.delete)

module.exports = router