const {Director} = require('../models')
const itemsPerPage = 3

async function getDirectors (req, res, next) {
    try {

        let size = await Director.count()
        req.totalPages = Math.ceil(size/itemsPerPage)
        if (!req.query.page || req.query.page > req.totalPages) {
            req.page = 1
        } else {
            req.page = parseInt(req.query.page)
        }

        const directors = await Director.findAll({
            limit: itemsPerPage,
            offset: (req.page - 1)* itemsPerPage,
        })

        req.directors = directors
    } catch (err) {
        console.log(err)
        res.status(400).redirect('back')
    }
    next()
}

module.exports = {getDirectors}