const {Movie, Director, MovieReviews, sequelize} = require('../models')
const {Op, where} = require('sequelize')

async function getMovies(req, res, next) {
    try {
        let sortStatement = prepareSortStatement(req)
        let whereStatement = prepareWhereStatement(req)
        let searchStatement = prepareSearchStatement(req)
        const movies = await Movie.findAll({
            include: [{
                association: 'director'
            }, {
                association: 'movie_reviews',
                required: false,
                where: [whereStatement]
            }, {
                association: 'users'
            }],
            order: [sortStatement],
            where: [searchStatement],
        })
        req.movies = movies
    } catch (err) {
        console.log(err)
        res.json(err)
    }
    next()
}

function prepareSearchStatement (req) {
    let searchStatement = {}
    if (req.query.search) {
        console.log(req.query.search)
        searchStatement = {
            title: {
            [Op.iLike]: `%${req.query.search}%`
        }
    }
    }
    return searchStatement
}

function prepareWhereStatement (req) {
    let whereStatement = {}
    if (req.user) {
        whereStatement = {
            "$movie_reviews.userId$": req.user.id
        }
    }
    return whereStatement
}

function prepareSortStatement (req) {
        let sortStatement = ['id', 'ASC']
        let whereStatement = {}
        if (req.query.sort) {
            let {sort} = req.query
            switch(sort) {
                case "A-Z_descending": {
                    sortStatement = ['title', 'DESC']
                    req.currentSort = 'A-Z_descending'
                    break;
                }
                case "A-Z_ascending": {
                    sortStatement = ['title', 'ASC']
                    req.currentSort = 'A-Z_ascending'
                    break;
                }
                case "User Rating_descending": {
                    sortStatement = ['rating', 'DESC']
                    req.currentSort = 'User Rating_descending'
                    break;
                }
                case "User Rating_ascending": {
                    sortStatement = ['rating', 'ASC']
                    req.currentSort = 'User Rating_ascending'
                    break;
                }
                case "Release Date_descending": {
                    sortStatement = ['release_date', 'DESC']
                    req.currentSort = 'Release Date_descending'
                    break;
                }
                case "Release Date_ascending": {
                    sortStatement = ['release_date', 'ASC']
                    req.currentSort = 'Release Date_ascending'
                    break;
                }
                case "Your Rating_descending": {
                    if (req.user) {
                        sortStatement = ['movie_reviews', 'rating', 'DESC NULLS LAST'] 
                        req.currentSort = 'Your Rating_descending'    
                    }
                    break;
                }
                case "Your Rating_ascending": {
                    if (req.user) {
                        sortStatement = ['movie_reviews', 'rating', 'ASC NULLS LAST'] 
                        req.currentSort = 'Your Rating_ascending'    
                    }
                    break;
                }
                case "Runtime_descending": {
                        sortStatement = ['runtime', 'DESC NULLS LAST'] 
                        req.currentSort = 'Runtime_descending'    
                    break;
                }
                case "Runtime_ascending": {
                        sortStatement = ['runtime', 'ASC NULLS LAST'] 
                        req.currentSort = 'Runtime_ascending'    
                    break;
                }
                case "Number of Reviews_descending": {
                    sortStatement = ['rating_count', 'DESC']
                    req.currentSort = 'Number of Reviews_descending'
                }
                case "Number of Reviews_ascending": {
                    sortStatement = ['rating_count', 'ASC']
                    req.currentSort = 'Number of Reviews_ascending'
                }
                default: {
                    break;
                }
            }
        }
        return sortStatement
}


module.exports = {getMovies}