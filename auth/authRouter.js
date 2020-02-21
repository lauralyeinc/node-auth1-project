const router = require('express').Router();
const bcrypt = require('bcryptjs');

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

// sessions and cookies 
// /api/auth/logout
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destory(error => {
            if (error) {
                res.send('Can checkout anytime but you cannot leave')
            } else {
                res.send('so long, thanks for coming!')
            }
        })
    } else {
        res.end();
    }
});


module.exports = router; 