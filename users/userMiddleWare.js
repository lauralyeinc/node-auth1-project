const bcrypt = require('bcryptjs');
const usersDB = require('./usersHelper');


module.exports = function restricted(req, res, next) {
    const { username, password } = req.headers;

    console.log(username, password); 

    if(username && password) {
        usersDB.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log('Success!');
            next();
            } else {
            res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Unexpected error' });
        });
    } else {
        res.status(400).json({ message: 'No credentials provided' });
    }
};