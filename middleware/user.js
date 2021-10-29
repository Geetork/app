const User = require('../models/user');

module.exports = (req, res, next) => {
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
  }
  let uid = req.session.uid;
  if (!uid) return next();
  // User.get(uid, (err, user) => {
  //   if (err) return next(err);
  //   req.user = res.locals.user = user;
  //   next();
  // });
  let data = req.body.user;

  User.getUser(data).then((result) => {
    let user = new User(data.login, data.password);
    req.user = res.locals.user = user;
    next();
  });
};
