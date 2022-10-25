const CommentRepository = require('../repositories/comments.repository');

class CommentService {

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    // 댓글 보기
    getComment = async (postId) => {
        try {
            const getComment = await this.commentRepository.getComment(postId);

            const getAllComment = getComment.map((comment) => {
            return {
                nickname: comment.User.nickname,
                comment: comment.comment,
                createdAt: comment.createdAt,
            };
        });

        return getAllComment;
        } catch(err) {
            console.log(err);
            return { errorMessage: err.message };
        }
        
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