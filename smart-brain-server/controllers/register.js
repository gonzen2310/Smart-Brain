
const HandleRegister = (req, res, DBpostgre, bcrypt) => {
    const { email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form Submission');
    }
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
};

module.exports = {
    HandleRegister: HandleRegister
};