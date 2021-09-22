// modules setup
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const session = require('express-session');
const user = require('./middleware/user');
const register = require('./routes/register');
const login = require('./routes/login');
const messages = require('./middleware/messages');

// port setup
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//setup public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(session());
app.use(messages);
app.use(user);

app.get('/', (req, res) => {
  res.render("index", {
    title: "Welcome page"
  });
});

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);





app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'))
});

module.exports = app;
