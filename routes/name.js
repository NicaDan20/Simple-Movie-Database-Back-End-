const express = require('express')
const router = express()

const {Director} = require('../models')
const {calculateAge} = require ('../functions/functions.js')
const {getLoggedUser} = require('../middleware/authenticated.js')
const {checkAdmin} = require('../middleware/perms.js')
const {getDirectors} = require('../middleware/directors')
const {generatePages} = require('../middleware/pagination')

router.get('/', getDirectors, generatePages, getLoggedUser, checkAdmin,  (req, res) => {
    currentPage = parseInt(req.page) || 1
    totalPages = parseInt(req.totalPages)
    res.render('movies/show_directors', {
        directors: req.directors,
        pageList: req.pageList
    })
})

router.get('/:slug', getLoggedUser, checkAdmin, async (req, res) => {
    try {
        slug = req.params.slug
        const director = await Director.findOne({
            where: {
                slug
            },
            include: 'movies'
        })
        let directorAge = calculateAge(director.birth_date)
        res.render('movies/show_director', {
            director: director,
            directorAge: directorAge
        })
    } catch(err) {
        console.log(err)
        res.json(err)
    }
})

module.exports = router