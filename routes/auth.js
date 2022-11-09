const express = require('express')
const router = express()

router.get('/register', (req, res) => {
    res.render("auth/register")
})



module.exports = router