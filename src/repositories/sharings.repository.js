const { Users, Posts } = require('../../models');

class SharingRepository {
  // 공유된 게시글 전체 조회
  findSharedPosts = async () => {
    const sharedPosts = await Posts.findAll({
      where: { sharing: '1' },
      order: [['likeCount', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['nickname', 'email'],
        },
      ],
    });
    return sharedPosts;
  };

  // 게시글 공유
  sharePost = async (postId) => {
    await Posts.update({ sharings: 'true' }, { where: { postId } });
    return { message: '게시글이 공유되었습니다.' };
  };
}

module.exports = SharingRepository;
