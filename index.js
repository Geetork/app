// modules setup
const express = require('express');
const mongoose = require('mongoose');
const

const app = express();
// port setup
app.set('port', process.env.PORT || 3000);

async function start() {
  try {
    await mongoose.connect('', {
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
