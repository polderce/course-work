/**
 * Файл: src/models/[имя].js
 * Назначение:
 *   Определение Sequelize-модели “[Имя]” с полями и опциями.
 *
 * Поля:
 *   • ... (описание полей)
 * Ассоциации:
 *   • ... (привязки к другим моделям в index.js)
 */

const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const CartItem = sequelize.define(
	'CartItem',
	{
		userId: { type: DataTypes.INTEGER, allowNull: false },
		productId: { type: DataTypes.INTEGER, allowNull: false },
		quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
	},
	{ timestamps: false }
)

module.exports = CartItem
