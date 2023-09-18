const { c_mst_motor } = require("../../bengkel_controllers");

const router = require('express').Router()

router.get('/master/kendaraan', c_mst_motor.getAll)
router.get('/master/kendaraan/byid/:id', c_mst_motor.getById)
router.post('/master/kendaraan/add', c_mst_motor.add)
router.post('/master/kendaraan/edit/:id', c_mst_motor.edit)
router.post('/master/kendaraan/delete/:id', c_mst_motor.delete)

module.exports = router