const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (userId) => {
    try {
      const myPosts = await this.postRepository.findMyPosts(userId);
      if (!myPosts) throw new Error('작성한 게시글이 없습니다.');
      // const myAllPosts = myPosts.map((post) => {
      //   return {
      //     nickname: post.User.nickname,
      //     postId: post.postId,
      //     title: post.title,
      //     liksCount: post.like,
      //     createdAt: post.createdAt,
      //     updatedAt: post.updatedAt,
      //   };
      // });

      // 체크리스트 추가해야 함. 가공 전 상태 (보낼 데이터 선정되면 가공하기)
      return myPosts;
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
      // return existPost;

      return {
        nickname: existPost.User.nickname,
        postId: existPost.postId,
        title: existPost.title,
        travel: existPost.travel,
        completion: existPost.completion,
        likeCount: existPost.likeCount,
        createdAt: existPost.createdAt,
        updatedAt: existPost.updatedAt,
      };
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 3. 게시글 작성
  createPost = async (userId, title, travel, completion) => {
    try {
      const createPost = await this.postRepository.createPost(userId, title, travel, completion);

      return createPost;
      // return {
      //   postId: newPost.postId,
      //   nickname: newPost.User.nickname,
      //   title: newPost.title,
      //   where: newPost.where,
      //   completion: newPost.completion,
      // };
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
