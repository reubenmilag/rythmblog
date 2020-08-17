const express = require('express')
const router = express.Router()
//const { check, validationResult } = require('express-validator');
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
    try {
        blog_imageName = req.file != null ? req.file.filename : null;
        blog_imageOrignalName = req.file != null ? req.file.originalname : null;
        blog_imageMimeType = req.file != null ? req.file.mimetype : null;
    } catch (error) {
        errors.push({ msg: 'There was an error uploading the blog image. Please try again.' })
        //console.log(error)
        res.render('dashboard', { errors })
    }

    const blog_link = req.body.blog_title.replace(/ /g, '-')

    const blog = new Blog ({
        blog_title: req.body.blog_title,
        blog_link: blog_link,
        blog_imageName: blog_imageName,
        blog_imageOrignalName: blog_imageOrignalName,
        blog_imageMimeType: blog_imageMimeType,
        blog_primaryTag: req.body.blog_primaryTag,
        blog_secondaryTag: req.body.blog_secondaryTag,
        blog_body: req.body.blog_body
    })

    //check if all fields are filled
    if(!blog.blog_title || !blog.blog_imageOrignalName || !blog.blog_primaryTag || !blog.blog_secondaryTag || !blog.blog_body ) {       
        if (blog_imageName) {
            removeBlogImage(blog_imageName)
        }
        errors.push({ msg: 'Please fill all fields.' })
    }

    if (errors.length > 0) {
        res.render('dashboard', ({ errors }))
    } else {
        try {
            const newBlog = await blog.save()
            req.flash('success_msg', 'Blog uploaded successfully.')
            res.redirect('/admin/dashboard')
        } catch (error) {
            errors.push({ msg: 'Error uploading blog.' })
            //console.log(error)
            res.render('dashboard', { errors })
        }
    }
})

function removeBlogImage(blog_imageName) {
    try {
        fs.unlink(path.join( uploadPath,'/', blog_imageName ), err => {
            if (err) console.error(err)
        })
    } catch (error) {
        console.log('File unlink error')
    }
    
}







module.exports = router;