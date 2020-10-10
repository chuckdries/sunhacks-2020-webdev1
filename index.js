import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

const dbPromise = open({
  filename: 'data.db',
  driver: sqlite3.Database
})

const setupDatabase = async() => {
  const db = await dbPromise;
  await db.migrate();
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

app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', async (req, res) => {
  const db = await dbPromise;
  const {
    name,
    email,
    password
  } = req.body;
  const existingUser = await db.get('SELECT * FROM Users WHERE email=?', email);
  if (existingUser) {
    res.render('register', { error: 'user already exists' });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.run(`INSERT INTO Users (name, email, password) VALUES (?, ?, ?);`,
    name, email, passwordHash);
  const newUser = await db.get('SELECT * FROM Users WHERE email=?', email);
  console.log('new user!', newUser);
  res.redirect('/')
})

app.listen(port, () => {
  console.log('listening on http://localhost:3000');
});
