const express = require('express'),
      router = express.Router(),
      User = require('../models/user.js'),
      passport = require('../config/passport.js')


router.post('/register', function(req, res) {
  newUser = new User(req.body);
  newUser.save(function(err, doc) {
    if (err) {
      console.log(err)
    }
    console.log(doc)
  });
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      res.send("Invalid Login Credentials");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else {
        res.render('index');
      }
    });
  })(req,res,next);
});




router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect("/login");
});


module.exports = router;
