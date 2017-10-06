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
  request("https://maps.googleapis.com/maps/api/js?key=" + process.env.DB_PASS + "&callback=initMap", function (error, response, body){
    if (!error && response.statusCode == 200) {
      res.render('index', {mapData:body})
    }
  });
});


app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

// module.exports = server;
module.exports = server;
