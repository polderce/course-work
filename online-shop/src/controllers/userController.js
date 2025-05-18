/**
 * Файл: src/controllers/userController.js
 * Назначение:
 *   Логика отображения личного кабинета и заказов пользователя.
 *
 * Функции:
 *   • dashboard — получить заказы и рендерить dashboard.ejs
 */

const { Order, OrderItem, Product } = require('../models')

exports.dashboard = async (req, res) => {
	const orders = await Order.findAll({
		where: { userId: req.user.id },
		include: [{ model: OrderItem, include: [Product] }],
		order: [['createdAt', 'DESC']],
	})
	res.render('dashboard', { user: req.user, orders })
}
