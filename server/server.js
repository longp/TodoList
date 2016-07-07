const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      expses = require('express-session'),
      logger = require('morgan'),
      http = require('http'),
      path = require('path'),
      passport = require('passport'),
      flash = require('connect-flash'),
      exphbs = require('express-handlebars');
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
  secret: 'keyboard cat rocks',
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (7 * 24 * 60 * 60 * 1000) }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//hbs setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'handlebars');


const index = require('./controllers/index.js'),
      auth = require('./controllers/auth.js'),
      api = require('./controllers/api.js')
app.use('/', index);
app.use('/auth', auth);
app.use('/task', api);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
