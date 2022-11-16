const express = require('express')
const router = express()

const {Sequelize} = require('sequelize')
const {Movie, Director, MovieReviews, sequelize} = require('../models')
const {checkReviewExists} = require('../middleware/reviews')
const {Op} = require('sequelize')

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

router.get('/search', async (req, res) => {
    try {
        const {search} = req.query
        console.log(`Hello ${search}`)
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${search}%`
                }
            },
            include: {all: true, nested: true}
        })
        if (movies.length !== 0) {
            res.render('movies/show_movies', {
                movies: movies
            })
        } else {
            res.send('No movies found!')
        }
    } catch (err) {
        res.json(err)
    }
})

router.get('/all', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: ['users'],
            
        })
        res.json(movies)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/test', async (req, res) => {
    try {
        const movies = await MovieReviews.findAll({
            include: ['movie_reviews', 'user_reviews'],
            where: {
                "$movie_reviews.slug$": 'goodfellas-1234'
            }
        })        
        res.json(movies)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


router.get('/title/:slug', checkReviewExists, async (req, res) => {
    let slug = req.params.slug
    try {
        const movie = await Movie.findOne({
            include: ['director', 'movie_reviews'],
            where: {
                slug: slug
            }, 
        })
        res.render('movies/show_movie', {
            movie: movie
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



module.exports = router