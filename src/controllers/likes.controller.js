const LikeService = require('../services/likes.service');

class LikeController {
        likeService = new LikeService();
 
     // 좋아요
     updateLike = async (req, res) => {
        try{ 
            const { userId } = res.locals.user;
            const { postId } = req.params;

            const likeCount = await this.likeService.updateLike(userId, postId);

            res.status(201).json({ result: likeCount })
        } catch(err) {
            console.log(err);
            return { errorMessage: err.message };
        }
     };

}

module.exports = LikeController;