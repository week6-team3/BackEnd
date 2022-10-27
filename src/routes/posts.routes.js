const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const sharingMiddleware = require('../middlewares/sharingMiddleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const multer = require("multer");


// 이미지 업로드
const storage = multer.diskStorage({
    // 파일이 저장되는 경로 설정
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    // 내가 정하는 파일명 설정
    filename: function (req, file, cb) {
        const { mimetype } = file;
      cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1])
    }
  });

const upload = multer({ storage: storage })

// 1. 내가 작성한 게시글 조회
router.get('/posts', authMiddleware, postsController.findMyPosts);

// 2. 내가 작성한 게시글 상세 조회
router.get('/posts/:postId', sharingMiddleware, postsController.fineOnePost);

// 3. 게시글 작성
router.post('/posts', authMiddleware, postsController.createPost);
// router.post('/posts', upload.single('img'), postsController.createPost);

// 4. 게시글 수정
router.patch('/posts/:postId', authMiddleware, postsController.updatePost);

// 5. 게시글 삭제
router.delete('/posts/:postId', authMiddleware, postsController.deletePost);

module.exports = router;
