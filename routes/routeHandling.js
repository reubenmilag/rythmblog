const express = require('express')
const blogs = require('../models/blogModel')
const { render } = require('ejs')
const router = express.Router()

//LANDING PAGE
router.get('/', async(req, res) => {
    let blogQuery = blogs.find().sort({blog_uploadDate: 'desc'}).limit(4)
    try {
        const latestBlogs = await blogQuery.exec()
        res.render('index', {
            latestBlogs: latestBlogs
        })
    } catch (error) {
        console.log(error)
    }
})

//CONTACT PAGE
router.get('/contact-us', (req, res) => {
    res.render('contact-us')
})




module.exports = router;