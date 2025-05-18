/**
 * Файл: src/routes/product.js
 * Назначение:
 *   Маршруты каталога и карточек:
 *   GET /products        — список с фильтрами/сортировкой
 *   GET /products/:id    — подробная страница
 */

const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// Сначала список, чтобы GET /products работал корректно
router.get('/', productController.list)
// Затем просмотр одного товара по ID
router.get('/:id', productController.show)

module.exports = router
