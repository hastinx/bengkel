const { c_user } = require('../../bengkel_controllers')

const router = require('express').Router()

router.post('/auth/register', c_user.register)
router.post('/auth/login', c_user.login)
router.get('/auth/token', c_user.refreshToken)
router.delete('/auth/logout', c_user.logout)

module.exports = router