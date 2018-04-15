const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');

app.use(bodyParser.json());

const DB = {
    users: [
        {
            id: '123',
            name: 'Gonzalo',
            email: 'gonzalo@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '1234',
            name: 'Hector',
            email: 'hector@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '2310',
            hash: '',
            email: 'gonzalo@gmail.com'
        }
    ]
};

app.get('/', (req, res) => {
    res.send(DB.users);
});

// SIGN IN
app.post('/signin', (req, res) => {
    bcrypt.compare("B4c0/\/", hash, function(err, res) {
        // res === true
    });
    bcrypt.compare("not_bacon", hash, function(err, res) {
        // res === false
    });

    if (req.body.email === DB.users[0].email &&
        req.body.password === DB.users[0].password) {
        res.json('signing');
    }
    else {
        res.status(400).json('error logging in');
    }
});

// REGISTER
app.post('/register', (req, res) => {
    const { email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });

    DB.users.push(
        {
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(DB.users[(DB.users.length) - 1]);
});

// PROFILE
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    DB.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json("not found");
    }
});

// IMAGE COUNTER
app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    DB.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json("not found");
    }
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