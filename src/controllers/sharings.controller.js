const SharingService = require('../services/sharings.service');

class SharingController {
  sharingService = new SharingService();

  // 1. 공유된 게시글 전체 조회
  getSharedPosts = async (req, res) => {
    const sharedPosts = await this.sharingService.findSharedPosts();
    res.status(200).send(sharedPosts);
  };

  // 2. 공유된 게시글 상세 조회
  getOnePost = async (req, res) => {
    const { postId } = req.params;
    let userId;
    if (!res.locals.user) userId = null;
    else userId = res.locals.user.userId;
    const getOnePost = await this.sharingService.findOnePost(userId, postId);

    res.status(200).send(getOnePost);
  };

  // 3. 게시글 공유하기
  sharePost = async (req, res) => {
    const { postId } = req.body;
    console.log(postId);
    const { userId } = res.locals.user;

    const sharePost = await this.sharingService.sharePost(userId, postId);
    res.status(200).send(sharePost);
  };
}

module.exports = SharingController;
