var models = require("./models");

module.exports = function(req, res, next) {
  // 応用課題1-3
  // クッキーの値をセッションに代入
  req.session.user_id = req.cookies.user_id;
  var userId = req.session.user_id;
  if (userId) {
    models.User.findAll({
      where: {
        id: userId
      }
    }).then((result) => {
      if (result.length) {
        res.locals.user = result[0];
      } else {
        res.locals.user = false;
      }
    });
  }
  next();
};