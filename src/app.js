const express = require('express') 
require('./db/mongoose')
const userRouter = require('./routes/user')
const bookRouter = require('./routes/book')
const path = require('path')
const hbs = require('hbs')
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // express by defoult look for a folder with the name 'views', if you change folder name you need to set a path
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hendlebars engine and views location
app.set('view engine','hbs') // set up heandle bar on express 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index') //render heandle bar templates
})

app.get('/login',(req, res) => {
    res.render('login')
})

app.get('/create-account',(req, res) => {
    res.render('create-account')
})

app.get('/shopping-cart',(req, res) => {
    res.render('shopping-cart')
})

app.get('/single-book',(req, res) => {
    res.render('single-book')
})

app.get('/index-admin',(req, res) => {
    res.render('index-admin')
})

app.get('/single-book-admin',(req, res) => {
    res.render('single-book-admin')
})
app.use(express.json())
app.use(userRouter)
app.use(bookRouter)


module.exports = app
