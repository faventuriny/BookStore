const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true, 
        trim: true // admin can edit 
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
    bookDescription: {
        type: String,
        required: true, 
        trim: true
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task