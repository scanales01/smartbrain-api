// module dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

// Controller modules
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// db object
const db = knex({
  client: 'pg',
  connection: {
   host : '127.0.0.1',
   user : 'postgres',
   password : '',
   database : 'smartbrain' 
  }
});

const app = express();

app.use(express.json());
app.use(cors());

// endpoints
app.get('/', (req, res) => { res.send('OK') });
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { Image.handleImage(req, res, db) });

app.listen(3000, () => {
  console.log('app is running on port 3000');
})