const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      expses = require('express-session'),
      logger = require('morgan'),
      http = require('http'),
      path = require('path');

// database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');


// environmental variables
app.set('port', process.env.PORT || 1337);
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expses({
  secret: 'keyboard cat rocks',                                               //CHANGE FOR AN ENV VARIABLE LATER FOR PROD
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (7 * 24 * 60 * 60 * 1000) } // 7 Days
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

//routes
const index = require('./controllers/index.js')
app.use('/', index);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
