const express = require('express')
const { Op } = require('sequelize')
const router = express()

const {MovieReviews, Movie, sequelize} = require('../models')
const {checkReviewExists, redirectReviewPage} = require('../middleware/reviews')
const {checkNotAuthenticated} = require('../middleware/authenticated')

router.get('/showReviews/:slug', checkReviewExists, async (req, res) => {
    const {slug} = req.params
    const reviews = await MovieReviews.findAll({
        include: ['movie_reviews', 'user_reviews'],
        where: {
            "$movie_reviews.slug$": slug
        }
    })
    const movie = await Movie.findOne({
        where: {
            slug
        }
    })
    
    res.render('movies/show_reviews', {
        reviews: reviews,
        movie: movie
    })

})

router.get('/addReview/:slug', checkReviewExists, redirectReviewPage, (req, res) => {
    res.render('reviews/addReview', {
        slug: req.params.slug,
        review: MovieReviews.build({
            review_title: null,
            review_body: null,
            rating: "No Rating"
        })
    })
})

router.get('/editReview/:slug', async (req, res) => {
    try {
        const movie = await Movie.findOne({
            attributes: ['id'],
            where: {
                slug: req.params.slug
            },
            raw: true
        })
    
        const movieId = movie.id
    
        res.render('reviews/editReview', {
            slug: req.params.slug,
            review: await MovieReviews.findOne({
                where: {
                    userId: req.user.id,
                    movieId: movieId
                }
             })
        })    
    } catch (err) {
        console.log(err)
        res.status(404).redirect(`/movies/title/${req.params.slug}`)
    }
})

router.post('/addReview/:slug', async (req, res) => {
    try {
        const movieQuery = await Movie.findOne(({
            where: {
                slug: req.params.slug
            }
        }))
        const userId = req.user.id
        const movieId = movieQuery.id
        const {reviewTitle, reviewBody, rating} = req.body
        
        const review = await MovieReviews.build({
            review_title: reviewTitle,
            review_body: reviewBody,
            movieId: movieId,
            userId: userId
        })
        if (rating !== "No Rating") {
            review.rating = rating
            addRating(movieId, parseInt(rating))
        }

        await review.save()

        return res.json(review)    
    } catch (err) {
        console.log(err)
        return res.json(err)
        }
})

router.post('/editReview/:slug', async (req, res) => {
    try {
        const movieQuery = await Movie.findOne({
            where: {
                slug: req.params.slug
            }
        })
        const userId = req.user.id
        const movieId = movieQuery.id
        const {reviewTitle, reviewBody, rating} = req.body

        const review = await MovieReviews.findOne({
            where: {
                movieId: movieId,
                userId: userId
            }
        })

        review.review_body = reviewBody
        review.review_title = reviewTitle

        if (rating !== "No Rating") {
            await editRating(movieId, userId, "UPDATE", parseInt(rating))
            review.rating = rating
        } else {
            await editRating(movieId, userId, "DELETE")
            review.rating = null
        }

        await review.save()
        res.json(review)

    } catch(err) {
        console.log(err)
    }
})

// updates the overall rating of the movie

async function addRating (m_id, rating) {
    try {
        movieOverallRating = await Movie.findOne({
            where: {
                id: m_id
            },
            attributes: ['id', 'rating', 'rating_count']
        })
        let count = movieOverallRating.rating_count
        let overallRating = movieOverallRating.rating
        let newRating = (count*overallRating)/(++count) + (rating/count)
        console.log(newRating)
        movieOverallRating.rating = newRating
        movieOverallRating.rating_count = count
        await movieOverallRating.save()    
    } catch (err) {
        console.log(err)
    }
}

async function editRating (m_id, u_id, option, rating=0) {
    try {
        movieOverallRating = await Movie.findOne({
            where: {
                id: m_id
            },
            attributes: ['id', 'rating', 'rating_count']
        })
    
        userRating = await MovieReviews.findOne({
            where: {
                movieId: m_id,
                userId: u_id
            },
            attributes: ['id', 'rating']
        })
    
        let count = movieOverallRating.rating_count
        let overallRating = movieOverallRating.rating
        let sumOfRatings = overallRating * count
    
        switch (option) {
            case "UPDATE": {
                console.log(`1. =========== Sum of Ratings: ${sumOfRatings} ========= userRating.rating : ${userRating.rating} ========== rating : ${rating} ========= count: ${count} `)
                sumOfRatings -= userRating.rating
                console.log(`2. =========== Sum of Ratings: ${sumOfRatings} ========= userRating.rating : ${userRating.rating} ========== rating : ${rating} ========= count: ${count} `)
                sumOfRatings += parseInt(rating)
                console.log(`3. =========== Sum of Ratings: ${sumOfRatings} ========= userRating.rating : ${userRating.rating} ========== rating : ${rating} ========= count: ${count} `)
                overallRating = sumOfRatings/count
                console.log(`4. =========== Sum of Ratings: ${sumOfRatings} ========= userRating.rating : ${userRating.rating} ========== rating : ${rating} ========= count: ${count} `)

                movieOverallRating.rating = overallRating
    
                break;
    
            }
            case "DELETE": {
                sumOfRatings -= userRating.rating
                count--
                overallRating = sumOfRatings/count
    
                movieOverallRating.rating = overallRating
    
                break;
            }
            default: {
                break;
            }
        }
    
        await movieOverallRating.save()
    } catch (err) {
        console.log(err)
    }

}

module.exports = router