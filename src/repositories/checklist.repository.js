const { Checklist } = require('../../models');

class CheckListRepository {

    constructor(){
        this.Checklist = Checklist;
    }

    findOneCheckList = async(postId, content) => {
        const findOneCheckListResult = await Checklist.findOne({
            where:{postId:postId, content:content},
            raw: true
        });
        return findOneCheckListResult
    }

    createCheckList = async (content, isdone, postId) => {
        try {
            const findOneCheckListResult = await this.findOneCheckList(postId, content);
            if(findOneCheckListResult) { throw new Error('이미 등록했어요!') }
            
            const createCheckListResult = await this.Checklist.create({
                "content":content, "isdone":isdone, "postId":postId
            });

            return createCheckListResult
        } catch (error) {
            return { errorMessage: error.message }
        }
    }

    deleteCheckList = async (checkId) => {

        // 삭제 만들어야한다잉
        try {
            const deleteCheckListResult = await this.Checklist.destroy({where:{"checkId":checkId}});
            return deleteCheckListResult
        } catch (error) {
            return { errorMessage: error.message }
        }

    }

    updateCheckList = async (checkId, isdone) => {
        
        const updateCheckListResult = await this.Checklist.update(
            {isdone:isdone},
            {where : {"checklistId":checkId}}
        )
        return updateCheckListResult
    }

}

module.exports = CheckListRepository ; 