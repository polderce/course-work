/**
 * Файл: src/controllers/cartController.js
 * Назначение:
 *   Логика работы с корзиной:
 *   • addItem    — добавить товар
 *   • updateItem — обновить кол-во или удалить если qty<1
 *   • removeItem — удалить позицию
 *   • view       — отобразить содержимое и вычислить итоги
 */

const { CartItem, Product } = require('../models')

exports.add = async (req, res) => {
	const { productId, qty } = req.body
	const [item, created] = await CartItem.findOrCreate({
		where: { userId: req.user.id, productId },
	})
	if (!created) item.quantity += parseInt(qty)
	else item.quantity = parseInt(qty)
	await item.save()
	res.redirect('/products')
}

exports.view = async (req, res) => {
	const items = await CartItem.findAll({
		where: { userId: req.user.id },
		include: [Product],
	})
	res.render('cart/view', { user: req.user, items })
}

exports.remove = async (req, res) => {
	const { itemId } = req.body
	await CartItem.destroy({ where: { id: itemId, userId: req.user.id } })
	res.redirect('/cart')
}

exports.update = async (req, res) => {
	const { itemId, qty } = req.body
	const newQty = parseInt(qty, 10)
	if (newQty < 1) {
		// удаляем позицию
		await CartItem.destroy({ where: { id: itemId, userId: req.user.id } })
	} else {
		const item = await CartItem.findOne({
			where: { id: itemId, userId: req.user.id },
		})
		if (item) {
			item.quantity = newQty
			await item.save()
		}
	}
	res.redirect('/cart')
}
