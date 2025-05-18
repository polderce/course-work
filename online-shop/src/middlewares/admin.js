exports.ensureAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.role === 'admin') return next()
	res.status(403).send('Доступ запрещен')
}
