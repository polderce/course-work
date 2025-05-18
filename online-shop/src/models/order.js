const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Order = sequelize.define(
	'Order',
	{
		userId: { type: DataTypes.INTEGER, allowNull: false },
		status: {
			type: DataTypes.ENUM('new', 'in_process', 'completed', 'canceled'),
			defaultValue: 'new',
		},
	},
	{ timestamps: true }
)

module.exports = Order
