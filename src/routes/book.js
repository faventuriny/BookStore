const express = require('express')
const Book = require('../models/book')
const router = new express.Router()

router.post('/books', async (req, res) => {
    const book = new Book(req.body)
    
    try {
        await book.save()
        res.status(201).send({ book })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/books', async (req, res) => {
    Book.find({}, (err, books)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(books);
          }
    })
})


// router.get('/books/:name', async (req, res) => {
//     const book = req.params.name
//     const books = await Book.find({})
//     const booksfounded = []
    
//     try{
//         book = book.trim().toLowerCase()
//         books.forEach(b => {
//             let lowerCaseBook = b.bookName.toLowerCase()
//             if(lowerCaseBook.indexOf(book)>=0){
//                 booksFounded.push(b)
//             }
//         })

//         // if(booksfounded == []){
//         //     res.status(400).send()
//         // }
//         res.send(booksfounded)
//     } catch (e) {
//         res.status(404).send({book, books, booksfounded})
//     }
// })

// router.get('/books/:name', async (req, res) => {
//     const book = await Book.find({bookName: req.params.name })
//     const books = await Book.find({})
//     const booksfounded = isAMatch(book, books)
    
//     try{
        
//         if(!book){
//             res.status(400).send()
//         }
//         res.send(book)
//     } catch (e) {
//         res.status(404).send()
//     }
// })

router.patch('/books/:id', async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['bookName', 'bookAuthor', 'bookPrice', 'bookDescription', 'img']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findOne({_id: req.params.id})
        if(!book){
            return res.status(404).send()
        }

        updates.forEach((update)=> book[update] = req.body[update])
        await book.save()

        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})
    
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({_id: req.params.id})

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router