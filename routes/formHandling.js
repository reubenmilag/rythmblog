const express = require('express')
const router = express.Router()
const mailingList = require('../models/mailingListModel')
const blogs = require('../models/blogModel')
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer')


let blogQuery = blogs.find().sort({blog_uploadDate: 'desc'}).limit(4)


router.post('/mailingList', [check('mailingEmail').isEmail()], async(req, res) => {
    let errors = []
    const newSubscriber = new mailingList ({
        mailingRecepient: req.body.mailingName,
        mailingEmail: req.body.mailingEmail
    })

    if (!newSubscriber.mailingRecepient  || !newSubscriber.mailingEmail) {
        errors.push({ msg: "Please fill in all the details." })
    }

    //CHECK IS EMAIL IS VALID
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error)
        errors.push ({ msg: "Please enter a valid Email address" })
    }

    if (errors.length > 0) {
        const latestBlogs = await blogQuery.exec()
        res.render('index', ({ latestBlogs: latestBlogs, errors }))
    } else {
        try{
            const subscriberDetails  = newSubscriber.save() 
            req.flash('success_msg', 'Subscribed successfullly!')
            res.redirect('/#mailingListBlock')
        } catch (error) {
            console.log(error)
        }
    }
})







module.exports = router;