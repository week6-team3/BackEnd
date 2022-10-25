const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (userId) => {
    try {
      const myPosts = await this.postRepository.findMyPosts(userId);
      if (!myPosts) throw new Error('작성한 게시글이 없습니다.');

      const myAllPosts = myPosts.map((post) => {
        return {
          postId: post.postId,
          userId: post.userId,
          nickname: post.User.nickname,
          email: post.User.email,
          title: post.title,
          likeCount: post.likeCount,
          travel: post.travel,
          completion: post.completion,
          sharing: post.sharing,
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
  findOnePost = async (userId, postId) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');
      let isMyPost;
      userId && existPost.userId === userId ? (isMyPost = true) : (isMyPost = false);
      const myCheckList = await this.postRepository.findCheckList(postId);

      return {
        postId: existPost.postId,
        userId: existPost.userId,
        nickname: existPost.User.nickname,
        email: existPost.User.email,
        title: existPost.title,
        likeCount: existPost.likeCount,
        travel: existPost.travel,
        sharing: existPost.sharing,
        isMyPost: isMyPost,
        createdAt: existPost.createdAt,
        updatedAt: existPost.updatedAt,
        checkList: myCheckList,
      };
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 3. 게시글 작성
  createPost = async (userId, title, travel, filename, path) => {
    try {
      
      const createPost = await this.postRepository.createPost(userId, title, travel, filename, path);
      const newPost = await this.postRepository.findOnePost(createPost.postId);

      // return newPost;
      return {
        postId: newPost.postId,
        userId: newPost.userId,
        nickname: newPost.User.nickname,
        email: newPost.User.email,
        title: newPost.title,
        likeCount: newPost.likeCount,
        travel: newPost.travel,
        completion: newPost.completion,
        sharing: newPost.sharing,
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt,
        filename: newPost.filename,
        path: newPost.path
      };
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 4. 게시글 수정
  updatePost = async (title, travel, postId, userId) => {
    try {
      const findOnePostResult = await this.postRepository.findOnePost(postId);
      if (!findOnePostResult) {
        throw new Error('존재하지 않는 게시글입니다.');
      }
      if (findOnePostResult.userId !== userId) {
        throw new Error('수정 권한이 없습니다.');
      }

      // const updatePostResult = await this.postRepository.updatePost(title,travel,completion,checklist,postId);
      const updatePostResult = await this.postRepository.updatePost(title, travel, postId);

      if (updatePostResult) {
        return { message: '수정완료' };
      } else {
        return { errorMessage: '수정 실패. 관리자에게 문의 부탁드립니다.' };
      }
    } catch (error) {
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
