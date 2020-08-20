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

//BLOGS PAGE
router.get('/blogs:sort', async (req, res) => {
    let blogPageQuery = blogs.find().sort({blog_uploadDate: 'desc'})
    let blogPageQueryAsc = blogs.find().sort({blog_uploadDate: 'asc'})
    let blogPageQueryNutrition = blogs.find().where('blog_primaryTag').equals('Nutrition').sort({blog_uploadDate: 'asc'})
    let blogPageQueryEvents = blogs.find().where('blog_primaryTag').equals('Events').sort({blog_uploadDate: 'desc'})
    let blogPageQueryRecipes = blogs.find().where('blog_primaryTag').equals('Recipes').sort({blog_uploadDate: 'desc'})
    let blogPageQueryLifestyle = blogs.find().where('blog_primaryTag').equals('Lifestyle').sort({blog_uploadDate: 'desc'})

    if (req.params.sort == ':asc') {
        try {
            Blogs = await blogPageQueryAsc.exec() 
            res.render('blogs', {
                Blogs: Blogs
            })
        } catch (error) {
            console.log(error)
        }
    } 

    else if (req.params.sort == ':nutrition') {
        try {
            Blogs = await blogPageQueryNutrition.exec() 
            res.render('blogs', {
                Blogs: Blogs
            })
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.params.sort == ':events') {
        try {
            Blogs = await blogPageQueryEvents.exec() 
            res.render('blogs', {
                Blogs: Blogs
            })
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.params.sort == ':recipes') {
        try {
            Blogs = await blogPageQueryRecipes.exec() 
            res.render('blogs', {
                Blogs: Blogs
            })
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.params.sort == ':lifestyle') {
        try {
            Blogs = await blogPageQueryLifestyle.exec() 
            res.render('blogs', {
                Blogs: Blogs
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    else {
        try {
            Blogs = await blogPageQuery.exec()
            res.render('blogs', {
                Blogs: Blogs
            })
        } catch (error) {
            console.log('error in else catch')
        }     
    }
})

/* router.post('/blogs:met', async (req, res) => {
    let blogPageQuery = blogs.find().sort({blog_uploadDate: 'desc'})
    let blogPageQueryAsc = blogs.find().sort({blog_uploadDate: 'asc'})
    console.log(req.body.sortByAsc)
    if (req.body.sortByAsc == null || req.body.sortByAsc == '' ) {
        Blogs = await blogPageQueryAsc.exec()        
    } 
    if (req.body.sortByAsc == 'asc') {
        Blogs = await blogPageQueryAsc.exec() 
    }
    try {
        res.render('blogs', {
            Blogs: Blogs
        })
    } catch (error) {
        console.log(error)
    }
}) */



//CONTACT PAGE
router.get('/contact-us', (req, res) => {
    res.render('contact-us')
})




module.exports = router;