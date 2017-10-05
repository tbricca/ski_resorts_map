var express = require('express');
var db = require('../models');
var router = express.Router();
var passport = require('../config/ppConfig');

router.post('/signup', function(req, res) {
  console.log('signup success')
  res.render('auth/signup');
});
router.post('/signup', function(req, res) {
db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    password: req.body.password,
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


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;
