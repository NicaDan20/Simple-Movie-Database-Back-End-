 /*
    Admin router. Defines functions for adding/removing movies and directors, banning users, deleting reviews etc.   
 */

const express = require('express')
const router = express()
const {Movie, Director, UserProfile} = require('../models')
const imageUploadPath = require('../functions/path.js')
const path = require ('path')
const multer  = require('multer')
const fs = require('fs')
const sharp = require('sharp')

  /*
    Define Storage and upload objects for the Multer middleware.

    We store images in the hard drive, in separate folders for movies and directors. To the database we only send a reference path pointing to that file.
    This allows for faster data read operations.
  */

const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
            if(req.route.path === '/addDirector' || req.route.path.includes('/editDirector/')) {
                callback(null, path.join(imageUploadPath, '/directors'))
            }
            if(req.route.path === '/addMovie' || req.route.path.includes('/editMovie/')) {
                callback(null, path.join(imageUploadPath, '/movies'))
            }
    }, 
    filename: (req, file, callback) => {
        if(req.route.path === '/addDirector' || req.route.path.includes('/editDirector/')) {
            callback(null, 'D' + '-' + Date.now() + '-' + file.originalname)
        }
        if(req.route.path === '/addMovie' || req.route.path.includes('/editMovie/')) {
            callback(null, 'M' + '-' + Date.now() + '-' + file.originalname)
        }
    }
})

const upload = multer({ 
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * parseInt(process.env.IMAGE_MAX_SIZE)
    } 
})

/*
    Display main panels Route
 */

router.get('/', (req, res) => {
    let _message = req.cookies["_message"]
    res.clearCookie("_message", { httpOnly: true });
    res.render('admin/panel', {
        _message: req.cookies["_message"]
    })
})

router.get('/showDirectors', async (req, res) => {
    const directors = await Director.findAll()
    res.render('admin/showDirectors', {
        directors: directors
    })
})

router.get('/showMovies', async (req, res) => {
    const movies = await Movie.findAll()
    res.render('admin/showMovies', {
        movies: movies
    })
})

/*
    MOVIE RELATED ROUTES
 */

router.get('/addMovie', async (req, res) => {
    try {
        res.render('admin/addMovie', {
            directors: await Director.findAll({
                attributes: ['name']
            }),
            movie: Movie.build({
                title: null,
                genre: "Select Genre",
                director: null,
                description: null,
                release_date: Date.now()
            }),
            directorName: null
        })
    } catch (err) {
        console.log(err)
        res.status(500).redirect('/', {
            _message: `Error! Something went wrong: ${err}`
        })
    }
})

/*
Creates New Movie and adds to Database
*/

router.post('/addMovie', upload.single('img'), async (req, res) => {
    const {title, genre, director, description, release_date} = req.body
    try {
        const directorQuery = await Director.findOne({ 
            attributes: ['id'],
            where: {
                name: director
            }
        })
        const directorId = directorQuery.id
        const movie = Movie.build({
            title: title,
            genre: genre,
            directorId: directorId,
            description: description,
            release_date: release_date 
        })
        if (req.file) {
            movie.path_to_cover = formatPath(req.file.path)
            if (await Movie.findOne({where: {directorId, description, release_date}}) !== null) {
                fs.unlinkSync(req.file.path)
            }    
        }    
        await movie.save()
        res.cookie("_message", "Movie added succesfully!", { httpOnly: true });
        return res.status(200).redirect('/admin')
    }
    catch (err) {
        console.log(err)
        directorName = await Director.findOne({
            where: {
                id: movie.directorId
            },
            attributes: ['name'],
            plain: true,
        })
        res.render('admin/addMovie', {
            directors: await Director.findAll({
                attributes: ['name']
            }),
            movie: Movie.build({
                title: title,
                genre: genre,
                directorId: directorId,
                description: description,
                release_date: release_date
            }),
            directorName: directorName
        })
    }

})

/*
Updates Movie with uuid in Database
*/

