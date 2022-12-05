const express = require('express')
const {UserProfile, UserAuthentication} = require('../models')
const router = express()
const passport = require('passport')
const initPassport = require('../config/passport_config')
const flash = require('express-flash')
const {checkAuthenticated, checkNotAuthenticated, getLoggedUser} = require('../middleware/authenticated.js')
const {checkAdmin} = require('../middleware/perms.js')

initPassport(passport)
router.use(passport.initialize())
router.use(flash())

router.get('/register', checkNotAuthenticated, getLoggedUser, checkAdmin, (req, res) => {
    res.clearCookie("_message", { httpOnly: true });
    res.render("auth/register", {
        _message: req.cookies["_message"]
    })
})

router.get('/login', checkNotAuthenticated, getLoggedUser, checkAdmin, (req, res) => {
    res.clearCookie("_message", { httpOnly: true });
    res.render("auth/login", {
        _message: req.cookies["_message"]
    })
})

router.post('/register', checkNotAuthenticated, getLoggedUser, checkAdmin, async (req, res) => {
    try {
        const {username, email, password} = req.body
        const Auth = UserAuthentication.build({
            email: email,
            password: password
        })
        if (await Auth.save()) {
            const User = UserProfile.build({
                username: username,
                authId: Auth.id,
                roleId: 3
            })
            await User.save()
            res.cookie("_message", "Registered Succesfully!", { httpOnly: true });
            res.status(200).redirect('/auth/login')
        }
    } catch (err) {
        res.cookie("_message", "Something went wrong! Please try again.", { httpOnly: true });
        res.redirect('/auth/register')
        console.log(err)
    }
})

router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successReturnToOrRedirect: `/movies`,
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.delete('/logout', (req, res) => {
    req.logOut(function (err) {
        if(err) {
            return next(err)
        }
        res.redirect('/auth/login')
    })
})

module.exports = router