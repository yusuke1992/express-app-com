var express = require('express');
var router = express.Router();
var models = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  var userId = req.session.user_id;
  var pageUrl = 'another_after'
  if (userId) {
    res.render('another_after');
  }else {
    // 応用課題1-4
      // cookie.urlを埋め込む
    res.cookie('url', pageUrl );
    res.redirect('/login');
  }

  
});


module.exports = router;
