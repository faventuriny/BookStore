const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//create new user
router.post('/users', async (req, res) => {
    console.log('/users');
    const user = new User(req.body)
    // const user = new User({
    //     name: req.body.name,
    //     mail: req.body.mail,
    //     password: req.body.password,
    //     _id: new mongoose.Types.ObjectId()
    // })
    console.log('user',user);
    
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
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

//get the user 

router.get("/users/get", auth, async (req, res) => {
	try {
		res.send(req.user);
	} catch (err) {
		res.status(500).send(err);
	}
});

// add books to user
router.patch('users/add-book/:id', auth, async (req, res) => {

    try {
        //req.user.books.push(req.params.id)

        req.user.update(
            {$push: {books: req.params.id}}
        )

        await req.user.save()
        res.send(req.user)
        
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router