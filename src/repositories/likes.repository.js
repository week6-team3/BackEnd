const { Posts, Likes } = require('../../models');

class LikeRepository { 

    // find
    findLike = async (userId, postId) => {
        console.log(userId, postId,'repo1')
        const updateLike = await Likes.findOne({ where: {userId:userId, postId:postId} })
        console.log(userId, postId,'repo2')
        return updateLike;
    };

    // create
    createLike = async (userId, postId) => {
        const createLike = await Likes.create(userId, postId);

        return createLike;
    };

    // delete
    deleteLike = async (userId, postId) => {
        const deleteLike = await Likes.destroy({ where: userId, postId });

        return deleteLike;
    };

    // increment likeCount
    increment = async(postId) => {
        const increment = await Posts.increment({likeCount:1}, {where: postId});

        return increment;
    };

    // decrement likeCount
    decrement = async(postId) => {
        const decrement = await Posts.decrement({likeCount:1}, {where: postId});

        return decrement;
    };
    
}

module.exports = LikeRepository;