router.get('/editMovie/:uuid', async (req, res) => {
    const {uuid} = req.params
    try {
        const movie = await Movie.findOne({ where: {uuid} })
        directorName = await Director.findOne({
            where: {
                id: movie.directorId
            },
            attributes: ['name'],
            plain: true,
        })
        res.render('admin/editMovie', {
            directors: await Director.findAll({
                attributes: ['name']
            }),
            directorName: directorName.name,
            movie: movie
        })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.put('/editMovie/:uuid', upload.single('img'), async (req, res) => {
    const {title, director, genre, description, release_date} = req.body
    const uuid = req.params.uuid
    try {
        const movie = await Movie.findOne({
            where: {
                uuid: uuid
            }
        })

        if (director === null) {
            const directorQuery = await Director.findOne({ 
                attributes: ['id'],
                where: {
                    name: director
                }
            })    
            movie.directorId = directorQuery.id

        }

        movie.title = title
        movie.genre = genre
        movie.description = description
        movie.release_date = release_date

        console.log("------------------------------------------")
        console.log(req.body)

        await movie.save()
        res.cookie("_message", "Movie updated succesfully!", { httpOnly: true });
        return res.status(200).redirect('/admin')
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

/*
Deletes Movie with uuid in Database
*/

router.delete('/deleteMovie/:uuid', async (req, res) => {
    const {uuid} = req.params
    try {
        await Movie.destroy({
            where: {
                uuid: uuid
            }
        })
        res.send(`Movie with uuid of ${uuid} has been deleted`)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

/* 
 DIRECTOR RELATED ROUTES
 */

router.get('/addDirector', (req, res) => {
    res.render('admin/addDirector', {
        director: Director.build({
            name: "",
            birth_date: Date.now(),
            bio: ""
        })
    })
})

/* Create Director and add to Database */

router.post('/addDirector', upload.single('img'), async (req, res) => {
    const {name, birth_date, bio} = req.body
    try {
        const director = Director.build({
            name: name,
            birth_date: birth_date,
            bio: bio
        })
        /*
        We want to check if the added director is not a duplicate. A director can share the same name or the same birthdate however it is implausible that they have
        the same biography. By design, the sequelize models do not accept duplicate data however we need another check at the route level to prevent uploading images
        even when the form submission fails. 

        So, by convention we assume that if the same biographic data is uploaded then we are dealing with a duplicate. In that case, we are deleting the
        newly uploaded image. 

        By design, image fields are optional. 
         */    
        if (req.file) {
            director.path_to_image = formatPath(req.file.path)
            if (await Director.findOne({where: {bio}}) !== null) {
                fs.unlinkSync(req.file.path)
            }    
        }    
        await director.save()
        res.cookie("_message", "Director added succesfully!", { httpOnly: true });
        return res.status(200).redirect('/admin')
    } catch (err) {
        console.log(err)
        res.render('admin/addDirector', {
            director: Director.build({
                name: name,
                birth_date: birth_date,
                bio: bio
            })
        })
    }
})

/* Get edit director page */

router.get('/editDirector/:uuid', async (req, res) => {
    const {uuid} = req.params
    try {
        const director = await Director.findOne({ where: {uuid} })
        res.render('admin/editDirector', {
            director: director
        })
    } catch (err) {
        res.json(err)
    }
})

/* Edit director with specific uuid */

router.put('/editDirector/:uuid', upload.single('img'), async (req, res) => {
    const {name, birth_date, bio} = req.body
    const uuid = req.params.uuid
    try {
        const director = await Director.findOne({
            where: {
                uuid: uuid
            }
        })

        /*  Very similar principle as when we are checking for duplicate entries. We first check for the existence of an image file in the form (since they are optional).
            We then check whether or not the current director object (the one that we retrieved from the database) already has an image that his path_to_image field
            refers to. If that image exists, we delete it. We then update the path_to_image variable to match the new image we just uploaded */

        if (req.file) {
            if (fs.existsSync(path.join('public', director.path_to_image))) {
                fs.unlinkSync(path.join('public', director.path_to_image))
            } else {
                console.log("No image file was found")
            }
            director.path_to_image = formatPath(req.file.path)
        }

        director.name = name
        director.birth_date = birth_date
        director.bio = bio

        await director.save()
        res.cookie("_message", `Director edited succesfully!`, { httpOnly: true });
        return res.status(200).redirect('/admin')

    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

/* Delete director with specific uuid */

router.delete('/deleteDirector/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const {path_to_image} = await Director.findOne({
            attributes: ['path_to_image'],
            where: {
                uuid
            }
        })

        if (fs.existsSync(path.join('public', path_to_image))) {
            fs.unlinkSync(path.join('public', path_to_image))
        } else {
            console.log("No image file was found")
        }
        await Director.destroy({
            where: {
                uuid: uuid
            }
        })
        res.redirect('/admin/showDirectors')
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/getUsers', async (req, res) => {
    try {
        const users = await UserProfile.findAll({
            include: ['user_auths']
        })
        res.json(users)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


/* HELPER FUNCTIONS BELOW */

function formatPath (path) {
    return path.replace('public', '')
}

module.exports = router