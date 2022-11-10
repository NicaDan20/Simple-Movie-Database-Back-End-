const express = require('express')
const {UserProfile, UserAuthentication} = require('../models')
const router = express()
const passport = require('passport')
const initPassport = require('../config/passport_config')
const flash = require('express-flash')
const {checkAuthenticated, checkNotAuthenticated} = require('../functions/authenticated.js')
initPassport(passport)
router.use(passport.initialize())
router.use(flash())

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("auth/register")
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("auth/login")
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const {username, email, password} = req.body
        const Auth = UserAuthentication.build({
            email: email,
            password: password
        })
        if (await Auth.save()) {
            const User = UserProfile.build({
                username: username,
                authId: Auth.id
            })
            await User.save()
            res.send("Success")    
        }
    } catch (err) {
        res.json(err)
        console.log(err)
    }
})

router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

module.exports = router