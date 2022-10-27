const PostService = require('../services/posts.service');


class PostController {
  postService = new PostService();

  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (req, res) => {
    const { userId } = res.locals.user;

    const myPosts = await this.postService.findMyPosts(userId);
    
    res.status(200).send(myPosts);
  };

  // 2. 내가 작성한 게시글 상세 조회
  findOnePost = async (req, res) => {

    try {
      
      const { postId } = req.params;
      if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId가 잘못되었습니다.');
      let userId;
      if (!res.locals.user) userId = null;
      else userId = res.locals.user.userId;
  
      const myOnePost = await this.postService.findOnePost(userId, postId);
      console.log(myOnePost);
      res.status(200).send(myOnePost);
    } catch (error) {
      res.status(444).send(error);
    }
  };

  // 3. 게시글 작성
  createPost = async (req, res) => {

    const { title, travel } = req.body;
    console.log(title, travel)
    // if (!title) res.status(400).send({ message: '제목을 입력해주세요.' });
    // if (!travel) res.status(400).send({ message: '여행장소(국내/해외)를 선택해주세요.' });

    const { userId } = res.locals.user;
    
    const newPost = await this.postService.createPost(userId, title, travel);
    return res.status(201).send(newPost);
  };

  // 4. 게시글 수정 (title 수정, completion 수정)
  updatePost = async (req, res) => {
    try {
      const { title, postId } = req.body;
      // const { postId } = req.params;
      const { userId } = res.locals.user;


      console.log('::::::::>'+postId);
      if (title === undefined) {
        console.log('completion 수정!!');
        const updatePostResult = await this.postService.updateCompletionPost(postId, userId);
        res.status(200).send(updatePostResult);
      } else if (!title || /^[\s]+/.test(title)) {
        // 공백 시작 혹은 title 값이 없는 경우
        if (!title) res.status(400).send({ message: '제목을 입력해주세요.' });
        if (/^[\s]+/.test(title)) res.status(400).send({ message: '제목은 공백으로 시작할 수 없습니다.' });
      } else if (title) {
        console.log('title 수정!!');
        const updatePostResult = await this.postService.updateTitlePost(title, postId, userId);
        res.status(200).send(updatePostResult);
      }
    } catch (error) {
      console.error(error);
      throw new Error('게시글 수정 실패 !');
    }
  };

  // 5. 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    const { userId } = res.locals.user;

    const deletePost = await this.postService.deletePost(userId, postId);
    res.status(200).send(deletePost);
  };
}

module.exports = PostController;
