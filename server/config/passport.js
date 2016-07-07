const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('../models/user.js'),
      bcrypt = require('bcryptjs');
      

// passportlocal auth strategy
passport.use('local-login', new LocalStrategy({
   passReqToCallback : true
},
  function(req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('message', 'Incorrect username.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('message', 'Incorrect password.'));
      }
      return done(null, user);
    });
  }
));


passport.use('local-signup', new LocalStrategy({
   passReqToCallback : true
},
    function(req, username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, req.flash('message', 'username already exists.'))
            } else {
                var newUser = new User({
                  username: username,
                  password: password
                });
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    }));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = passport;
