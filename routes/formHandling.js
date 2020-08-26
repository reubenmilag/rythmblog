const express = require('express')
const router = express.Router()
const mailingList = require('../models/mailingListModel')
const blogs = require('../models/blogModel')
const workWithUs = require('../models/workWithUsModel')
const contactUsMessage = require('../models/contactUsModel')
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


//CONTACT PAGE FORM HANDLING
router.post('/contact-us',  [check('contactUs_email').isEmail()], async(req, res) => {
    let contactFormErrors = []
    const contactUs_Message = new contactUsMessage ({
        sender_name: req.body.contactUs_name,
        sender_phone: req.body.contactUs_phone,
        sender_email: req.body.contactUs_email,
        sender_message: req.body.contactUs_textbox
    })

    if (!contactUs_Message.sender_name || !contactUs_Message.sender_email || !contactUs_Message.sender_phone || !contactUs_Message.sender_message ) {
        contactFormErrors.push({ msg: 'Please fill all fields' })
    }

    //CHECK IS EMAIL IS VALID
    const error = validationResult(req)
    if (!error.isEmpty()) {
        contactFormErrors.push ({ msg: "Please enter a valid Email address" })
    }

    if (contactFormErrors.length > 0) {
        const latestBlogs = await blogQuery.exec()
        res.render('contact-us', ({ contactFormErrors }))
    } else {
        try{
            const contactUs_MessageDetails  = contactUs_Message.save() 
            req.flash('contactUsSuccess_msg', 'Thank you for your response. Our team will get back to soon.')
            res.redirect('/contact-us')
        } catch (error) {
            console.log(error)
        }
    }
})




//WORK WITH US FORM HANDLE
router.post('/work-with-us', [check('workWithUs_emailAddress').isEmail()], async(req, res) => {
    let workWithUsFormErrors = []
    
    const workWithUsData = new workWithUs ({
        workWithUs_name: req.body.workWithUs_name,
        workWithUs_phone: req.body.workWithUs_phone,
        workWithUs_emailAddress: req.body.workWithUs_emailAddress,
        workWithMe_brandName: req.body.workWithMe_brandName,
        workWithMe_message: req.body.workWithMe_message
    })

    if (!workWithUsData.workWithUs_name || !workWithUsData.workWithUs_phone || !workWithUsData.workWithUs_emailAddress || !workWithUsData.workWithMe_brandName || !workWithUsData.workWithMe_message ) {
        workWithUsFormErrors.push({ msg: 'Please fill all fields' })
    }

    //CHECK IS EMAIL IS VALID
    const error = validationResult(req)
    if (!error.isEmpty()) {
        workWithUsFormErrors.push ({ msg: "Please enter a valid Email address" })
    }

    if (workWithUsFormErrors.length > 0) {
        res.render('work-with-us', ({ workWithUsFormErrors }))
    } else {
        try{
            const workWithUsElement  = workWithUsData.save() 
            req.flash('workWithUsSuccess_msg', 'Thankyou for your interest. We are excited to work with you! Our team will contact you soon.')
            res.redirect('/work-with-us#workWithUs-formContainer')
        } catch (error) {
            console.log(error)
        }
    }

})







module.exports = router;