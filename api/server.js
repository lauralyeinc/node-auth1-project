const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send(`<h1> 
    Node Auth Project 1 👩‍💻
    </h1>`);
});

module.exports = server; 