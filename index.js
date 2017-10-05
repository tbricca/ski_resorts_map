require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var request = require('request');
var app = express();
var session = require('express-session');

// db.connect({
//   password: process.env.DB_PASS
// })



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);


app.get('/', function(req, res){
  request("https://maps.googleapis.com/maps/api/js?key=" + process.env.DB_PASS + "&callback=initMap", function (error, response, body){
    if (!error && response.statusCode == 200) {
      res.render('index', {mapData:body})
    }
  });
});

app.use('/auth', require('./controllers/auth'));

app.listen(process.env.PORT || 3000)
// module.exports = server;
