const { Users, Posts, Checklist, Likes } = require('../../models');

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
      include: [
        {
          model: Users,
          attributes: ['nickname', 'email'],
        },
      ],
    });
    return myOnePost;
  };

  // 2-1. 게시글에 달린 체크리스트 조회
  findCheckList = async (postId) => {
    const myCheckList = await Checklist.findAll({ where: { postId }, attributes: ['checkId', 'content', 'isDone', 'postId'] });
    return myCheckList;
  };

  // 2-2. 로그인한 유저의 해당 게시글 좋아요 상태 확인
  findMyLike = async (postId) => {
    const isMyLike = await Likes.findOne({ where: { postId } });
    return isMyLike;
  };

  // 3. 게시글 작성
  createPost = async (userId, title, travel) => {
    const newPost = await Posts.create({
      userId,
      title,
      travel,
    });
    console.log(newPost.postId);
    return newPost;
  };

  // 4. 게시글 수정
  updatePost = async (title, postId) => {
    const [updatePost] = await Posts.update({ title }, { where: { postId: postId } });
    return updatePost;
  };

  // Completion 수정
  updateCompletionPost = async (completion, postId) => {
    console.log('result com' + completion);
    const [updatePost] = await Posts.update({ completion }, { where: { postId: postId } });
    return updatePost;
  };

  // 5. 게시글 삭제
  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });
    return { message: '게시글이 삭제되었습니다.' };
  };
}

module.exports = PostRepository;
