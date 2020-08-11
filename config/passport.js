const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

//LOAD USER MODEL
const AdministratorDB = require('../models/adminModel')

module.exports = function (passport) {
    passport.use('login',
        new LocalStrategy({ usernameField: 'admin_email'}, (email, password, done) =>{
            //SEE IF THERES USER
            AdministratorDB.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: "Sorry, we can't find an account with this email address. Please try again or create a new account." })
                    }
 
                    //MATCH PASSWORD
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err

                        if(isMatch) {
                            return done (null, user);
                        } else {
                            return done(null, false, { message: "Incorrect password. Please try again or you can reset your password." })
                        }
                    })

                })
                .catch(err => console.log(err))
        })
    ) 



    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        AdministratorDB.findById(id, function(err, user) {
          done(err, user);
        });
    });        
}