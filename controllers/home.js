var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  var request = require('request');
  request("https://maps.googleapis.com/maps/api/js?key=" + process.env.DB_PASS + "&callback=initMap", function (error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  });
});


module.exports=router;
