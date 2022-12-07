const {Movie} = require('../models')
const {Op} = require('sequelize')
const itemsPerPage = 6

async function getMovies(req, res, next) {
    try {
        let sortStatement = prepareSortStatement(req)
        let whereStatement = prepareWhereStatement(req)
        let searchStatement = prepareSearchStatement(req)

        let size = await Movie.count({
            where: [searchStatement],
        })
        req.totalPages = Math.ceil(size/itemsPerPage)
        if (!req.query.page || req.query.page > req.totalPages) {
            req.page = 1
        } else {
            req.page = parseInt(req.query.page)
        }

        const movies = await Movie.findAll({
            include: [{
                association: 'director',
            }, {
                association: 'movie_reviews',
                required: false,
                where: [whereStatement],
            }, {
                association: 'users',
            }],
            order: [sortStatement],
            where: [searchStatement],
            limit: itemsPerPage,
            offset: (req.page - 1) * itemsPerPage,
        })
        req.movies = movies
    } catch (err) {
        console.log(err)
        res.status(400).redirect('back')
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
    if (req.query.genre) {
        console.log("=================================" + req.query.genre)
        searchStatement = {
            genre: `${req.query.genre}`
        }
    }
    return searchStatement
}

function prepareWhereStatement (req) {
    let whereStatement = {}
    if (req.user) {
        whereStatement["$movie_reviews.userId$"] = req.user.id
    }
    return whereStatement
}

function prepareSortStatement (req) {
        let sortStatement = ['id', 'ASC']
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