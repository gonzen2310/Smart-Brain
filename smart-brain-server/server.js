const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const DBpostgre = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'gonzalo2310',
        database : 'smart-brain'
    }
});
// EXTERNAL ROUTES
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileId = require('./controllers/profileId');
const image = require('./controllers/image');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/signin');
});

// SIGN IN
app.post('/signin', (req, res) => {signin.HandleSignin(req, res, DBpostgre, bcrypt)});

// REGISTER
app.post('/register', (req, res) => { register.HandleRegister(req, res, DBpostgre, bcrypt) });

// PROFILE
app.get('/profile/:id', (req, res) => { profileId.HandleProfileId(req, res, DBpostgre)});

// IMAGE COUNTER
app.put('/image', (req, res) => { image.HandleImage(req, res, DBpostgre)});

// BCRYPT
// Load hash from your password DB.



// LISTEN TO PORT
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server  connnect in port ${PORT}`);
});

// API DESIGN
/*
 * / ---> res = this is working
 * / signin --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 */