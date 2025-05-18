const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middlewares/auth')
const commentController = require('../controllers/commentController')

router.post(
	'/products/:id/comments',
	ensureAuthenticated,
	commentController.addComment
)
router.post(
	'/products/:id/rate',
	ensureAuthenticated,
	commentController.addRating
)
module.exports = router
