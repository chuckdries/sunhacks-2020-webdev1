const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  console.log('request made to', req.path);
  next();
})

app.use(bodyParser.urlencoded({ extended: false }))

const messages = [];

app.post('/message', (req, res) => {
  messages.push(req.body.messageText);
  res.redirect('/');
})

app.get('/', (req, res) => {
  res.render('home', { messages: messages });
});

app.get('/two', (req, res) => {
  res.render('two')
})

app.get('/profile/:name', (req, res) => {
  res.render('profile', { name: req.params.name })
})

app.listen(port, () => {
  console.log('listening on http://localhost:3000');
});
