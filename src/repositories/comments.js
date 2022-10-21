const { Share, Comments } = require('../models');

class CommentRepository {
    // 댓글 생성
    createComment = async (userId, shareId, comment) => {
        /**
        * 게시글 존재 여부
        * const existShare = await Share.findByPk(shareId);
        * if (!existShare) throw new error('게시글이 존재하지 않습니다!!!!!!!');
        */

        const createData = await Comments.create({ userId, shareId, comment });
        return createData.commentId
    };

    // 댓글 수정
    updateComment = async (commentId, comment) => {
        /**
         * 댓글 존재 여부
         * const existComment = await Comments.findByPk(commentId);
         * if (!existComment) throw new error('댓글이 존재하지 않습니다!!!!');
         */

        const updateData = await Comments.update(
            {where: {commentId : commentId}},
            {comment : comment}
        );
        return updateData;
    };

    // 댓글 삭제
    deleteComment = async (commentId) => {
        /**
         * 댓글 존재 여부
         * const existComment = await Comments.findByPk(commentId);
         * if (!existComment) throw new error('댓글이 존재하지 않습니다!!!!');
         */

        const deleteData = await Comments.delete(
            {where: {commentId: commentId}}
        );
        return deleteData;
    };
}

module.exports = CommentRepository;