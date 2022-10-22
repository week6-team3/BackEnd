const LikeService = require('../services/likes.controller');

class LikeController {

    constructor() {
        this.likeService = new LikeService();
    }

     // 좋아요 개수
     countLike = async (req, res) => {
        try{
            const { postId } = req.params;

            const countLike = await this.likeService.countLike(postId);

            res.status(200).send(countLike);

        } catch(err) {

            res.status(400).send({errorMessage: err.message})

        }
     };

     // 좋아요
     createLike = async (req, res) => {
        try{
            const { postId } = req.params;

            const likePost = await this.likeService.createLike(postId);

            
        }
     }
     
}