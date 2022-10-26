const SharingRepository = require('../repositories/sharings.repository');
const PostRepository = require('../repositories/posts.repository');

class SharingService {
  sharingRepository = new SharingRepository();
  postRepository = new PostRepository();

  // 1. 공유된 게시글 전체 조회
  findSharedPosts = async () => {
    try {
      const sharedPosts = await this.sharingRepository.findSharedPosts();
      if (!sharedPosts) throw new Error('공유된 게시글이 없습니다.');

      const allPosts = sharedPosts.map((post) => {
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

      return allPosts;
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 2. 공유된 게시글 상세 조회
  findOnePost = async (userId, postId) => {
    try {
      const existPost = await this.sharingRepository.findOnePost(postId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');
      let isMyPost = '';
      userId && existPost.userId === userId ? (isMyPost = true) : (isMyPost = false);
      const myCheckList = await this.sharingRepository.findCheckList(postId);
      return {
        postId: existPost.postId,
        userId: existPost.userId,
        nickname: existPost.User.nickname,
        email: existPost.User.email,
        title: existPost.title,
        travel: existPost.travel,
        sharing: existPost.sharing,
        isMyPost: isMyPost,
        completion: existPost.completion,
        likeCount: existPost.likeCount,
        createdAt: existPost.createdAt,
        updatedAt: existPost.updatedAt,
        checkList: myCheckList,
      };
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 3. 게시글 공유하기
  sharePost = async (userId, postId) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
      console.log(userId, postId)
      console.log(typeof userId,typeof postId)
      console.log(existPost.userId, typeof existPost.userId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');
      if (existPost.userId !== userId) throw new Error('작성자 본인만 공유할 수 있습니다.');

      const sharePost = await this.sharingRepository.sharePost(postId);
      return sharePost;
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };
}

module.exports = SharingService;