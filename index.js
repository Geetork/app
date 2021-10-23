// modules setup
const express = require('express');
const app = express();



// port setup
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Hello World!');
  res.end();
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'))
});

