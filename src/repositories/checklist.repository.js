const { Checklist } = require('../../models');

class CheckListRepository {
  findOneCheckList = async (postId, content) => {
    console.log(1);
    return await Checklist.findOne({
      where: { postId, content },
    });
  };

  createCheckList = async (content, isDone, postId) => {
    try {
      console.log(2);
      // const findOneCheckListResult = await findOneCheckList(postId, content);
      // if (findOneCheckListResult) {
      //   throw new Error('이미 등록했어요!');
      // }

      const createCheckListResult = await Checklist.create({
        content: content,
        isDone: isDone,
        postId: postId,
      });

      return createCheckListResult;
    } catch (error) {
      return { errorMessage: error.message };
    }
  };

  deleteCheckList = async (checkId) => {
    // 삭제 만들어야한다잉
    try {
      const deleteCheckListResult = await Checklist.destroy({ where: { checkId: checkId } });
      return deleteCheckListResult;
    } catch (error) {
      return { errorMessage: error.message };
    }
  };

  updateCheckList = async (checkId, isDone) => {
    const updateCheckListResult = await Checklist.update({ isDone: isDone }, { where: { checklistId: checkId } });
    return updateCheckListResult;
  };
}

module.exports = CheckListRepository;
