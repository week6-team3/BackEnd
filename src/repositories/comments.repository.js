const { Posts, Comments } = require('../../models');
const { Op } = require('sequelize');

class CommentRepository {
    // 댓글 생성 포스트맨 완료
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

    // 댓글 수정 포스트맨 완료
    updateComment = async (commentId, comment) => {
         // 댓글 존재 여부
         const existComment = await Comments.findByPk(commentId);
        if (!existComment) throw new error('댓글이 존재하지 않습니다!!!!');
         

        if (!commentId) throw new error('commentId를 찾지 못했습니다.');

    try {
        await Comments.update(
            { comment: comment },
            {where: {commentId:commentId}},
        );
    } catch(err) {
        console.log(err)
        return { errorMessage: err.message };
    }
    };

    // 댓글 삭제 포스트맨 완료
    deleteComment = async (commentId) => {
        // 댓글 존재 여부
    try {
        const existComment = await Comments.findByPk(commentId);
        if (!existComment) throw new error('댓글이 존재하지 않습니다!!!!');
         

        await Comments.destroy(
            {where: { commentId }}
        );

    } catch(err) {
        console.log(err)
        return { errorMessage: err.message };
    }
    };
}

module.exports = CommentRepository;