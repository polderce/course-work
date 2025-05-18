/**
 * Файл: src/models/index.js
 * Назначение:
 *   Инициализация всех моделей и объявление ассоциаций между ними.
 *
 * Экспорт:
 *   • sequelize — экземпляр Sequelize
 *   • User, Category, Subcategory, Product, Characteristic, ProductCharacteristic,
 *     Order, OrderItem, CartItem, Comment, Rating
 */

const sequelize = require('../config/database')
const User = require('./user')
const Category = require('./category')
const Subcategory = require('./subcategory')
const Product = require('./product')
const Characteristic = require('./characteristic')
const ProductCharacteristic = require('./productCharacteristic')
const Order = require('./order')
const OrderItem = require('./orderItem')
const CartItem = require('./cartItem')
const Comment = require('./comment')
const Rating = require('./rating')

// Категории и подкатегории
Category.hasMany(Subcategory, {
	foreignKey: 'categoryId',
	onDelete: 'CASCADE',
})
Subcategory.belongsTo(Category, {
	foreignKey: 'categoryId',
	onDelete: 'CASCADE',
})

// Подкатегории и товары
Subcategory.hasMany(Product, {
	foreignKey: 'subcategoryId',
	onDelete: 'CASCADE',
})
Product.belongsTo(Subcategory, {
	foreignKey: 'subcategoryId',
	onDelete: 'CASCADE',
})

// Товары ↔ Характеристики
Product.belongsToMany(Characteristic, {
	through: ProductCharacteristic,
	foreignKey: 'productId',
	onDelete: 'CASCADE',
})
Characteristic.belongsToMany(Product, {
	through: ProductCharacteristic,
	foreignKey: 'characteristicId',
	onDelete: 'CASCADE',
})

// Прямые связи для промежуточной модели
Product.hasMany(ProductCharacteristic, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
	hooks: true,
})
ProductCharacteristic.belongsTo(Product, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
})
Characteristic.hasMany(ProductCharacteristic, {
	foreignKey: 'characteristicId',
	onDelete: 'CASCADE',
	hooks: true,
})
ProductCharacteristic.belongsTo(Characteristic, {
	foreignKey: 'characteristicId',
	onDelete: 'CASCADE',
})

// Пользователи и заказы
User.hasMany(Order, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
Order.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})

// Заказы и позиции заказа
Order.hasMany(OrderItem, {
	foreignKey: 'orderId',
	onDelete: 'CASCADE',
	hooks: true,
})
OrderItem.belongsTo(Order, {
	foreignKey: 'orderId',
	onDelete: 'CASCADE',
})
OrderItem.belongsTo(Product, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
})

// Пользователи и позиции корзины
User.hasMany(CartItem, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
CartItem.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
CartItem.belongsTo(Product, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
})

// Пользователи и комментарии
User.hasMany(Comment, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
Comment.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
Product.hasMany(Comment, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
	hooks: true,
})
Comment.belongsTo(Product, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
})

// Пользователи и рейтинги
User.hasMany(Rating, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
Rating.belongsTo(User, {
	foreignKey: 'userId',
	onDelete: 'CASCADE',
})
Product.hasMany(Rating, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
	hooks: true,
})
Rating.belongsTo(Product, {
	foreignKey: 'productId',
	onDelete: 'CASCADE',
})

module.exports = {
	sequelize,
	User,
	Category,
	Subcategory,
	Product,
	Characteristic,
	ProductCharacteristic,
	Order,
	OrderItem,
	CartItem,
	Comment,
	Rating,
}
