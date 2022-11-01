const express = require('express')
const router = express()

const {Movie, Director} = require('../models')

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: { all: true, nested: true }
        })
        res.render('movies/show_movies', {
            movies: movies
        })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/all', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: {all: true}
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
            include: ['director', 'movie_reviews'],
            where: {
                slug: slug
            }, 
        })
        console.log(movie)
        res.render('movies/show_movie', {
            movie: movie
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



module.exports = router