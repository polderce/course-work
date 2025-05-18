/**
 * Файл: src/routes/admin.js
 * Назначение:
 *   Маршруты админ-панели:
 *   /admin/products   — управление товарами
 *   /admin/orders     — управление заказами
 *
 * Middleware:
 *   • ensureAdmin — проверка прав администратора
 *   • upload.single('image') — загрузка фото товара
 */

const express = require('express')
const router = express.Router()
const upload = require('../config/multer') // ваш multer
const { ensureAdmin } = require('../middlewares/admin')
const adminProductController = require('../controllers/adminProductController')
const adminOrderController = require('../controllers/adminOrderController')

// При заходе на /admin → редиректим на товары
router.get('/', ensureAdmin, (req, res) => {
	res.redirect('/admin/products')
})

// ТОВАРЫ
router.get('/products', ensureAdmin, adminProductController.list)
router.get('/products/new', ensureAdmin, adminProductController.showCreate)

router.post(
	'/products',
	ensureAdmin,
	upload.single('image'),
	adminProductController.create
)

router.get('/products/:id/edit', ensureAdmin, adminProductController.showEdit)
router.post(
	'/products/:id/edit',
	ensureAdmin,
	upload.single('image'),
	adminProductController.update
)
router.post('/products/:id/delete', ensureAdmin, adminProductController.remove)

// ЗАКАЗЫ
router.get('/orders', ensureAdmin, adminOrderController.list)
router.post(
	'/orders/:id/status',
	ensureAdmin,
	adminOrderController.updateStatus
)
router.post('/orders/:id/delete', ensureAdmin, adminOrderController.remove)

module.exports = router
