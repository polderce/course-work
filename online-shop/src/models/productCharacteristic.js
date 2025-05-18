const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const ProductCharacteristic = sequelize.define(
	'ProductCharacteristic',
	{
		productId: { type: DataTypes.INTEGER, allowNull: false },
		characteristicId: { type: DataTypes.INTEGER, allowNull: false },
		value: { type: DataTypes.STRING, allowNull: false },
	},
	{ timestamps: false }
)

module.exports = ProductCharacteristic
