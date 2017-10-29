var express = require('express');
var router = express.Router();
// at the very top, include the database models
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/signup', function(req, res) {
  console.log('the new chevy tahoe');
  var username;
  if (req.session.passport && req.session.passport.user) {
    username = req.session.passport.user;
  }
  res.render('auth/signup',{username:username});
});

router.post('/signup', function(req, res) {
  // find or create a user, providing the name and password as default values
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      // if created, success and redirect home
      // replace the contents of this if statement with the code below
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // if not created, the email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});


router.get('/login', function(req, res) {
  var username;
  if (req.session.passport && req.session.passport.user) {
    username = req.session.passport.user;
  }
  res.render('auth/login',{username:username});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;
