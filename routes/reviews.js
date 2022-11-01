const express = require('express')
const router = express()

const {MovieReviews, Movie} = require('../models')

router.get('/', (req, res) => {
    return res.send("Reviews")
})

router.get('/addReview/:slug', (req, res) => {
    res.render('reviews/addReview', {
        slug: req.params.slug,
        review: MovieReviews.build()
    })
})

router.post('/addReview/:slug', async (req, res) => {
    try {
        const userId = 1
        const movieQuery = await Movie.findOne(({
            where: {
                slug: req.params.slug
            }
        }))
        console.log(movieQuery)
        const movieId = movieQuery.id
        const {reviewTitle, reviewBody, rating} = req.body
    
        const review = await MovieReviews.create({
            review_title: reviewTitle,
            review_body: reviewBody,
            rating: rating,
            movieId: movieId,
            userId: userId
        })
    
        return res.json(review)    
    } catch (err) {
        console.log(err)
        return res.json(err)
        }
})

module.exports = router