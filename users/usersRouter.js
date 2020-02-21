const express = require('express');
const bcrypt = require('bcryptjs');
const usersDB = require('./usersHelper'); 

const restricted = require('./userMiddleWare')
const router = express.Router();

// /api/users
/* | GET    | /api/users    | If the user is logged in, respond with an array of
all the users contained in the database. If the user is not logged in respond with
the correct status code and the message: 'You shall not pass!'. */

// without middleware √√  double yes      // with middleware 
router.get('/user', restricted, (req, res) => {
    console.log('here')
    usersDB.find()
        .then(allusers => {
            res.status(200).json(allusers);
        })
        .catch(error => {
            console.log(error);
            res.status(401).json({message: 'You shall not pass', error});
        });
});


// /api/auth/register 
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


// /api/auth/login
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    usersDB.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            // Saves username into the session - server access this username 
            // req.session.username = user.username;

            // Can see the session saving 
            // console.log('session', req.session);
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'YOU SHALL NOT PASS' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


module.exports = router; 