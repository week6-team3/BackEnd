const CheckListRepository =  require('../repositories/checklist.repository');

class CheckListService {

    constructor(){
        this.checkListRepository = new CheckListRepository();
    }

    createCheckListService = async (content, isDone, postId) => {
        
        const createCheckListResult = await this.checkListRepository.createCheckList(content, isDone, postId);

        return createCheckListResult
    }

    deleteCheckListService = async (checkId) => {

        const deleteCheckListResult = await this.checkListRepository.deleteCheckList(checkId);
        
        if(!deleteCheckListResult){
            return  { message: '삭제에 실패했습니다.' }
        }
        return { message: '데이터 삭제 완료' }

    }

    updateCheckListService = async (checkId, isDone) => {

        const [ updateCheckListResult ] = await this.checkListRepository.updateCheckList(checkId, isDone);

        if(!updateCheckListResult){
            return  { message: '수정에 실패했습니다.' }
        }
        return { message: '데이터 수정 완료' }

    }

}

module.exports = CheckListService ; 
