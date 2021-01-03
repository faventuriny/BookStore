const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public/html')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const app = require('./app')
// const port = process.env.PORT 

// app.listen(port, () => {
//     console.log('Server is up on port ' + port)
// })