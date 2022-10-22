const PostRepository = require('../repositories/posts.repository');
const SharingRepository = require('../services/sharigs.repository');

class SharingService {
  postRepository = new PostRepository();
  shringRepository = new SharingRepository();

  // 1. 공유된 게시글 전체 조회
  findSharedPosts = async () => {
    try {
      const sharedPosts = await this.sharingRepository.findSharedPosts();
      if (!sharedPosts) throw new Error('공유된 게시글이 없습니다.');
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
      return sharedPosts;
    } catch (error) {
      console.log(error);
      return { errorMessage: error.message };
    }
  };

  // 2. 공유된 게시글 상세 조회
  findOnePost = async (postId) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
      if (!existPost) throw new Error('존재하지 않는 게시글입니다.');

      return {
        postId: existPost.postId,
        userId: existPost.userId,
        nickname: existPost.User.nickname,
        title: existPost.title,
        travel: existPost.travel,
        sharing: existPost.sharing,
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

  // 3. 게시글 공유하기
  sharePost = async (userId, postId) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
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
