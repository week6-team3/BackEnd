const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const CheckListController = require('../controllers/checklist.controller');
const checkListController = new CheckListController();

// 체크리스트 생성
router.post('/', authMiddleware, checkListController.createCheckList);

// 체크리스트 삭제
router.delete('/:checkId', authMiddleware, checkListController.deleteCheckList);

// 체크리스트 업데이트
router.patch('/:checkId', authMiddleware, checkListController.updateCheckList);

module.exports = router;