var express = require('express');
var router = express.Router();

var models = require("../models");

router.get('/', function(req, res, next) {
  
  res.render('login');
});

router.post('/', function(req, res, next) {
  models.User.findAll({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then((result) => {
    if (result.length)  {
      var userId = result[0].dataValues.id;
    } else {
      var userId = false;
    }
    if (userId) {
      req.session.user_id = userId;
      res.redirect('/after')
    } else {
      res.render('login', {
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});

module.exports = router;
