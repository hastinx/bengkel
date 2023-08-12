const { authKey } = require('../../../middleware/authKey')
const { c_user } = require('../../controllers')

const router = require('express').Router()

router.post('/auth/login', authKey, c_user.login)
router.post('/auth/register', authKey, c_user.register)

module.exports = router