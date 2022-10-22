const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();

  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (req, res) => {
    const userId = res.locals.user;

    const myPosts = await this.postService.findMyPosts(userId);
    res.status(200).send({ data: myPosts });
  };

  // 2. 내가 작성한 게시글 상세 조회
  fineOnePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    const myOnePost = await this.postService.findOnePost(postId);

    res.status(200).send({ data: myOnePost });
  };

  // 3. 게시글 작성
  createPost = async (req, res) => {
    const { title, where, completion } = req.body;
    if (!title || !where || !completion) {
      res.status(400).send({ msg: '게시글 제목을 작성해주세요' });
    }
    const { userId } = res.locals.user;

    const newPost = await this.postService.createPost(userId, title, where, completion);
    console.log('테스트2');
    res.status(201).send(newPost);
  };

  // 4. 게시글 수정
  updatePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).send({ msg: '게시글 내용을 작성해주세요' });
    }

    const { userId } = res.locals.user;

    const updatePost = await this.postService.updatePost(userId, postId, title, content);
    return updatePost;
  };

  // 5. 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    const { userId } = res.locals.user;

    const deletePost = await this.postService.deletePost(userId, postId);
    return deletePost;
  };
}

module.exports = PostController;
