const express = require('express')
const router = express()

const {Sequelize} = require('sequelize')
const {Movie, Director, MovieReviews, sequelize} = require('../models')
const {checkReviewExists} = require('../middleware/reviews')
const {Op} = require('sequelize')
const {getMovies} = require('../middleware/movies')
const { getLoggedUser } = require('../middleware/authenticated')
const {checkAdmin} = require('../middleware/perms.js')
const {generatePages} = require('../middleware/pagination.js')


router.get('/', getMovies, getLoggedUser, generatePages, checkAdmin, async (req, res) => {
    currentPage = parseInt(req.query.page) || 1
    totalPages = parseInt(req.totalPages)
    genre = req.query.genre
    res.render('movies/show_movies', {
        movies: req.movies,
        currentSort: req.currentSort,
        pageList: req.pageList
    })
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
        const movies = await Movie.findAll({
            include: [{
                association: 'director'
            }, {
            association: 'movie_reviews',
            required: false,
            where: {
                '$movie_reviews.userId$': '1'}
        }],
            order: [
                ['movie_reviews', 'rating', 'ASC'] 
            ]
        })        
        res.json(movies)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


router.get('/title/:slug', getLoggedUser, checkReviewExists, checkAdmin, async (req, res) => {
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