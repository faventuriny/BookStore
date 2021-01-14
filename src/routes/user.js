const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Book = require('../models/book')
const router = new express.Router()

//set globals variables
// function setGlobalVariables(user, token) {
//     sessionStorage.setItem('userName', user.name)
//     sessionStorage.setItem('userEmail', user.email)
//     sessionStorage.setItem('userId', user._id)
//     sessionStorage.setItem('userToken', token)
// }

//create new user
router.post('/users', async (req, res) => {
    console.log('/users');
    const user = new User(req.body)
   
    try {
        await user.save()
        const token = await user.generateAuthToken()
        //setGlobalVariables(user, token)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //setGlobalVariables(user, token)

        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// add books to user
router.patch('/users/add-book/:id', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        
        let books = user.books
        if(books.includes(req.params.id)){
            throw new Error('The book allready excist in the cart')
        } else {
            user.books.push(req.params.id)
            await user.save()
            res.send(user)
        }
    } catch (e) {
        res.status(500).send()
    }
})

// get user and populate all books 
router.get('/users/books', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.populate('books').execPopulate()
        res.send(user) 
        
    } catch (e) {
        res.status(500).send()
    }
})

// delete a book 
router.delete('/users/books/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.books.pull({_id: req.params.id})
        await user.save()
        res.send(user) 
        
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router