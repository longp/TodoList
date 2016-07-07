const express = require('express'),
      router = express.Router(),
      User = require('../models/user.js'),
      passport = require('../config/passport.js')



router.get('/register', function(req,res) {
  res.render('register')
})

router.post('/register',
  passport.authenticate('local-signup', {
     successRedirect: '/',
     failureRedirect: '/auth/register',
     failureFlash: true
   })
);

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local-login', {
   successRedirect: '/',
   failureRedirect: '/auth/login',
   failureFlash: true
 })
);



router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect("/auth/login");
});


module.exports = router;
