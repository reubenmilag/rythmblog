const express = require('express')
const router = express.Router()
const mailingList = require('../models/mailingListModel')
const blogs = require('../models/blogModel')
const workWithUs = require('../models/workWithUsModel')
const contactUsMessage = require('../models/contactUsModel')
const serviceRequest = require('../models/serviceRequest')
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


/* //DOWNLOAD BUSINESS CARD ROUTE
router.get('/card', async (req, res) => {
    try {
        res.download('/assets/Regina Pinheiro Card.pdf')
    } catch (err) {
        console.log(err)
    }
}) */




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







/* SCHEDULE A SESSION FORM */
router.post('/servicesForm', [check('userEmail').isEmail()], async(req, res) => {
    let errors = []
    const userName = req.body.userName
    const userPhone = req.body.userPhone
    const userEmail = req.body.userEmail
    const SOI = req.body.SOI
    const userDate = req.body.userDate
    const TimeSlot = req.body.TimeSlot
    const userMessage = req.body.userMessage

    const request = new serviceRequest ({
        userName: userName,
        userPhone: userPhone,
        userEmail: userEmail,
        SOI: SOI,
        userDate: userDate,
        TimeSlot: TimeSlot,
        userMessage: userMessage
    })

    if (!userName || !userPhone || !userEmail || !userPhone || !SOI || !userDate || !TimeSlot ) {
        errors.push({ msg: "Please fill all fields" })
    }

    if (SOI == 'service1') {
        SOI_text = 'Diet Prescription'
    }
    if (SOI == 'service2') {
        SOI_text = 'Preventive Diet'
    }
    if (SOI == 'service3') {
        SOI_text = 'Workshops'
    }
    if (SOI == 'service4') {
        SOI_text = 'Sports Nutrition'
    }
    if (SOI == 'service5') {
        SOI_text = 'Lifestyle Modification<'
    }
    if (SOI == 'service6') {
        SOI_text = 'Customized Diet Plans'
    }
    if (SOI == 'service7') {
        SOI_text = 'Health Risk Assessment'
    }
    if (SOI == 'service8') {
        SOI_text = 'Nutritional Counselling'
    }

    if (!userMessage) {
        userMessage_text = 'no message'
    } else {
        userMessage_text = userMessage
    }


    //CHECK IF DATE IS VALID

    let date_today = new Date()   
    let date = ("0" + date_today.getDate()).slice(-2);
    let month = ("0" + (date_today.getMonth() + 1)).slice(-2);
    let year = date_today.getFullYear();
    final_date = year + "-" + month + "-" + date

    if (userDate < final_date) {
        errors.push({ msg: "The date is not a valid date" })
    }




    //CHECK IS EMAIL IS VALID
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error)
        errors.push ({ msg: "Please enter a valid Email address" })
    }

    if (errors.length > 0) {
        res.render('services-booking', ({ errors }))
    } else {
        try{
            const serviceRequest = request.save() 
            req.flash('success_msg', 'Request sent successfully. We will get in touch with you soon.')
            res.redirect('/services-booking')
        } catch (error) {
            console.log(error)
        }
    }


})














module.exports = router;