const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submit = (req, res, next) => {
  let data = req.body.user;
  console.log(data);
  User.getUser(data).then((result) => {
    if ( result ) {
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
