const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submit = (req, res, next) => {
  let data = req.body.user;

  User.getUser(data).then((result) => {
    if (result != null) {
      res.error('Username already taken!');
      res.redirect('back');
    } else {
      let user = new User(data.login, data.password);
      user.createUser();
      req.session.uid = user.login;
      res.redirect('/')
    };
  });
};
