require('dotenv').config()
const { sequelize } = require('./models')
const express = require('express')
const app = express()
const port = parseInt(process.env.PORT)
const path = require('path')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({
        db: sequelize, 
    })

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, 'views'));

const {getLoggedUser} = require('./middleware/authenticated')

app.use(express.static(__dirname + '/public'))
app.use('/movies', express.static(__dirname + '/public'))
app.use('/profile', express.static(__dirname + '/public'))
app.use('/reviews', express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: sessionStore
}))

sessionStore.sync()

app.use(passport.session())

const authRouter = require('./routes/auth.js')
const adminRouter = require('./routes/admin.js')
const movieRouter = require('./routes/movies.js')
const nameRouter = require('./routes/name.js')
const reviewRouter = require('./routes/reviews.js')
const profileRouter = require('./routes/profile.js')

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/movies', movieRouter)
app.use('/name', nameRouter)
app.use('/reviews', reviewRouter)
app.use('/profile', profileRouter)

console.log(`Live on Port ${port}`)

app.get('/', getLoggedUser, (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.status(300).redirect('/')
})

app.listen({port: port}, async () => {
    console.log(`Live on port ${port}`)
    await sequelize.authenticate()
    console.log('Connected to Database!')
})
