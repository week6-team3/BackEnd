const express = require('express');
const router = express.Router();


// Routes
const userRouter = require('./user');
// const naverUsersRouter = require('./naver-users.route.js');

// router.use('/users', [naverUsersRouter]);
router.use('/signup',userRouter)

module.exports = router;
