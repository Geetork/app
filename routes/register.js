const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submit = (req, res, next) => {
  let data = req.body.user;

  if ( data.getUser != null ) {};

  User.getUser(data.login, (err, user) => {
    if (err) return next(err);

    if (user.login) {
      res.error('Username already taken!');
      res.redirect('back');
    } else {
      user = new User({ login: data.login, password: data.password });
      user.save((err) => {
        if (err) return next(err);
        req.session.user = user.id;
        res.redirect('/')
      });
    }
  });
};
