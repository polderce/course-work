const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middlewares/auth')
const orderController = require('../controllers/orderController')

router.post('/create', ensureAuthenticated, orderController.create)

module.exports = router
