const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Comment = sequelize.define(
	'Comment',
	{
		userId: { type: DataTypes.INTEGER, allowNull: false },
		productId: { type: DataTypes.INTEGER, allowNull: false },
		text: { type: DataTypes.TEXT, allowNull: false },
	},
	{ timestamps: true }
)

module.exports = Comment
