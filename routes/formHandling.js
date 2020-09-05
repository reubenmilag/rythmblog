const express = require('express')
const router = express.Router()
const mailingList = require('../models/mailingListModel')
const blogs = require('../models/blogModel')
const workWithUs = require('../models/workWithUsModel')
const contactUsMessage = require('../models/contactUsModel')
const serviceRequest = require('../models/serviceRequest')
const { check, validationResult } = require('express-validator');
const emailHelpers = require('../config/emailHelper')
const nodemailer = require('nodemailer')


let blogQuery = blogs.find().sort({blog_uploadDate: 'desc'}).limit(4)



/* FOR MALING LIST SUBSCRIBERS */
router.post('/mailingList', [check('mailingEmail').isEmail()], async(req, res) => {
    let mailingListErrors = []

    const newSubscriber = new mailingList ({
        mailingRecepient: req.body.mailingName,
        mailingEmail: req.body.mailingEmail
    })

    if (!newSubscriber.mailingRecepient  || !newSubscriber.mailingEmail) {
        mailingListErrors.push({ msg: "Please fill in all the details." })
    }

    //check if email is valid
    const error = validationResult(req)
    if (!error.isEmpty()) {
        mailingListErrors.push ({ msg: "Please enter a valid Email address" })
    }

    if (mailingListErrors.length > 0) {
        const latestBlogs = await blogQuery.exec()
        res.render('index', ({ latestBlogs: latestBlogs, mailingListErrors }))
    } else {
        try{
            const subscriberDetails  = newSubscriber.save() 
            req.flash('mailingListSuccess_msg', 'Hey ' + newSubscriber.mailingRecepient + "," )
            res.redirect('/')
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

    //check if email is valid
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
            
            //CONTACT FORM EMAIL
            const options = {
                to: 'veronicafds.vf@gmail.com',
                subject: 'Contact Form Message',
                html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Email</title><style type="text/css" rel="stylesheet">@import url(https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;500;600;700&display=swap);html, body {margin: 0%;padding: 0%;background-color: #F9FBF6;font-family: "Lato", sans-serif;}.header-container {background-image: url(cid:email-headerImg@nodemailer.com);background-size: fill;background-repeat: no-repeat;min-width: 100%;margin: 0px;padding: 0px;}.header-overlay {background: linear-gradient(90deg, rgba(37, 37, 37, 0.9) 37.54%, rgba(196, 196, 196, 0) 100%);backdrop-filter: blur(4.37px);height: 50px;}img {max-height: 50px;margin: auto 1% auto 3%;display: inline-block;}table {margin: 0% 5%;}#formName {margin: 5%;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;display: flex;align-items: center;text-align: center;letter-spacing: 0.375px;text-transform: uppercase;color: #313131;text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);}.tableTitle {padding: 8%;font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;display: flex;align-items: center;letter-spacing: 0.375px;text-transform: capitalize;white-space: nowrap;color: #252525;}.tableData {font-style: normal;font-weight: 300;font-size: 18px;line-height: 24px;letter-spacing: 0.375px;color: #252525;padding: 1%;padding-left: 3%;}.btncontainers {margin: 5% 4%;}.btncontainers button {background: #D9E4C8;border-radius: 5px;border: none;padding: 2% 5%;margin: 2%;color: #fff;font-style: normal;font-weight: 500;font-size: 16px;line-height: 13px;display: inline-flex;align-items: center;text-align: center;letter-spacing: 0.375px;}@media only screen and (max-width: 600px) {.btncontainers button {width: 100%;margin: 2% auto;padding: 5%;}}</style></head><body><div class="header-container"><div class="header-overlay"><img src="cid:navbar-logo@nodemailer.com" alt="logo"></div></div><div id="formName">CONTACT US FORM</div><table><tr><td class="tableTitle">Sender:</td><td class="tableData"> '+ contactUs_Message.sender_name +' </td></tr><tr><td class="tableTitle">Phone:</td><td class="tableData"> '+ contactUs_Message.sender_phone +' </td></tr><tr><td class="tableTitle">Email Adresss:</td><td class="tableData" style="color:#007AFF;"> '+ contactUs_Message.sender_email +' </td></tr><tr><td class="tableTitle">Message:</td><td class="tableData"> '+ contactUs_Message.sender_message +' </td></tr></table><div class="btncontainers"><a href="https://healthyrythm.herokuapp.com/" style="text-decoration: none;"><button>REPLY FROM SITE</button></a></div><div style="background-color: #313131; bottom: 0%; width: 100%; padding: 0% 3%;"><a href="https://www.facebook.com/HealthyRythm" target="_blank"><img style="height: 18px !important; margin: 1%;" src="cid:facebook-icon@nodemailer.com"/></a><a href="https://www.instagram.com/healthyrythm/" target="_blank"><img style="height: 18px !important; margin: 1% 0%;" src="cid:instagram-icon@nodemailer.com"/></a><small style="float: right; padding: 1% 0% 0% 0%; height: 100%; margin: 0px; color: #d9e4c86c;">© 2020 The Healthy Rythm Blog, All rights reserved</small></div></body></html>',
                attachments: [{
                    filename: 'email-headerImg.jpg',
                    path: __dirname + '../../public/assets/email-headerImg.jpg',
                    cid: 'email-headerImg@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'navbar-logop.png',
                    path: __dirname + '../../public/assets/navbar-logop.png',
                    cid: 'navbar-logo@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'facebook-icon.png',
                    path: __dirname + '../../public/assets/facebook-icon.png',
                    cid: 'facebook-icon@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'instagram-icon.png',
                    path: __dirname + '../../public/assets/instagram-icon.png',
                    cid: 'instagram-icon@nodemailer.com' //same cid value as in the html img src
                }],
                dsn: {
                    id: 'problems encountered while sending the email. Please contact support for more information.',
                    return: 'headers',
                    notify: ['failure', 'delay'],
                    recipient: 'healthyrythm.mail@gmail.com'
                }
            }; 
            emailHelpers.sendEmail(options)

            req.flash('contactUsSuccess_msg', 'Thank you for your response. Our team will get back to you soon.')
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

            //CONTACT FORM EMAIL
            const options = {
                to: 'veronicafds.vf@gmail.com',
                subject: 'Work with Us Form Message',
                html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Email</title><style type="text/css" rel="stylesheet">@import url(https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;500;600;700&display=swap);html, body {margin: 0%;padding: 0%;background-color: #F9FBF6;font-family: "Lato", sans-serif;}.header-container {background-image: url(cid:email-headerImg@nodemailer.com);background-size: fill;background-repeat: no-repeat;min-width: 100%;margin: 0px;padding: 0px;}.header-overlay {background: linear-gradient(90deg, rgba(37, 37, 37, 0.9) 37.54%, rgba(196, 196, 196, 0) 100%);backdrop-filter: blur(4.37px);height: 50px;}img {max-height: 50px;margin: auto 1% auto 3%;display: inline-block;}table {margin: 0% 5%;}#formName {margin: 5%;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;display: flex;align-items: center;text-align: center;letter-spacing: 0.375px;text-transform: uppercase;color: #313131;text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);}.tableTitle {padding: 8%;font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;display: flex;align-items: center;letter-spacing: 0.375px;text-transform: capitalize;white-space: nowrap;color: #252525;}.tableData {font-style: normal;font-weight: 300;font-size: 18px;line-height: 24px;letter-spacing: 0.375px;color: #252525;padding: 1%;padding-left: 3%;}.btncontainers {margin: 5% 4%;}.btncontainers button {background: #D9E4C8;border-radius: 5px;border: none;padding: 2% 5%;margin: 2%;color: #fff;font-style: normal;font-weight: 500;font-size: 16px;line-height: 13px;display: inline-flex;align-items: center;text-align: center;letter-spacing: 0.375px;}@media only screen and (max-width: 600px) {.btncontainers button {width: 100%;margin: 2% auto;padding: 5%;}}</style></head><body style="background-color: #F9FBF6;"><div class="header-container"><div class="header-overlay"><img src="cid:navbar-logo@nodemailer.com" alt="logo"></div></div><div id="formName">WORK WITH US FORM</div><table><tr><td class="tableTitle">Brand Name:</td><td class="tableData"> '+ workWithUsData.workWithMe_brandName +' </td></tr><tr><td class="tableTitle">Sender:</td><td class="tableData"> '+ workWithUsData.workWithUs_name +' </td></tr><tr><td class="tableTitle">Phone:</td><td class="tableData"> '+ workWithUsData.workWithUs_phone +' </td></tr><tr><td class="tableTitle">Email Adresss:</td><td class="tableData" style="color:#007AFF;"> '+ workWithUsData.workWithUs_emailAddress +' </td></tr><tr><td class="tableTitle">Message:</td><td class="tableData"> '+ workWithUsData.workWithMe_message +' </td></tr></table><div class="btncontainers"><a href="https://healthyrythm.herokuapp.com/" style="text-decoration: none;"><button>REPLY FROM SITE</button></a></div><div style="background-color: #313131; bottom: 0%; width: 100%; padding: 0% 3%;"><a href="https://www.facebook.com/HealthyRythm" target="_blank"><img style="max-height: 18px !important; margin: 1%;" src="cid:facebook-icon@nodemailer.com"/></a><a href="https://www.instagram.com/healthyrythm/" target="_blank"><img style="max-height: 18px !important; margin: 1% 0%;" src="cid:instagram-icon@nodemailer.com"/></a><small style="float: right; padding: 1% 0% 0% 0%; height: 100%; margin: 0px; color: #d9e4c86c;">© 2020 The Healthy Rythm Blog, All rights reserved</small></div></body></html>',
                attachments: [{
                    filename: 'email-headerImg.jpg',
                    path: __dirname + '../../public/assets/email-headerImg.jpg',
                    cid: 'email-headerImg@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'navbar-logop.png',
                    path: __dirname + '../../public/assets/navbar-logop.png',
                    cid: 'navbar-logo@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'facebook-icon.png',
                    path: __dirname + '../../public/assets/facebook-icon.png',
                    cid: 'facebook-icon@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'instagram-icon.png',
                    path: __dirname + '../../public/assets/instagram-icon.png',
                    cid: 'instagram-icon@nodemailer.com' //same cid value as in the html img src
                }],
                dsn: {
                    id: 'problems encountered while sending the email. Please contact support for more information.',
                    return: 'headers',
                    notify: ['failure', 'delay'],
                    recipient: 'healthyrythm.mail@gmail.com'
                }
            }; 
            emailHelpers.sendEmail(options)


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

    if (!userName || !userPhone || !userEmail || !SOI || !userDate || !TimeSlot ) {
        errors.push({ msg: "Please fill all fields" })
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

            //SERVICES BOOKING FORM EMAIL
            const options = {
                to: 'veronicafds.vf@gmail.com',
                subject: 'Services Booking Form Message',
                html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Email</title><style type="text/css" rel="stylesheet">@import url(https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@400;500;600;700&display=swap);html, body {margin: 0%;padding: 0%;background-color: #F9FBF6;font-family: "Lato", sans-serif;}.header-container {background-image: url(cid:email-headerImg@nodemailer.com);background-size: fill;background-repeat: no-repeat;min-width: 100%;margin: 0px;padding: 0px;}.header-overlay {background: linear-gradient(90deg, rgba(37, 37, 37, 0.9) 37.54%, rgba(196, 196, 196, 0) 100%);backdrop-filter: blur(4.37px);height: 50px;}img {max-height: 50px;margin: auto 1% auto 3%;display: inline-block;}table {margin: 0% 5%;}#formName {margin: 5%;font-style: normal;font-weight: normal;font-size: 18px;line-height: 24px;display: flex;align-items: center;text-align: center;letter-spacing: 0.375px;text-transform: uppercase;color: #313131;text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);}.tableTitle {padding: 8%;font-style: normal;font-weight: 400;font-size: 18px;line-height: 24px;display: flex;align-items: center;letter-spacing: 0.375px;text-transform: capitalize;white-space: nowrap;color: #252525;}.tableData {font-style: normal;font-weight: 300;font-size: 18px;line-height: 24px;letter-spacing: 0.375px;color: #252525;padding: 1%;padding-left: 3%;}.btncontainers {margin: 5% 4%;}.btncontainers button {background: #D9E4C8;border-radius: 5px;border: none;padding: 2% 5%;margin: 2%;color: #fff;font-style: normal;font-weight: 500;font-size: 16px;line-height: 13px;display: inline-flex;align-items: center;text-align: center;letter-spacing: 0.375px;}@media only screen and (max-width: 600px) {.btncontainers button {width: 100%;margin: 2% auto;padding: 5%;}}</style></head><body style="background-color: #F9FBF6;"><div class="header-container"><div class="header-overlay"><img src="cid:navbar-logo@nodemailer.com" alt="logo"></div></div><div id="formName">SERVICES BOOKING FORM</div><table><tr><td class="tableTitle">Sender:</td><td class="tableData"> '+ userName +' </td></tr><tr><td class="tableTitle">Phone:</td><td class="tableData"> '+ userPhone +' </td></tr><tr><td class="tableTitle">Email Adresss:</td><td class="tableData" style="color:#007AFF !important; text-decoration: none !important;"> '+ userEmail +' </td></tr><tr><td class="tableTitle">Service of Interest:</td><td class="tableData"> '+ SOI +' </td></tr><tr><td class="tableTitle">Date of service:</td><td class="tableData"> '+ userDate +' </td></tr><tr><td class="tableTitle">Time of service:</td><td class="tableData"> '+ TimeSlot +' </td></tr><tr><td class="tableTitle">Message:</td><td class="tableData"> '+ userMessage +' </td></tr></table><div class="btncontainers"><a href="https://healthyrythm.herokuapp.com/" style="text-decoration: none;"><button>REPLY FROM SITE</button></a></div><div style="background-color: #313131; bottom: 0%; width: 100%; padding: 0% 3%;"><a href="https://www.facebook.com/HealthyRythm" target="_blank"><img style="max-height: 18px !important; margin: 1%;" src="cid:facebook-icon@nodemailer.com"/></a><a href="https://www.instagram.com/healthyrythm/" target="_blank"><img style="max-height: 18px !important; margin: 1% 0%;" src="cid:instagram-icon@nodemailer.com"/></a><small style="float: right; padding: 1% 0% 0% 0%; height: 100%; margin: 0px; color: #d9e4c86c;">© 2020 The Healthy Rythm Blog, All rights reserved</small></div></body></html>',
                attachments: [{
                    filename: 'email-headerImg.jpg',
                    path: __dirname + '../../public/assets/email-headerImg.jpg',
                    cid: 'email-headerImg@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'navbar-logop.png',
                    path: __dirname + '../../public/assets/navbar-logop.png',
                    cid: 'navbar-logo@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'facebook-icon.png',
                    path: __dirname + '../../public/assets/facebook-icon.png',
                    cid: 'facebook-icon@nodemailer.com' //same cid value as in the html img src
                }, 
                {
                    filename: 'instagram-icon.png',
                    path: __dirname + '../../public/assets/instagram-icon.png',
                    cid: 'instagram-icon@nodemailer.com' //same cid value as in the html img src
                }],
                dsn: {
                    id: 'problems encountered while sending the email. Please contact support for more information.',
                    return: 'headers',
                    notify: ['failure', 'delay'],
                    recipient: 'healthyrythm.mail@gmail.com'
                }
            }; 
            emailHelpers.sendEmail(options)


            req.flash('success_msg', 'Request sent successfully. We will get in touch with you soon.')
            res.redirect('/services-booking:')
        } catch (error) {
            console.log(error)
        }
    }


})















module.exports = router;