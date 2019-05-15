var express = require('express');
var router = express.Router();
var models = require("../models");
var csrf = require('csrf');
var tokens = new csrf();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 応用課題1-2
  // #1 csrf対策のためgetリクエストの段階でcsrfトークンを埋め込んでおく
  var secret = tokens.secretSync();
  var token = tokens.create(secret);
  req.session._csrf = secret;
  res.cookie('_csrf', token);
  
  models.User.findAll({
  }).then((result) => {
  res.render('index', { users: result });
  });
});

router.post('/', function(req, res, next) {
  // 応用課題1-2
  // #2 #1で埋め込んだトークンとsecretをミドルウェアのverifyメソッドで照合できればcreateアクションを呼び出す
  var secret = req.session._csrf;
  var token = req.cookies._csrf;
  if(tokens.verify(secret, token) === false)
  {
    throw new Error('Invalid Token');
  } else {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(() => {
    res.redirect('/');
  });
}
});

module.exports = router;
