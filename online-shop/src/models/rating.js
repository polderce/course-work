const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Rating = sequelize.define(
	'Rating',
	{
		userId: { type: DataTypes.INTEGER, allowNull: false },
		productId: { type: DataTypes.INTEGER, allowNull: false },
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: { min: 1, max: 5 },
		},
	},
	{ timestamps: true }
)

module.exports = Rating
