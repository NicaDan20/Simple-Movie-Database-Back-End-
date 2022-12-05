function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

function getLoggedUser(req, res, next) {
    if (req.user) {
        res.locals.CURRENT_USER = req.user
    }
    next()
}

module.exports = {checkAuthenticated, checkNotAuthenticated, getLoggedUser}