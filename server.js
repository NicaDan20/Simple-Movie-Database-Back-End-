require('dotenv').config()
const { sequelize } = require('./models')
const express = require('express')
const app = express()
const port = parseInt(process.env.PORT)
const path = require('path')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const authRouter = require('./routes/auth.js')
const adminRouter = require('./routes/admin.js')
const movieRouter = require('./routes/movies.js')
const nameRouter = require('./routes/name.js')

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/movies', movieRouter)
app.use('/name', nameRouter)

console.log(`Live on Port ${port}`)

app.get('/', (req, res) => {
    res.send("Hi")
})

app.listen({port: port}, async () => {
    console.log(`Live on port ${port}`)
    await sequelize.authenticate()
    console.log('Connected to Database!')
})

