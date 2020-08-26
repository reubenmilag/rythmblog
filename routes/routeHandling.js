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

//BLOGS MAIN PAGE
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



//BLOG ROUTE
router.get('/blog/:blogName', async (req, res) => {
    let blogPageQuery = blogs.findOne().where('blog_link').equals(req.params.blogName)
    let Blog = await blogPageQuery.exec() 
    let currentId = Blog._id;
    let nextBlogQuery = blogs.findOne({_id: {$gt: currentId}}).sort({_id: 1 }).limit(1)
    let nextBlogExec = await nextBlogQuery.exec() 
    let prevBlogQuery = blogs.findOne({_id: {$lt: currentId}}).sort({_id: -1 }).limit(1)
    let prevBlogExec = await prevBlogQuery.exec() 
    try {
        res.render('blog', {
            Blog: Blog,
            prevBlog: prevBlogExec,
            nextBlog: nextBlogExec
        })   
    } catch (error) {
        console.log(error)
        res.redirect('/blogs:')
    }
})




//SERVICES PAGE
router.get('/services', (req, res) => {
    res.render('services')
})

//WORK WITH US PAGE
router.get('/work-with-us', (req, res) => {
    res.render('work-with-us')
})

//ABOUT-US PAGE
router.get('/about-us', (req, res) => {
    res.render('about-us')
})




//CONTACT PAGE
router.get('/contact-us', (req, res) => {
    res.render('contact-us')
})




module.exports = router;