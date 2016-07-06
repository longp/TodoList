const passport = require('passport'),
      passportLocal = require('passport-local').Strategy,
      User = require('../models/user.js'),
      bcrypt = require('bcryptjs');


// passportlocal auth strategy
passport.use('local', new passportLocal(
  function(username, password, done) {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {
      User.findOne({ username: username, password:password }, function(user, err) {
        if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);

      });
    })

  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }).then(function(user) {
    done(null, { id: user.id, username: user.username});
  });
});



module.exports = passport;
