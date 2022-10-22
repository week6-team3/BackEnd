const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const SharingController = require('../controllers/sharings.controller');
const sharingController = new SharingController();

// 1. 공유된 게시글 목록 조회
router.get('/sharings', sharingController.getSharePosts);

// 2. 공유된 게시글 상세 조회
router.get('/sharings', sharingController.getOnePost);

// 3. 내 게시글 공유하기
router.put('/sharings', authMiddleware, sharingController.sharePost);

module.exports = router;
