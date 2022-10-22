const express = require('express');
const router = express.Router();

// Routes
const userRouter = require('./users');
const postsRouter = require('./posts.routes');

router.use('/',userRouter);
router.use('/', postsRouter);

module.exports = router;
