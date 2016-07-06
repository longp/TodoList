const express = require('express'),
      router = express.Router(),
      User = require('../models/user.js'),
      passport = require('../config/passport.js')



router.get('/register', function(req,res) {
  res.render('register')
})

router.post('/register', function(req, res) {
  newUser = new User({
    username:req.body.username,
    password:req.body.password
  });
  newUser.save(function(err, doc) {
    if (err) {
      console.log(err)
    }
      res.redirect('/')
  });
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req,res,next) {

  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      // Redirect if it fails
      if (!user) { return res.redirect('/auth/login'); }


      req.logIn(user, function(err) {
        if (err) {return next(err); }
        // Redirect if it succeeds
        return res.redirect('/auth/register')
      });
    })(req, res, next);
  });



router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect("/login");
});


module.exports = router;
