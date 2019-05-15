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
      // 応用課題1-3
      // クッキーの値をセット
      res.cookie('user_id', userId);
      
      // 応用課題1-4
      // sesseion.urlが'another_after'の場合はそちらにリダイレクト
      if (req.cookies.url === 'another_after') {
        res.redirect('/another_after')
      } else {
        res.redirect('/after')
      }
    } else {
      res.render('login', {
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});

module.exports = router;
