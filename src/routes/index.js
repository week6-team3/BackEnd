const express = require('express');
const router = express.Router();

const commentsRouter = require('./comments.js');

router.use('/comments', commentsRouter);

module.exports = router;
