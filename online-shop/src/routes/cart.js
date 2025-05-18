/**
 * Файл: src/routes/cart.js
 * Назначение:
 *   Маршруты корзины:
 *   POST /cart/add       — добавить в корзину
 *   POST /cart/update    — изменить количество
 *   POST /cart/remove    — удалить позицию
 *   GET  /cart           — просмотр корзины
 */

const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middlewares/auth')
const cartController = require('../controllers/cartController')

router.post('/add', ensureAuthenticated, cartController.add)
router.get('/', ensureAuthenticated, cartController.view)
router.post('/remove', ensureAuthenticated, cartController.remove)
router.post('/update', ensureAuthenticated, cartController.update)
module.exports = router
