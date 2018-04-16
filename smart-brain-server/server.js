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

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/signin');
});

// SIGN IN
app.post('/signin', (req, res) => {
    DBpostgre.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return DBpostgre.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => status(400).json("unable to get user"));
            }
            else {
                res.status(400).json("Wrong credentials")
            }
        })
        .catch(err => status(400).json("Wrong credentials"));
});

// REGISTER
app.post('/register', (req, res) => {
    const { email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
        DBpostgre.transaction(trx => {
            // transaction when you have to do more than two things at once
            trx.insert({
                hash: hash,
                email: email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        }).then(user => {
                            res.json(user[0]);
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('Unable to register'));
});

// PROFILE
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    DBpostgre.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user)
            }
            else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('Not found'));
});

// IMAGE COUNTER
app.put('/image', (req, res) => {
    const { id } = req.body;
    DBpostgre('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
});

// BCRYPT
// Load hash from your password DB.



// LISTEN TO PORT
app.listen(3000, () => {
    console.log('Server connected');
});

// API DESIGN
/*
 * / ---> res = this is working
 * / signin --> POST = success/fail
 * /register --> POST = user
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 */