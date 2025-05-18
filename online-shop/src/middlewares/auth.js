exports.ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next()
	res.redirect('/login')
}
exports.ensureGuest = (req, res, next) => {
	if (!req.isAuthenticated()) return next()
	res.redirect('/user/dashboard')
}
