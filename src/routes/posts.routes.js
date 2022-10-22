const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// 1. 내가 작성한 게시글 조회
router.get('/posts', authMiddleware, postsController.findMyPosts);

// 2. 내가 작성한 게시글 상세 조회
router.get('/posts/:postId', postsController.fineOnePost);

// 3. 게시글 작성
router.post('/posts', authMiddleware, postsController.createPost);

// 4. 게시글 수정
router.put('/posts/:postId', authMiddleware, postsController.updatePost);

// 5. 게시글 삭제
router.delete('/posts/:postId', authMiddleware, postsController.deletePost);

module.exports = router;
