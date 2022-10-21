const PostRepository = require('../repositories/posts.repository');
const { post } = require('../routes');

class PostService {
  postRepository = new PostRepository();

  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (userId, nickname) => {
    try {
      const myPosts = await this.postRepository.findMyPosts(userId);
      if (!myPosts) return;

      const myAllPosts = myPosts.map((post) => {
        return {
          nickname: nickname,
          postId: post.postId,
          title: post.title,
          content: post.content,
          liksCount: post.like,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });
      return myAllPosts;
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 2. 내가 작성한 게시글 상세 조회
  findOnePost = async (postId) => {
    try {
      // 에러 없이 로그인 여부 확인하고 싶은데...
      const existPost = await this.postRepository.findOnePost(postId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');

      return {
        nickname: post.User.nickname,
        postId: post.postId,
        where: post.where,
        title: post.title,
        content: post.content,
        liksCount: post.like,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 3. 게시글 작성
  createPost = async (userId, nickname, title, content, where) => {
    try {
      const newPost = await this.postRepository.createPost(userId, title, content, where);
      return {
        postId: newPost.postId,
        nickname: nickname,
        content: newPost.content,
      };
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 4. 게시글 수정
  upeatePost = async (userId, postId, title, content, where) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');
      if (existPost.userId !== userId) throw new Error('작성자 본인만 수정할 수 있습니다.');

      const updatePost = await this.postRepository.updatePost(postId, title, content, where);
      return updatePost;
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 5. 게시글 삭제
  deletePost = async (userId, postId) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');
      if (existPost.userId !== userId) throw new Error('작성자 본인만 삭제할 수 있습니다.');

      const deletePost = await this.postRepository.deletePost(postId);
      return deletePost;
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };
}

module.exports = PostService;
