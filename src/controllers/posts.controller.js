const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();

  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (req, res) => {
    // const {user} = res.locals;
    user = {
      userId: '1',
      nickname: 'test1',
      email: 'test1@test.com',
      password: 'pw11',
    };

    const myPosts = await this.postService.findMyPosts(user.userId, user.nickname);
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
    const { title, content, where } = req.body;
    if (!title || !content) {
      res.status(400).send({ msg: '게시글 내용을 작성해주세요' });
    }
    // const {user} = res.locals;
    user = {
      userId: '1',
      nickname: 'test1',
      email: 'test1@test.com',
      password: 'pw11',
    };

    const newPost = await this.postService.createPost(userId, nickname, title, content, where);
    return newPost;
  };

  // 4. 게시글 수정
  updatePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).send({ msg: '게시글 내용을 작성해주세요' });
    }

    // const {user} = res.locals;
    user = {
      userId: '1',
      nickname: 'test1',
      email: 'test1@test.com',
      password: 'pw11',
    };

    const updatePost = await this.postService.updatePost(userId, postId, title, content);
    return updatePost;
  };

  // 5. 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    // const {user} = res.locals;
    user = {
      userId: '1',
      nickname: 'test1',
      email: 'test1@test.com',
      password: 'pw11',
    };

    const deletePost = await this.postService.deletePost(userId, postId);
    return deletePost;
  };
}

module.exports = PostController;
