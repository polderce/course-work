/**
 * Файл: src/seeders/seed.js
 * Назначение:
 *   Сброс (force: true) и заполнение БД русскоязычными тестовыми данными,
 *   включая реальные URL картинок с Picsum.
 *
 * Использует:
 *   • @faker-js/faker/locale/ru — русская локаль
 *   • Sequelize для работы с MySQL
 */

const {
	sequelize,
	Category,
	Subcategory,
	Product,
	Characteristic,
	ProductCharacteristic,
} = require('../models')
// импортируем сразу с русской локалью
const { faker } = require('@faker-js/faker/locale/ru')

async function seed() {
	// 1) Сброс БД
	await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
	await sequelize.sync({ force: true })
	await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')

	// 2) Характеристики
	const charDefs = [
		{
			name: 'Цвет',
			values: ['красный', 'синий', 'зеленый', 'черный', 'белый'],
		},
		{ name: 'Размер', values: ['XS', 'S', 'M', 'L', 'XL'] },
		{ name: 'Вес', values: null },
		{
			name: 'Материал',
			values: ['Дерево', 'Пластик', 'Металл', 'Ткань', 'Стекло'],
		},
		{
			name: 'Бренд',
			values: ['Acme', 'РосОдежда', 'ТехМаркет', 'ДомСтиль', 'СпортЛайн'],
		},
	]
	const characteristics = []
	for (const def of charDefs) {
		const model = await Characteristic.create({ name: def.name })
		characteristics.push({ model, values: def.values })
	}

	// 3) Категории и подкатегории
	const categoriesData = [
		{
			name: 'Электроника',
			subs: ['Смартфоны', 'Ноутбуки', 'Камеры', 'Гаджеты'],
		},
		{ name: 'Одежда', subs: ['Мужская', 'Женская', 'Детская', 'Аксессуары'] },
		{ name: 'Дом', subs: ['Мебель', 'Декор', 'Техника', 'Текстиль'] },
		{
			name: 'Спорт',
			subs: ['Фитнес', 'Активный отдых', 'Обувь', 'Экипировка'],
		},
		{
			name: 'Книги',
			subs: ['Художественная', 'Научная', 'Детская', 'Путеводители'],
		},
	]
	const subcategories = []
	for (const cat of categoriesData) {
		const category = await Category.create({ name: cat.name })
		for (const subName of cat.subs) {
			const sub = await Subcategory.create({
				name: subName,
				categoryId: category.id,
			})
			subcategories.push(sub)
		}
	}

	// 4) Товары
	for (let i = 0; i < 100; i++) {
		const sub = faker.helpers.arrayElement(subcategories)

		// уникальный seed для картинки
		const picSeed = faker.string.uuid()
		const imageUrl = `https://picsum.photos/seed/${picSeed}/640/480`

		const product = await Product.create({
			name: faker.commerce.productName(),
			price: faker.commerce.price(100, 100000, 2),
			shortDesc: faker.commerce.productAdjective(),
			fullDesc: faker.lorem.paragraph(),
			stock: faker.number.int({ min: 0, max: 100 }),
			subcategoryId: sub.id,
			image: imageUrl,
		})

		// 3 характеристики на товар
		const chars = faker.helpers.arrayElements(characteristics, 3)
		for (const ch of chars) {
			const value =
				ch.model.name === 'Вес'
					? `${faker.number.int({ min: 100, max: 5000 })} г`
					: faker.helpers.arrayElement(ch.values)
			await ProductCharacteristic.create({
				productId: product.id,
				characteristicId: ch.model.id,
				value,
			})
		}
	}

	console.log('Сидирование завершено')
	process.exit(0)
}

seed().catch(err => {
	console.error('Ошибка при сидировании:', err)
	process.exit(1)
})
