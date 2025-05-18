/**
 * Файл: src/controllers/adminOrderController.js
 * Назначение:
 *   Управление заказами:
 *   • list         — список заказов
 *   • updateStatus — изменение статуса (new, in_process, completed, canceled)
 *   • remove       — удаление заказа
 */

const { Order, OrderItem, Product, User } = require('../models')

exports.list = async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [
				{ model: User, attributes: ['name', 'email'] },
				{ model: OrderItem, include: [Product] },
			],
			order: [['createdAt', 'DESC']],
		})
		res.render('admin/orders/list', {
			orders,
			activeTab: 'orders', // ← вот он
		})
	} catch (err) {
		next(err)
	}
}

exports.updateStatus = async (req, res, next) => {
	try {
		const { status } = req.body
		const order = await Order.findByPk(req.params.id)
		if (order) {
			order.status = status
			await order.save()
		}
		res.redirect('/admin/orders')
	} catch (err) {
		next(err)
	}
}

exports.remove = async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.id)
		if (order) await order.destroy()
		res.redirect('/admin/orders')
	} catch (err) {
		next(err)
	}
}
