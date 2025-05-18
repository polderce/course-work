/**
 * Файл: src/controllers/productController.js
 * Назначение:
 *   Логика отображения каталога и отдельного товара.
 *
 * Функции:
 *   • list — загрузка товаров с условиями фильтра/сортировки/характеристик
 *   • show — загрузка одного товара с комментариями и рейтингами
 */

const { Op } = require('sequelize')
const {
	Product,
	Subcategory,
	Category,
	Characteristic,
	ProductCharacteristic,
	Comment,
	Rating,
	User,
} = require('../models')

exports.list = async (req, res, next) => {
	try {
		const { category, subcategory, sort, availability, name } = req.query
		const where = {}
		const include = [
			{ model: Subcategory, include: [Category] },
			{ model: ProductCharacteristic, include: [Characteristic] },
			{ model: Rating },
		]

		// Фильтрация по подкатегории / категории
		if (subcategory) {
			where.subcategory_id = subcategory
		} else if (category) {
			include[0].where = { category_id: category }
		}

		// Поисковый фильтр
		if (name) {
			where.name = { [Op.like]: `%${name}%` }
		}

		// Фильтр по наличию
		if (availability === 'in_stock') where.stock = { [Op.gt]: 0 }
		if (availability === 'out_of_stock') where.stock = 0

		let products = await Product.findAll({ where, include })

		// Сортировка на JS-стороне
		if (sort) {
			const avgRating = arr =>
				arr.length ? arr.reduce((sum, r) => sum + r.rating, 0) / arr.length : 0

			products.sort((a, b) => {
				switch (sort) {
					case 'price_asc':
						return a.price - b.price
					case 'price_desc':
						return b.price - a.price
					case 'name_asc':
						return a.name.localeCompare(b.name)
					case 'name_desc':
						return b.name.localeCompare(a.name)
					case 'availability':
						return b.stock - a.stock
					case 'rating_asc':
						return avgRating(a.Ratings) - avgRating(b.Ratings)
					case 'rating_desc':
						return avgRating(b.Ratings) - avgRating(a.Ratings)
					default:
						return 0
				}
			})
		}

		const categories = await Category.findAll({ include: [Subcategory] })

		res.render('products/list', {
			products,
			categories,
			filters: req.query,
		})
	} catch (err) {
		next(err)
	}
}

exports.show = async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id, {
			include: [
				{ model: Subcategory, include: [Category] },
				{ model: ProductCharacteristic, include: [Characteristic] },
				{ model: Comment, include: [User] },
				{ model: Rating },
			],
		})
		if (!product) {
			return res.status(404).render('404', { message: 'Товар не найден' })
		}
		res.render('products/show', { product })
	} catch (err) {
		next(err)
	}
}
