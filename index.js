// modules setup
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
// port setup
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
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

start();
