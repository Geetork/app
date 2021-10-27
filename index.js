// modules setup
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// port setup
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:gjal78p@cluster0.c5iuq.mongodb.net/users', {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    // app.get('/', (req, res) => {
    //   res.send('Hello World!');
    //   res.end();
    // });
    app.listen(app.get('port'), () => {
      console.log('App started on port', app.get('port'))
    });
  } catch (e) {
    console.log(e);
  };
};

start();
