const express = require('express')
const router = express()

const {MovieReviews} = require('../models')
const {ReviewsUsers} = require('../models')

router.get('/', (req, res) => {
    return res.send("Reviews")
})

router.post('/addReview', async (req, res) => {
    try {
        const userId = 1
        const movieId = 1
        const {review_title, review_body, rating} = req.body
    
        const review = await MovieReviews.create({
            review_title: review_title,
            review_text: review_body,
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