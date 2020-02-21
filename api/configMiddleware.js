const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session); 

// part 2 sessions/cookies 🍪
// middleware 🧐
const sessionConfig = {
    name: 'bunny',
    secret: 'carrotsareyummy',
    cookie: {
        maxAge: 1000 * 60 * 60,    // 1 hour old
        secure: false,
        httpOnly: true
    },
    resave:  false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,    // 1 hour old
    })
};



module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig));
};