const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

// const authRouter = require('./auth/authRouter');
const userRouter = require('./users/usersRouter.js')
const server = express();


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
        knex: require('./data/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,    // 1 hour old
    })
};

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use(session(sessionConfig));

// server.use('/api/auth', authRouter); 
server.use('/api/users', userRouter);


// √√√√ double yes 
server.get('/', (req, res) => {
    res.send(`<h1> 
    Node Auth Project 1 and Project 2  👩‍💻
    </h1>`);
});

module.exports = server; 