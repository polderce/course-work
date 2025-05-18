/**
 * Файл: src/controllers/authController.js
 * Назначение:
 *   Логика регистрации и авторизации пользователей.
 *
 * Экспортируемые функции:
 *   • showRegister — показать форму
 *   • showLogin    — показать форму входа
 *   • registerUser — создать пользователя
 *   • loginUser    — обработать вход через Passport
 *   • logoutUser   — разлогинить и очистить сессию
 */

const bcrypt = require('bcryptjs')
const passport = require('../config/passport')
const { User } = require('../models')

// Форма регистрации
exports.showRegister = (req, res) => {
	res.render('register', {
		errors: [],
		name: '',
		email: '',
		errorMessages: req.flash('error'),
		successMessages: req.flash('success'),
	})
}

// Форма входа
exports.showLogin = (req, res) => {
	res.render('login', {
		email: '',
		errorMessages: req.flash('error'),
		successMessages: req.flash('success'),
	})
}

exports.registerUser = async (req, res) => {
	const { name, email, password, password2 } = req.body
	const errors = []

	if (!name || !email || !password || !password2)
		errors.push({ msg: 'Заполните все поля' })
	if (password !== password2) errors.push({ msg: 'Пароли не совпадают' })
	if (password.length < 6) errors.push({ msg: 'Пароль минимум 6 символов' })

	if (errors.length) {
		return res.render('register', {
			errors,
			name,
			email,
			errorMessages: req.flash('error'),
			successMessages: req.flash('success'),
		})
	}

	try {
		const existing = await User.findOne({ where: { email } })
		if (existing) {
			errors.push({ msg: 'Email уже зарегистрирован' })
			return res.render('register', {
				errors,
				name,
				email,
				errorMessages: req.flash('error'),
				successMessages: req.flash('success'),
			})
		}

		const hash = await bcrypt.hash(password, 12)
		await User.create({ name, email, password: hash })
		req.flash('success', 'Регистрация прошла успешно. Войдите, пожалуйста.')
		res.redirect('/login')
	} catch (err) {
		console.error(err)
		res.render('register', {
			errors: [{ msg: 'Ошибка сервера' }],
			name,
			email,
			errorMessages: req.flash('error'),
			successMessages: req.flash('success'),
		})
	}
}

exports.loginUser = passport.authenticate('local', {
	successRedirect: '/user/dashboard',
	failureRedirect: '/login',
	failureFlash: true,
})

exports.logoutUser = (req, res) => {
	req.logout(() => {
		req.flash('success', 'Вы вышли из системы.')
		res.redirect('/login')
	})
}
