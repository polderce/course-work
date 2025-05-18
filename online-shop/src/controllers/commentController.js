const { Comment, Rating } = require('../models')

exports.addComment = async (req, res) => {
	const { id } = req.params
	const { text } = req.body
	await Comment.create({ userId: req.user.id, productId: id, text })
	res.redirect(`/products/${id}`)
}

exports.addRating = async (req, res) => {
	const { id } = req.params
	const { rating } = req.body
	if (!rating) return res.redirect(`/products/${id}`)

	const value = parseInt(rating, 10)
	// Либо создаём новую оценку сразу с нужным значением,
	// либо обновляем существующую
	const [rate, created] = await Rating.findOrCreate({
		where: { userId: req.user.id, productId: id },
		defaults: { rating: value },
	})
	if (!created) {
		rate.rating = value
		await rate.save()
	}
	res.redirect(`/products/${id}`)
}
