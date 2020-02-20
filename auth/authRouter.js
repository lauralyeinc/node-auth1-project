const router = require('express').Router();
const bcrypt = require('bcryptjs');

const authorize = require('./authMiddleWare.js');
const usersDB = require('../users/usersHelper.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    usersDB.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// router.post('/login', authorize(), (req, res) => {
//     let { username } = req.headers; 
//     res.status(200).json({message: `Welcome ${username}!`});
// })


// without authorize() MIDDLEWARE 
router.post('/login', (req, res) => {
    let {username, password } = req.body;

    usersDB.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!`});
            } else {
                res.status(401).json({ message: 'Invalid Credentials'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


module.exports = router; 