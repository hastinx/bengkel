
const { c_user } = require('../../controllers')

const router = require('express').Router()

router.post('/auth/login', c_user.login)
router.post('/auth/register', c_user.register)

module.exports = router