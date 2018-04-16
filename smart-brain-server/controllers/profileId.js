const HandleProfileId= (req, res, DBpostgre) => {
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
};

module.exports = {
    HandleProfileId: HandleProfileId
};