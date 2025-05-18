/**
 * Файл: src/routes/auth.js
 * Назначение:
 *   Определяет маршруты регистрации, входа и выхода:
 *   GET/POST /register, GET/POST /login, GET /logout.
 *
 * Middleware:
 *   • ensureGuest — перенаправляет залогиненных
 */

const express = require('express')
const router = express.Router()
const {
	showRegister,
	registerUser,
	showLogin,
	loginUser,
	logoutUser,
} = require('../controllers/authController')
const { ensureGuest } = require('../middlewares/auth')

router.get('/register', ensureGuest, showRegister)
router.post('/register', ensureGuest, registerUser)
router.get('/login', ensureGuest, showLogin)
router.post('/login', ensureGuest, loginUser)
router.get('/logout', logoutUser)

module.exports = router
