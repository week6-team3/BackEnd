const SharingService = require('../services/sharigs.service');
const PostService = require('../services/posts.service');

class SharingController {
  sharingService = new SharingService();
  postService = new PostService();

  // 1. 공유된 게시글 전체 조회
  findSharedPosts = async (req, res) => {
    const sharedPosts = await this.sharingService.findSharedPosts();
    res.status(200).send(sharedPosts);
  };

  // 2. 공유된 게시글 상세 조회
  fineOnePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId가 잘못되었습니다.');

    const getOnePost = await this.postService.findOnePost(postId);

    res.status(200).send(getOnePost);
  };

  // 3. 게시글 공유하기
  sharePost = async (req, res) => {
    const { postId } = req.params;
    // if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1) throw new Error('postId를 잘못 입력하였습니다.');

    const { userId } = res.locals.user;

    const sharePost = await this.sharingService.deletePost(userId, postId);
    res.status(200).send(sharePost);
  };
}

module.exports = SharingController;
