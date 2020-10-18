const express = require('express')
const router = express.Router()
const blogs = require('../models/blogModel')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const nodemailer = require('nodemailer')
//const User = require('../models/adminstratorModel')
const { ensureAdminAuthenticated } = require('../config/authenticateAdmin')



//ADMIN LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('login')
})

//ON ADMIN LOGIN SUCCESS
router.get('/dashboard', ensureAdminAuthenticated, (req, res) => {
    res.render('dashboard')
})

//ON ADMIN LOGOUT REQUEST
router.get('/logout', async (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are Logged out.')
    res.redirect('/admin/login')
})



//ON ADMIN BLOG EDIT REQUEST
router.get('/blog-editor', async (req, res) => {
    let blogPageQuery = blogs.find().sort({blog_uploadDate: 'desc'})
    try {
        Blogs = await blogPageQuery.exec()
        res.render('blogs-editor', {
            Blogs: Blogs
        })
    } catch (error) {
        console.log('error in else catch')
        res.render('/dashboard')
    }
})



//ON ADMIN BLOG SELECTED FOR EDITING
router.get('/editor/:blogName', async (req, res) => {
    let blogPageQuery = blogs.findOne().where('blog_link').equals(req.params.blogName)
    let Blog = await blogPageQuery.exec() 

    try {
        res.render('editor', {
            Blog: Blog
        })   
    } catch (error) {
        console.log(error)
        res.redirect('/blogs:')
    }
})




module.exports = router;