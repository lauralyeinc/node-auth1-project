const express = require('express');

const apiRouter = require('./api/apiRouter.js');
const userRouter = require('./users/usersRouter.js')

const configMiddleware = require('./api/configMiddleware');

// const usersRouter = require('../users/usersRouter'); 

const server = express();

configMiddleware(server); 



// server.use('/api', apiRouter);   
server.use('/api/user', userRouter);


// √√√√ double yes 
server.get('/', (req, res) => {
    res.send(`<h1> 
    Node Auth Project 1 👩‍💻
    </h1>`);
});

module.exports = server; 