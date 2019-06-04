//this is the passport.js file that is going to be used to store email and password information that is used for user authentication
// this is the code that validates if the email and password are valid

var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

module.exports = new LocalStrategy(
    {
        usernameField: "email"
    },
    (email, password, done) => {
        db.User.findOne({
            where: {
                email: 'email'
            }
        }).then((dbUser) => {
            if (!dbUser) {
                return done(null, false, {
                    message: 'Incorrect email.'
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, dbUser)
        }).catch((err) => {
            return done(err, null);
        })
    }
);

// this is what will help with HTTP request and keep authentication state accross the request
// is a way that sequelize serialize and deserializes the user