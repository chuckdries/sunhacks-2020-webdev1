const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const dbPromise = sqlite.open({
  filename: 'data.db',
  driver: sqlite3.Database
})

const setupDatabase = async() => {
  const db = await dbPromise;
  await db.run('CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY, messageText STRING);')
}

setupDatabase();

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

const messages = [];

app.post('/message', async (req, res) => {
  const db = await dbPromise;
  const message = req.body.messageText;
  await db.run('INSERT INTO Messages (messageText) VALUES (?);', message);
  res.redirect('/');
})

app.get('/', async (req, res) => {
  const db = await dbPromise;
  const messages = await db.all('SELECT * FROM Messages;');
  console.log(messages);
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
