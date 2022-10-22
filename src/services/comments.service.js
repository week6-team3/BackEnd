const CommentRepository = require('../repositories/comments.repository');

class CommentService {

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    // 댓글 생성
    createComment = async (userId, postId, comment) => {
        return await this.commentRepository.createComment(userId, postId, comment);
    };

    // 댓글 수정
    updateComment = async (commentId, comment) => {
        return await this.commentRepository.updateComment(commentId, comment);
    };

    // 댓글 삭제
    deleteComment = async (commentId) => {
        return await this.commentRepository.deleteComment(commentId);
    };
}

module.exports = CommentService;