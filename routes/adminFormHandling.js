const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const passport = require('passport')
const nodemailer = require('nodemailer')
//const User = require('../models/adminstratorModel')
const { ensureAdminAuthenticated } = require('../config/authenticateAdmin')



//ADMIN LOGIN FORM HANDLE
router.post('/login', (req, res, next) => {
    passport.authenticate('login', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    }) (req, res, next)
})








module.exports = router;