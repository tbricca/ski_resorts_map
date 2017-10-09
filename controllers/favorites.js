var express = require('express');
var router = express.Router();
// at the very top, include the database models
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');


router.post('/', function(req, res) {
  if (req.session.user){
    db.favorite.findOrCreate({
      where: { lat: req.body.lat, lng:req.body.lng},
      defaults: {
        name: req.body.name,
        info: req.body.info,
        userId: req.session.user
      }
    }).spread(function(user, created) {
      if (created) {
        passport.authenticate('local', {
            successRedirect: '/',
            successFlash: 'Added to Favorites'
          })(req, res);
        } else {
          // if not created, the email already exists
          req.flash('error', 'You need to login to do that');
          res.redirect('/auth/signup');
        }
      })
  }

  })

  // router.get('/', function(req, res) {
  //   db.favorite.findAll({
  //     where: {userId: req.session.user}
  //   })
  //   .then req.render(favorite){
  //
  //   }
  // })
  // router.delete('/',function(req,res){
  //   de.favorite.delete({
  //     where:
  //   })
  // })




module.exports = router;
