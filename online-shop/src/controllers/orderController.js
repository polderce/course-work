const { Order, OrderItem, CartItem, Product } = require('../models')

exports.create = async (req, res) => {
	// берем все товары из корзины
	const items = await CartItem.findAll({
		where: { userId: req.user.id },
		include: [Product],
	})
	if (!items.length) return res.redirect('/cart')

	// создаём заказ
	const order = await Order.create({ userId: req.user.id })

	// создаём позиции заказа
	for (const i of items) {
		await OrderItem.create({
			orderId: order.id,
			productId: i.productId,
			quantity: i.quantity,
			priceAtOrder: i.Product.price,
		})
	}

	// очищаем корзину
	await CartItem.destroy({ where: { userId: req.user.id } })

	// перенаправляем в личный кабинет
	res.redirect('/user/dashboard')
}
