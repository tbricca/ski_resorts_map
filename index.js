require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

db.connect({
  password: process.env.DB_PASS
})

var request = require('request');
request("https://maps.googleapis.com/maps/api/js?key=" + process.env.DB_PASS + "&callback=initMap", function (error, response, body){
  if (!error && response.)
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);

// module.exports = server;
