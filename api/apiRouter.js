const router = require('express').Router();

const authRouter = require('../auth/authRouter.js');
const userRouter = require('../users/usersRouter.js');

// /api/auth 
router.use('/auth', authRouter);

// /api/users
router.use('/users', userRouter);

// /api
router.get('/', (req, res) => {
    res.json({ APImessage: "It's working! 🙌🏻"  })
});

module.exports = router; 