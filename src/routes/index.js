const express = require('express');
const router = express.Router();

const userRouter = require('./users')
const postRouter = require('./posts')
const commentRouter = require('./comments');

router.use('/', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

module.exports = router;
