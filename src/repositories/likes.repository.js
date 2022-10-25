const { Posts, Likes } = require('../../models');

class LikeRepository { 

    // find
    findLike = async (postId, userId) => {
        const findLike = await Likes.findOne({where: {userId, postId}})

        return findLike;
    };

    // create
    createLike = async (postId, userId) => {
        await Likes.create({userId:userId, postId:postId})
    };

    // delete
    deleteLike = async (postId, userId) => {
        await Likes.destroy({ where: {postId:postId, userId:userId} })
    };

    // increment likeCount
    increment = async(postId) => {
        await Posts.increment({likeCount:1}, {where: {postId:postId}})
    };

    // decrement likeCount
    decrement = async(postId) => {
        await Posts.decrement({likeCount:1}, {where: {postId:postId}})
    };
    
}

module.exports = LikeRepository;