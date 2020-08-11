const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')


const app = express()


//DB CONFIG
const db = require('./config/keys').MongoURI

//CONNECT TO MONGO
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected Successfully to Healthyrythm's DB."))
    .catch(err => console.log(err))

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')


//BODY-PARSER 
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));
//app.use(express.urlencoded({ extended: false }))

//EXPRESS SESSIONS
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


//PASSPORT CONFIG
require('./config/passport')(passport)

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH
app.use(flash())

//GLOBAL VARIABLES FOR CUSTOM SUCCESS AND ERROR MESSAGES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
}) 

//ROUTES
app.use('/', require('./routes/routeHandling'))
app.use('/admin', require('./routes/admin'))
app.use('/adminFormHandling', require('./routes/adminFormHandling'))
app.use(express.static('public'))





const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server listening on Port ${PORT}`))