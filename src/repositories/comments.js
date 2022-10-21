const { Posts, Comments } = require('../models');

class CommentRepository {
    // 댓글 생성
    createComment = async (userId, postId, comment) => {
        // 게시글 존재 여부
    try {
        const existPost = await Posts.findByPk(postId);
        if (!existPost) throw new error('게시글이 존재하지 않습니다!!!!!!!');
        

        const createData = await Comments.create({ userId, postId, comment });
        return createData.commentId;
    } catch(err) {
        console.log(err)
        return { errorMessage: err.message };
    }
    };

    // 댓글 수정
    updateComment = async (commentId, comment) => {
         // 댓글 존재 여부
    try {
        const existComment = await Comments.findByPk(commentId);
        if (!existComment) throw new error('댓글이 존재하지 않습니다!!!!');
         

        const updateData = await Comments.update(
            {where: {commentId : commentId}},
            {comment : comment}
        );
        return updateData;
    } catch(err) {
        console.log(err)
        return { errorMessage: err.message };
    }
    };

    // 댓글 삭제
    deleteComment = async (commentId) => {
        // 댓글 존재 여부
    try {
        const existComment = await Comments.findByPk(commentId);
        if (!existComment) throw new error('댓글이 존재하지 않습니다!!!!');
         

        const deleteData = await Comments.delete(
            {where: {commentId : commentId}}
        );
        return deleteData;
    } catch(err) {
        console.log(err)
        return { errorMessage: err.message };
    }
    };
}

module.exports = CommentRepository;