const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// 1. 내가 작성한 게시글 조회
// router.get('/', authMiddleware, postsController.findMyPosts);
router.get('/', postsController.findMyPosts);

// 2. 내가 작성한 게시글 상세 조회
router.get('/:postId', postsController.fineOnePost);

// 3. 게시글 작성
// router.post('/', authMiddleware, postsController.createPost);
router.post('/', postsController.createPost);

// 4. 게시글 수정
// router.put('/', authMiddleware, postsController.updatePost);
router.put('/', postsController.updatePost);

// 5. 게시글 삭제
// router.delete('/', authMiddleware, postsController.deletePost);
router.delete('/', postsController.deletePost);

module.exports = router;
