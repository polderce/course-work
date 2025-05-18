/**
 * Файл: src/controllers/searchController.js
 * Назначение:
 *   Логика поиска товаров: поиск по LIKE имени и рендер результатов.
 *
 * Функции:
 *   • results — загрузка массива products и вывод results.ejs
 */

const { Op } = require('sequelize')
const {
	Product,
	Subcategory,
	ProductCharacteristic,
	Characteristic,
} = require('../models')

exports.search = async (req, res) => {
	const { q } = req.query
	const products = await Product.findAll({
		where: { name: { [Op.like]: `%${q}%` } },
		include: [
			{ model: Subcategory, include: ['Category'] },
			{ model: ProductCharacteristic, include: [Characteristic] },
		],
	})
	res.render('products/search', { user: req.user, products, query: q })
}
