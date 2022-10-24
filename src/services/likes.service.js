const LikeRepository = require('../repositories/likes.repository');

class LikeService {

    constructor() {
        this.likeRepository = new LikeRepository();
    }

    // 좋아요 추가, 좋아요 삭제
    updateLike = async (postId, userId) => {
        const findLike = await this.likeRepository.findLike(postId, userId);

        if(!findLike) {
            await this.likeRepository.createLike(postId, userId)
            await this.likeRepository.increment({userId:userId})
            return { message: "좋아요를 추가했습니다."}
        } else {
            await this.likeRepository.deleteLike(postId, userId)
            await this.likeRepository.decrement({userId:userId})
            return { message: "좋아요를 취소했습니다."}
        }
    }
}

module.exports = LikeService;