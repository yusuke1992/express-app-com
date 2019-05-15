var models = require("./models");

module.exports = function(req, res, next) {
  var userId = req.session.user_id;
  if (userId) {
    models.User.findAll({
      where: {
        id: userId
      }
    }).then((result) => {
        res.locals.user = result.length? result[0]: false;
    });
  }
  next();
};