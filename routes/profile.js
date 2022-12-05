const express = require('express')
const router = express()

const {UserProfile, MovieReviews, Movie} = require('../models')
const {getLoggedUser} = require('../middleware/authenticated.js')
const {checkAdmin} = require('../middleware/perms.js')


router.get('/:uuid', getLoggedUser, checkAdmin, async (req, res) => {
    try {
        const {uuid} = req.params
        const profile = await UserProfile.findOne({
            where: {
                uuid
            },
            include: ['user_auths']
        })
        const reviews = await Movie.findAll({
            attributes: ['title', 'slug'],
            include: ['movie_reviews'],
            where: {
                "$movie_reviews.userId$": profile.id
            }
        })
        res.render('profile/show_profile', {
            profile: profile,
            reviews: reviews
        })    
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router