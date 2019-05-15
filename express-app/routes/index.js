var express = require('express');
var router = express.Router();

var models = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll({
  }).then((result) => {
  res.render('index', { users: result });
  });
});

router.post('/', function(req, res, next) {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(() => {
    res.redirect('/');
  });
});

module.exports = router;
