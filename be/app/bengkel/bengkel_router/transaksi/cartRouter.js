const { c_cart } = require('../../bengkel_controllers')


const router = require('express').Router()

router.post('/cart', c_cart.addToCart)
router.get('/cart', c_cart.getCart)

module.exports = router