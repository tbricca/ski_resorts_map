var express = require('express');
var router = express.Router();
// at the very top, include the database models
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');

// add ski resort to page
router.post("/", function(req, res){
  db.user.findOne({
    where: {
      id: req
    }
  })
})
