const express = require('express');
const router = express.Router();

const userRouter = require('./users')
const commentRouter = require('./comments');

router.use('/', userRouter);
router.use('/comments', commentRouter);

module.exports = router;
