var express = require('express');
var router = express.Router();
// at the very top, include the database models
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');


router.get('/', function(req, res) {
  db.favorite.findAll({
    where: {userId: req.session.passport.user}
  })
  .then(function(favorites){
    res.render("profile",{favorites:favorites,username:req.session.passport.user});
  })
})

router.post('/', function(req, res) {
  console.log("-------")
  // console.log(req.session.passport.user)
  if (req.session.passport && req.session.passport.user){
    db.favorite.findOrCreate({
      where: { lat: req.body.lat, lng:req.body.lng, userId: req.session.passport.user},
      defaults: {
        name: req.body.name,
        info: req.body.info
      }
    }).spread(function(favorite, created) {
      if (created) {
        console.log("created");
        req.flash('success', 'Ski Resort Added to favorites');
        res.send({redirect:'/favorites'});
        // passport.authenticate('local', {
        //     successRedirect: '/',
        //     successFlash: 'Added to Favorites'
        //   })(req, res);
        } else {
          console.log("or else");
          // if not created, the email already exists
          req.flash('error', 'Ski Resort already added to favorites');
          res.send({redirect:'/favorites'});
        }
      })
    }
    else {
      req.flash('error', 'You need to login to do that');
      res.send({redirect: '/auth/login'});
      
    }
  })

 

  router.delete('/',function(req,res){
    console.log(req.body.id);
    db.favorite.destroy({
      where:{id:req.body.id}
    })
    .then(function(favorites){
      console.log(favorites);
      res.send('deleted');
    })
  })




module.exports = router;
