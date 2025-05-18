const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Category = sequelize.define(
	'Category',
	{
		name: { type: DataTypes.STRING, unique: true, allowNull: false },
	},
	{ timestamps: false }
)

module.exports = Category
