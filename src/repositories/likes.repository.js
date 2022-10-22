const { Likes } = require('../../models');

class LikeRepository {
    /**
     * // 좋아요 개수
     * countLike = async (postId) => {
     *    const countLike = await Likes.count({ where: postId });
     * 
     *    const likeCount = await Posts.create(countLike);
     * 
     *    return likeCount;
     * };
     */

    // 좋아요
    createLike = async (postId, userId) => {
        const likePost = await Likes.create( postId, userId );

        return likePost;
    };

    // 좋아요 취소
    deleteLike = async (postId) => {
        const disLikePost = await Likes.destroy({ where: postId });

        return disLikePost;
    };

}

module.exports = LikeRepository;