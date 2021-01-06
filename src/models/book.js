const mongoose = require('mongoose')

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
    }
}, {
    timestamps: true
})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book