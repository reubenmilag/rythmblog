const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const passport = require('passport')
const nodemailer = require('nodemailer')
//const User = require('../models/adminstratorModel')
const { ensureAdminAuthenticated } = require('../config/authenticateAdmin')
const Blog = require('../models/blogModel')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const uploadPath = path.join('public', Blog.blogImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})



//ADMIN LOGIN FORM HANDLE
router.post('/login', (req, res, next) => {
    passport.authenticate('login', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    }) (req, res, next)
})


//NEW BLOG UPLOAD HANDLE
router.post('/upload-blog', ensureAdminAuthenticated, upload.single('blog_image'), async (req, res) => {
    let errors = []
    const blog_imageName = req.file != null ? req.file.filename : null
    const blog = new Blog ({
        blog_title: req.body.blog_title,
        blog_imageName: blog_imageName,
        blog_imageOrignalName: req.file.originalname,
        blog_imageMimeType: req.file.mimetype,
        blog_primaryTag: req.body.blog_primaryTag,
        blog_secondaryTag: req.body.blog_secondaryTag,
        blog_body: req.body.blog_body
    })

    //check if all fields are filled
    if(!blog.blog_title || !blog.blog_primaryTag || !blog.blog_secondaryTag || !blog.blog_body ){
        
        errors.push({ msg: 'Please fill all fields.' })
    }

    if (blog_imageName == null) {
        removeBlogImage(blog_imageName)
    }

    if (errors.length > 0) {
        res.render('dashboard', ({ errors }))
    } else {
        try {
            const newBlog = await blog.save()
            req.flash('success_msg', 'Blog uploaded successfully.')
            res.redirect('/admin/dashboard')
        } catch {
            res.render('dashboard', { errors })
            errors.push({ msg: 'Error uploading blog.' })
        }
    }
})

router.get('/dashboard', ensureAdminAuthenticated, (req, res) => {
    res.render('dashboard')
})

function removeBlogImage(blog_imageName) {
    fs.unlink(path.join( uploadPath, blog_imageName ), err => {
        if (err) console.error(err)
    })
}







module.exports = router;