/**
 * Файл: src/config/multer.js
 * Назначение:
 *   Настройка загрузки файлов (изображений) через Multer.
 *   Определяет storage (куда сохранять) и fileFilter (только картинки).
 *
 * Экспорт:
 *   • upload — middleware для обработки multipart/form-data
 */

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'uploads'))
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, Date.now() + ext)
	},
})

function fileFilter(req, file, cb) {
	if (file.mimetype.startsWith('image/')) cb(null, true)
	else cb(new Error('Только изображения.'), false)
}

module.exports = multer({
	storage,
	fileFilter,
	limits: { fileSize: 100 * 1024 * 1024 }, // до 100 МБ
})
