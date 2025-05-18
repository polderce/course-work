/**
 * Файл: src/controllers/adminProductController.js
 * Назначение:
 *   CRUD-операции для товаров в админ-панели.
 *
 * Функции:
 *   • list       — вывод списка товаров
 *   • showCreate — форма добавления
 *   • create     — сохранение нового товара + характеристик
 *   • showEdit   — форма редактирования
 *   • update     — обновление полей и фото
 *   • remove     — удаление товара
 */

const {
	Product,
	Subcategory,
	Characteristic,
	ProductCharacteristic,
} = require('../models')

// Список товаров
exports.list = async (req, res, next) => {
	try {
		const products = await Product.findAll({ include: [Subcategory] })
		res.render('admin/products/list', {
			user: req.user,
			products,
			activeTab: 'products',
		})
	} catch (err) {
		next(err)
	}
}

// Форма создания
exports.showCreate = async (req, res, next) => {
	try {
		const subcategories = await Subcategory.findAll()
		const characteristics = await Characteristic.findAll()
		res.render('admin/products/form', {
			user: req.user,
			product: {},
			subcategories,
			characteristics,
			activeTab: 'products',
		})
	} catch (err) {
		next(err)
	}
}

// Обработчик создания товара
exports.create = async (req, res, next) => {
	try {
		const {
			name,
			price,
			shortDesc,
			fullDesc,
			stock,
			subcategoryId,
			characteristics,
		} = req.body

		// Имя файла (если загружено)
		const image = req.file ? req.file.filename : null

		// Создаём товар
		const product = await Product.create({
			name,
			price,
			shortDesc,
			fullDesc,
			stock,
			subcategoryId,
			image,
		})

		// Привязываем характеристики
		if (characteristics) {
			for (const [charId, value] of Object.entries(characteristics)) {
				if (value && value.trim() !== '') {
					await ProductCharacteristic.create({
						productId: product.id,
						characteristicId: charId,
						value,
					})
				}
			}
		}

		res.redirect('/admin/products')
	} catch (err) {
		next(err)
	}
}

// Форма редактирования
exports.showEdit = async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id, {
			include: [ProductCharacteristic],
		})
		if (!product) return res.status(404).send('Товар не найден')
		const subcategories = await Subcategory.findAll()
		const characteristics = await Characteristic.findAll()
		res.render('admin/products/form', {
			user: req.user,
			product,
			subcategories,
			characteristics,
			activeTab: 'products',
		})
	} catch (err) {
		next(err)
	}
}

// Обновление товара
exports.update = async (req, res, next) => {
	try {
		const {
			name,
			price,
			shortDesc,
			fullDesc,
			stock,
			subcategoryId,
			characteristics,
		} = req.body

		const product = await Product.findByPk(req.params.id)
		if (!product) return res.status(404).send('Товар не найден')

		// Новое фото или старое
		const image = req.file ? req.file.filename : product.image

		await product.update({
			name,
			price,
			shortDesc,
			fullDesc,
			stock,
			subcategoryId,
			image,
		})

		// Перезаписываем характеристики
		await ProductCharacteristic.destroy({
			where: { productId: product.id },
		})
		if (characteristics) {
			for (const [charId, value] of Object.entries(characteristics)) {
				if (value && value.trim() !== '') {
					await ProductCharacteristic.create({
						productId: product.id,
						characteristicId: charId,
						value,
					})
				}
			}
		}

		res.redirect('/admin/products')
	} catch (err) {
		next(err)
	}
}

// Удаление товара
exports.remove = async (req, res, next) => {
	try {
		await Product.destroy({ where: { id: req.params.id } })
		res.redirect('/admin/products')
	} catch (err) {
		next(err)
	}
}
