const LikeRepository = require('../repositories/likes.repository');

class LikeService {

    constructor() {
        this.likeRepository = new LikeRepository();
    }

    /**
     * // 좋아요 개수
     * countLike = async (postId) => {
     *     const countLike = await this.likesRepository.countLike(postId);
     * 
     *     return countLike;
     * };
     */

    // 좋아요
    createLike = async (postId, userId) => {
        const likePost = await this.likeRepository.createLike(postId, userId);

        return likePost;
    };

    // 좋아요 취소
    deleteLike = async (postId) => {
        const disLikePost = await this.likeRepository.deleteLike(postId);

        return disLikePost;
    };

}

module.exports = LikeService;