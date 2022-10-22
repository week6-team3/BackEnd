const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const isLoginMiddlewares = require('../middlewares/isLoginMiddleware');

const userController = new UsersController();

router.post('/signup',isLoginMiddlewares,userController.createUserController);
router.post('/login',isLoginMiddlewares,userController.loginUserController);

module.exports = router;