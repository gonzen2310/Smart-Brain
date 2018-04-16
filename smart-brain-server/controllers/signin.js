
const HandleSignin = (req, res, DBpostgre, bcrypt) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json('Incorrect form Submission');
    }
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
};

module.exports = {
    HandleSignin: HandleSignin
};