const express = require('express');
const router = express.Router();


// Routes
const userRouter = require('./users');
// const naverUsersRouter = require('./naver-users.route.js');

// router.use('/users', [naverUsersRouter]);
router.use('/',userRouter);

module.exports = router;
