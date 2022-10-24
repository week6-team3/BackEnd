const CheckListService = require("../services/checklist.service");

class CheckListController {

    constructor() {
        this.checkListService = new CheckListService();
    }

    createCheckList = async (req,res) => {

        const { content, isDone, postId } = req.body;

        const createCheckListResult = await this.checkListService.createCheckListService(content, isDone, postId);
        
        res.send(createCheckListResult)

    }

    deleteCheckList = async (req,res) => {

        const { checkId } = req.params;

        const deleteCheckListResult = await this.checkListService.deleteCheckListService(checkId);
        
        res.send(deleteCheckListResult)
    }

    updateCheckList = async (req,res) => {

        const { checkId } = req.params;
        const { isDone } = req.body; 

        const updateCheckListResult = await this.checkListService.updateCheckListService(checkId, isDone);

        res.send(updateCheckListResult)
    }

}


module.exports = CheckListController

// create : /checkList 
// data : content : string , isdone : true, postId : int

// delete : /checkList/checkId

// patch : /checkList/checkId
// data : isdone