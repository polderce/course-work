/**
 * Файл: src/routes/user.js
 * Назначение:
 *   Маршруты личного кабинета пользователя:
 *   GET /user/dashboard — список заказов и профиль
 */

const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middlewares/auth')
const { dashboard } = require('../controllers/userController')

router.get('/dashboard', ensureAuthenticated, dashboard)

module.exports = router
