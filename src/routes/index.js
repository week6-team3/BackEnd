const express = require('express');
const router = express.Router();

// Routes
const userRouter = require('./users');
const postRouter = require('./posts.routes');
const sharingRouter = require('./sharings.routes');
const checklistRouter = require('./checklist');

router.use('/', userRouter);
router.use('/', postRouter);
router.use('/', sharingRouter);
router.use('/checkList', checklistRouter);

module.exports = router;
