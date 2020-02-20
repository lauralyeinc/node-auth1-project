const express = require('express');
const bcrypt = require('bcryptjs');
const usersDB = require('./usersHelper'); 

const router = express.Router();

// /api/users
/* | GET    | /api/users    | If the user is logged in, respond with an array of
all the users contained in the database. If the user is not logged in repond with
the correct status code and the message: 'You shall not pass!'. */

// without middleware √√  double yes      // with middleware 
router.get('/', restricted, (req, res) => {
    usersDB.find()
        .then(allusers => {
            res.status(200).json(allusers);
        })
        .catch(error => {
            console.log(error);
            res.send({message: 'You shall not pass', error});
        });
});



//middleware 

function restricted(req, res, next) {
    const { username, password } = req.headers;

    //console.log(username); 

    if (username && password) {
        UsersDB.findBy({ username })
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

module.exports = router; 