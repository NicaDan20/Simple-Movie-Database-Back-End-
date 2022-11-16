const {Sequelize} = require('sequelize')
const {sequelize} = require('../models')


async function checkReviewExists(req, res, next) {
    if (req.user) {
        try {
            const result = await sequelize.query(
                `SELECT * from "movie_reviews"
                WHERE
                "userId" = ${req.user.id}
                AND
                "movieId" = (
                    SELECT "id" FROM "movies" WHERE "slug" = '${req.params.slug}'
                )`
                , {
                type: Sequelize.QueryTypes.SELECT
            })
            if ( result.length !== 0) {
                console.log("We have review")
                res.locals.REVIEW_EXISTS = true
                res.locals.USER_REVIEW = result
            }
            else {
                console.log("We have no review")
                res.locals.REVIEW_EXISTS = false
            }
            next()        
        } catch (err) {
        console.log(err)
        res.redirect('/')
        }
    } else {
        console.log("We have no user logged in!")
        next()
    }
}

function redirectReviewPage (req, res, next) {
    if (req.user) {
        if (res.locals.REVIEW_EXISTS) {
            console.log("Access denied to review")
            res.redirect(`/reviews/showReviews/${req.params.slug}`)
        } else {
            console.log("Access granted to review")
            next()
        }
    } else {
        res.status(200).redirect('/auth/login')
    }
}

module.exports = {checkReviewExists, redirectReviewPage}