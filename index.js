// modules setup
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');

const User = require('./models/user');
const user = require('./middleware/user');
const register = require('./routes/register');

// .env setup
require('dotenv').config();

// app object creation
const app = express();

// port setup
app.set('port', process.env.PORT || 80);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public files access
app.use(express.static(path.join(__dirname, 'public')));

// body-parsing middleware (e.g. to read req.body)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// session setup
app.use(session({
  secret: 'foo',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: process.env.URI
  })
}));


start();

// handler setup for '/register' route
app.get('/register', register.form);
app.post('/register', register.submit);


// app.get('/login', login.form);
// app.post('/login', login.submit);
// app.get('/logout', login.logout);

// let user = new User('admn', 'admin');
// user.getUser().then(console.log);
// user.getUser().then((result) => {
//   if (result != null) {
//     console.log('found');
//   };
// });
// if (user.getUser() != null) {console.log('found')};



async function start() {
  try {
    await mongoose.connect(process.env.URI);
    app.get('/', (req, res) => {
      res.render('index', {title: 'Welcome page'})
    });
    app.listen(app.get('port'), () => {
      console.log('App started on port', app.get('port'))
    });
  } catch (e) {
    console.log(e);
  };
};
