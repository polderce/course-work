/**
 * Файл: src/config/database.js
 * Назначение:
 *   Настройка подключения к MySQL через Sequelize. Экспортирует
 *   экземпляр Sequelize, сконфигурированный по переменным окружения.
 */

require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
		logging: false,
		define: {
			// Автоматически переводим createdAt → created_at и updatedAt → updated_at
			underscored: true,
			timestamps: true,
		},
	}
)

module.exports = sequelize
