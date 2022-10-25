const express = require('express');
const router = express.Router();

const userRouter = require('./users');
const postRouter = require('./posts.routes');
const commentRouter = require('./comments');
const likeRouter = require('./likes');
const sharingRouter = require('./sharings.routes');
const checklistRouter = require('./checklist');

router.use('/', userRouter);
router.use('/', postRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);
router.use('/sharings', sharingRouter);
router.use('/checkList', checklistRouter);

module.exports = router;
