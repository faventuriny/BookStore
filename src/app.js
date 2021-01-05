const express = require('express') 
require('./db/mongoose')
const userRouter = require('./routes/user')
//const bookRouter = require('./routes/book')
const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(userRouter)
//app.use(bookRouter)


module.exports = app
