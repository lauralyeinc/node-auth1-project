const router = require('express').Router();

const authRouter = require('../auth/authRouter.js');
const userRouter = require('../users/usersRouter.js');


// part 2 sessions/cookies 🍪
// middleware 🧐
// const sessionConfig = {
//     name: 'bunny',
//     secret: 'carrotsareyummy',
//     cookie: {
//         maxAge: 1000 * 60 * 60,    // 1 hour old
//         secure: false,
//         httpOnly: true
//     },
//     resave:  false,
//     saveUninitialized: false,

//     store: new knexSessionStore({
//         knex: require('../database/dbConfig.js'),
//         tablename: 'sessions',
//         sidfield
//     })
// }

// /api/auth 
router.use('/auth', authRouter);

// /api/users
router.use('/users', userRouter);

// /api
router.get('/', (req, res) => {
    res.json({ APImessage: "It's working! 🙌🏻"  })
});

module.exports = router; 