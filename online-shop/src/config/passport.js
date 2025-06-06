/**
 * Файл: src/config/passport.js
 * Назначение:
 *   Конфигурация локальной стратегии Passport.js. Определяет
 *   механику поиска пользователя по email и проверки пароля.
 *
 * Экспорт:
 *   • passport — готовый к использованию middleware для Express
 */

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const { User } = require('../models')

passport.use(
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			try {
				const user = await User.findOne({ where: { email } })
				if (!user) return done(null, false, { message: 'Неверный email' })
				const isMatch = await bcrypt.compare(password, user.password)
				if (!isMatch) return done(null, false, { message: 'Неверный пароль' })
				return done(null, user)
			} catch (err) {
				return done(err)
			}
		}
	)
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id)
		done(null, user)
	} catch (err) {
		done(err)
	}
})

module.exports = passport
