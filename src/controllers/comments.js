const CommentsService = require('../services/comments');

class CommentsController {
    commentsService = new CommentsService();

    // 댓글 생성
    createComment = async (req, res) => {
        try {
            const { userId } = res.locals;
            const { postId } = req.params;
            const { comment } = req.body;

            const commentId =  await this.commentsService.createComment(userId, postId, comment);

            const createResult = { commentId, userId, postId, comment };

            res.status(201).json({ result: createResult, message: "댓글을 생성하였습니다."});
        } catch(err) {
            console.log(err);
            return { errorMessage: err.message };
        }
    };

    // 댓글 수정
    updateComment = async (req, res) => {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;

            const updateResult = await this.commentsService.updateComment(commentId, comment);

            res.status(200).json({ result: updateResult, message: "댓글을 수정하였습니다."});
        } catch(err) {
            console.log(err);
            return { errorMessage: err.message };
        }
    };

    // 댓글 삭제
    deleteComment = async (req, res) => {
        try {
            const { commentId } = req.params;

            const deleteResult = await this.commentsService.deleteComment(commentId);

            res.status(200).json({ result: deleteResult, message: "댓글을 삭제하였습니다."})
        } catch(err) {
            console.log(err);
            return { errorMessage: err.message };
        }
    };
}

module.exports = CommentsController;