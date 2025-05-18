const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define(
	'Product',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		shortDesc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fullDesc: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		subcategoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = Product
