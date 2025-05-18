const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const OrderItem = sequelize.define(
	'OrderItem',
	{
		orderId: { type: DataTypes.INTEGER, allowNull: false },
		productId: { type: DataTypes.INTEGER, allowNull: false },
		quantity: { type: DataTypes.INTEGER, allowNull: false },
		priceAtOrder: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
	},
	{ timestamps: false }
)

module.exports = OrderItem
