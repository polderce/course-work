const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Characteristic = sequelize.define(
	'Characteristic',
	{
		name: { type: DataTypes.STRING, allowNull: false },
	},
	{ timestamps: false }
)

module.exports = Characteristic
