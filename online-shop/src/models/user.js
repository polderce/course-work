/**
 * Файл: src/models/user.js
 * Назначение:
 *   Модель User — для хранения зарегистрированных пользователей.
 *
 * Поля:
 *   • name     — STRING, не null
 *   • email    — STRING, уникальный
 *   • password — STRING, хеш пароля
 *   • role     — ENUM('user','admin')
 */

const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define(
	'User',
	{
		email: { type: DataTypes.STRING, unique: true, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
		role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
	},
	{ timestamps: true }
)

module.exports = User
