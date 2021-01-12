const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new mongoose.Schema({
    
    bookName: {
        type: String,
        required: true, 
        trim: true 
    },
    bookAuthor: {
        type: String,
        required: true, 
        trim: true 
    },
    bookPrice: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book