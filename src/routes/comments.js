const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // 파일이름 바뀌면 경로 바꿔야함.

const CommentController = require('../controllers/comments.controller');
const commentController = new CommentController();

router.get('/:postId', authMiddleware, commentController.getComment);
router.post('/:postId', commentController.createComment);
router.put('/:commentId', authMiddleware, commentController.updateComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
