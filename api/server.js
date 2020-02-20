const express = require('express');

const apiRouter = require('./apiRouter.js');

const configMiddleware = require('./configMiddleware');

// const usersRouter = require('../users/usersRouter'); 

const server = express();

configMiddleware(server); 


server.use('/api', apiRouter);   


// √√√√ double yes 
server.get('/', (req, res) => {
    res.send(`<h1> 
    Node Auth Project 1 👩‍💻
    </h1>`);
});

module.exports = server; 