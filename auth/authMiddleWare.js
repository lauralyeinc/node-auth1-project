const users = require('../users/usersHelper.js');

const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    const { username, password } = req.headers

    if (!(username && password)) {
        res.status(401).json({ message: 'Invaild Credentials '});
    } else {
        users.findBy({ username })
        .first()
        .then(_user => {
            if (_user && bcrypt.compareSync(password, _user.password)) {
                next()
            } else {
                res.status(401).json({ message: ' Invaild Credentials'})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: error })
        }) 
    }
}