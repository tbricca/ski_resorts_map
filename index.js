require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var request = require('request');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
// db.connect({
//   password: process.env.DB_PASS
// })

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//These lines must occur after the session is configured
var passport = require('./config/ppConfig');
app.use(passport.initialize());
app.use(passport.session());

///routes
app.get('/', function(req, res){
      var username;
      if (req.session.passport && req.session.passport.user) {
        username = req.session.passport.user;
      }
      res.render('index', {username:username})

});


app.get('/profile', isLoggedIn, function(req, res) {
  var username;
  if (req.session.passport && req.session.passport.user) {
    username = req.session.passport.user;
  }
  res.render('profile',{username:username});
});

app.use('/auth', require('./controllers/auth'));

app.use('/favorites',require('./controllers/favorites'));

var server = app.listen(process.env.PORT || 3000);

// module.exports = server;
module.exports = server;
