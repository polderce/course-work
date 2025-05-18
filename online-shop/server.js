/**
 * Файл: server.js
 * Назначение:
 *   Точка входа в приложение. Настраивает Express, middleware, статические файлы,
 *   сессии и Passport; подключает маршруты и запускает HTTP-сервер.
 *
 * Используемые компоненты:
 *   • dotenv — загрузка .env
 *   • express, express-ejs-layouts — веб-фреймворк и шаблоны
 *   • express-session, connect-session-sequelize — хранение сессий в БД
 *   • passport — аутентификация
 *   • multer — отдача загруженных картинок
 *   • маршруты: auth, user, admin, products, search, cart, comments, orders
 */
require('dotenv').config()

const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./src/config/passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require('./src/models')

const adminRoutes = require('./src/routes/admin')
const productRoutes = require('./src/routes/product')
const searchRoutes = require('./src/routes/search')
const cartRoutes = require('./src/routes/cart')
const commentRoutes = require('./src/routes/comments')
const authRoutes = require('./src/routes/auth')
const userRoutes = require('./src/routes/user')
const orderRoutes = require('./src/routes/order')

const app = express()

// Настройки движка
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))
app.use(expressLayouts)
app.set('layout', 'layouts/layout')

// Статические файлы и парсеры
app.use(express.static(path.join(__dirname, 'src', 'public')))

// Отдача загруженных фото
app.use(
	'/uploads',
	express.static(path.join(__dirname, 'src', 'public', 'uploads'))
)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Настройка сессии
const sessionStore = new SequelizeStore({
	db: sequelize,
	tableName: 'Session',
	extendDefaultFields(defaults, session) {
		return {
			data: defaults.data,
			expires: defaults.expires,
		}
	},
	schema: { timestamps: false },
})

app.use(
	session({
		secret: process.env.SESSION_SECRET || 'supersecret',
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
	})
)

app.use(flash())

// Таблица сеансов
sessionStore.sync()

// Инициализация паспорта
app.use(passport.initialize())
app.use(passport.session())

// Доступ ко всем представлениям
app.use((req, res, next) => {
	res.locals.user = req.user
	next()
})

const { CartItem } = require('./src/models')

app.use(async (req, res, next) => {
	if (req.user) {
		// считаем общее число товаров пользователя в корзине
		const items = await CartItem.findAll({
			where: { userId: req.user.id },
			attributes: ['quantity'],
		})
		const count = items.reduce((sum, item) => sum + item.quantity, 0)
		res.locals.cartCount = count
	} else {
		res.locals.cartCount = 0
	}
	next()
})

// Отображение флэш-сообщений
app.use((req, res, next) => {
	res.locals.errorMessages = req.flash('error')
	res.locals.successMessages = req.flash('success')
	next()
})

// Стандартный заголовок
app.locals.title = 'Online Shop'

// Маршруты
app.use('/', authRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productRoutes)
app.use('/search', searchRoutes)
app.use('/cart', cartRoutes)
app.use('/', commentRoutes)
app.use('/orders', orderRoutes)

// Главная страница
app.get('/', (req, res) => {
	res.render('home')
})

// Запуск сервера
const PORT = process.env.PORT || 3000
sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(`Сервер запущен на http://localhost:${PORT}`)
	)
})
