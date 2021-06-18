const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
console.log("------------- inside localStrategy passport.js------------------");
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      // Match user
      User.findOne({
        name: username
      }).then(user => {
        if (!user) {
          return done(null, false);
        }

        if(password == user.password) {
            console.log('password is matched!');
            return done(null, user);
        }
        else {
            console.log('password inccorect');
            return done(null, false)
        }

        // // Match password
        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
        //   if (isMatch) {
        //       console.log('found a document with that username');
        //     return done(null, user);
        //   } else {
        //       console.log('password incorrect');
        //     return done(null, false);
        //   }
        // });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log("----------==============-----");
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("----------=@@@@@@@===-----");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};