const LikeRepository = require('../repositories/likes.repository');

class LikeService { 

    constructor() {
        this.likeRepository = new LikeRepository();
    }

    // 좋아요 추가, 좋아요 삭제
    updateLike = async (userId, postId) => {
        // console.log(userId, postId,'service1')
        const findLike = await this.likeRepository.findLike(userId, postId);
        // console.log(userId, postId,'service2')
        if(!findLike) {
            // console.log('좋아요추가')
            await this.likeRepository.createLike({userId:userId, postId:postId})
            await this.likeRepository.increment({userId:userId})
            return { message: "좋아요를 추가했습니다."}
        } else {
            // console.log('좋아요취소')
            await this.likeRepository.deleteLike({userId:userId, postId:postId})
            await this.likeRepository.decrement({userId:userId})
            return { message: "좋아요를 취소했습니다."}
        }
    }
}

module.exports = LikeService;