const { Posts } = require('../../models');

class PostRepository {
  // 1. 내가 작성한 게시글 조회
  findMyPosts = async (userId) => {
    const myPosts = await Posts.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    return myPosts;
  };

  // 2. 게시글 상세 조회
  findOndPost = async (postId) => {
    const myOnePost = await Posts.findByPk(postId);
    return myOnePost;
  };

  // 3. 게시글 작성
  createPost = async (userId, title, content, where) => {
    const newPost = await Posts.create(userId, title, content, where);
    return newPost;
  };

  // 4. 게시글 수정
  updatePost = async (postId, title, content, where) => {
    const updatePost = await Posts.update({ title, content, where }, { where: { postId } });
    return updatePost;
  };

  // 5. 게시글 삭제
  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });
    return { message: '게시글이 삭제되었습니다.' };
  };
}

module.exports = PostRepository;
