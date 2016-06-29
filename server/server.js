const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      expses = require('express-session'),
      logger = require('morgan'),
      path = require('path'),
      PORT = 1337

// exp middleware
app.use(express.static(path.resolve(__dirname, '../client/public')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expses({
  secret: 'keyboard cat rocks',                                               //CHANGE FOR AN ENV VARIABLE LATER FOR PROD
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (7 * 24 * 60 * 60 * 1000) } // 7 Days
}));



app.listen(PORT, function () {
  console.log('running on port ', PORT)
})
