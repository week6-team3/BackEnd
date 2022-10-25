const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const sharingMiddleware = require('../middlewares/sharingMiddleware');
const SharingController = require('../controllers/sharings.controller');
const sharingController = new SharingController();

// 1. 공유된 게시글 목록 조회
router.get('/', sharingController.getSharedPosts);

// 2. 공유된 게시글 상세 조회
router.get('/:postId', sharingMiddleware, sharingController.getOnePost);

// 3. 내 게시글 공유하기
router.post('/', authMiddleware, sharingController.sharePost);

module.exports = router;
