const { Users, Posts } = require('../../models');

class PostRepository {
  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (userId) => {
    const myPosts = await Posts.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['nickname', 'email'],
        },
      ],
    });
    return myPosts;
  };

  // 2. 게시글 상세 조회
  findOnePost = async (postId) => {
    const myOnePost = await Posts.findOne({
      where: { postId },
      include: [{ model: Users }],
    });
    return myOnePost;
  };

  // 3. 게시글 작성
  createPost = async (userId, title, travel, completion) => {
    const newPost = await Posts.create({
      userId,
      title,
      travel,
      completion,
    });
    return newPost;
  };

  // 5. 게시글 삭제
  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });
    return { message: '게시글이 삭제되었습니다.' };
  };
}

module.exports = PostRepository;