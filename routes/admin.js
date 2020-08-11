const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
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




module.exports = router;