const express = require('express');
const router = express.Router();

// Routes
const userRouter = require('./users');
const postRouter = require('./posts.routes');
const sharingRouter = require('./sharings.routes');

router.use('/', userRouter);
router.use('/', postRouter);
router.use('/', sharingRouter);

module.exports = router;
