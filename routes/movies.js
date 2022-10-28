const express = require('express')
const router = express()

const {Movie, Director} = require('../models')

router.get('/', (req, res) => {
    res.send("Movies main page")
})

router.get('/all', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: [ 'director'],
        })
        res.json(movies)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/title/:slug', async (req, res) => {
    let slug = req.params.slug
    console.log(slug)
    try {
        const movie = await Movie.findOne({
            include: ['director'],
            where: {
                slug: slug
            }
        })
        res.json(movie)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router