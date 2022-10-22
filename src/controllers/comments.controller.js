const CommentService = require('../services/comments.service');

class CommentController {
    commentService = new CommentService();

    // 댓글 생성
    createComment = async (req, res) => {
        try {
            const { userId } = res.locals.user;
            const { postId } = req.params;
            const { comment } = req.body;

            const createResult =  await this.commentService.createComment(userId, postId, comment);

            // const createResult = { commentId, userId, postId, comment };

            res.status(201).json({ result: createResult, message: "댓글을 작성하였습니다."});
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

            const updateResult = await this.commentService.updateComment(commentId, comment);

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

            const deleteResult = await this.commentService.deleteComment(commentId);

            res.status(200).json({ result: deleteResult, message: "댓글을 삭제하였습니다."})
        } catch(err) {
            console.log(err);
            return { errorMessage: err.message };
        }
    };
}

module.exports = CommentController;