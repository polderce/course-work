const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Subcategory = sequelize.define(
	'Subcategory',
	{
		name: { type: DataTypes.STRING, allowNull: false },
		categoryId: { type: DataTypes.INTEGER, allowNull: false },
	},
	{ timestamps: false }
)

module.exports = Subcategory
