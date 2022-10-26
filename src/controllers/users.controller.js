const UserService = require('../services/users.service');

const Joi = require('joi');

const re_nickname = /^[A-Za-z0-9]{4,10}$/;
const re_email = /^[A-Za-z0-9]([-_\.]?[0-9a-zA-z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-z])*\.[a-zA-z]{2,3}$/;
const re_password = /^[a-zA-Z0-9]{4,16}$/;

const userSchema = Joi.object({
    nickname: Joi.string().pattern(re_nickname).required(),
    email: Joi.string().pattern(re_email).required(),
    password: Joi.string().pattern(re_password).required(),
    confirm: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    // 회원가입
    createUserController = async (req,res)=>{
        console.log('아ㄴ녕하세요 회ㄴㅏ입입니다.');
        try {
            const { nickname, email, password,confirm } = await userSchema.validateAsync(
                req.body
            ).catch((error)=>{
                // joi error msg
                const joiError = error.details[0].message.split('with')[0].replace(/"/g,'');
                throw new Error(`${joiError}형식을 확인해주세요`)
            });
            console.log(nickname, email, password,confirm)
            
            // 비밀번호 일치여부 확인
            if(password !== confirm) throw new Error('비밀번호가 일치하지 않습니다.');
            console.log('일치해유')
            // 회원가입 서비스 호출 
            const createUserResult = await this.userService.createUserService(nickname,email,password);
            res.status(200).send(createUserResult)

        } catch (error) {
            res.status(400).send({errorMessage:error.message})
        }
    }

    loginUserController = async (req,res)=>{
        console.log('로그인 시작해유 ~~~~~~~');
        try {
            // 로그인 정보는 joi로 검증하지 않습니다 .. 유저 정보를 유추할 수 있다나 뭐라나 ..
            // 빈 값만 확인 ..
            const { email, password } = await loginSchema.validateAsync(
                req.body
            ).catch((error)=>{
                // joi error msg
                const joiError = error.details[0].message.split('is')[0].replace(/"/g,'');
                throw new Error(`${joiError} 값이 빈 값입니다.`);
            });

            const loginUserResult = await this.userService.loginUserService(email, password);
            
            // 로그인 성공 시 쿠키에 토큰 저장 -> body로 전송
            // if(!loginUserResult.errorMessage){
            if(false){   
                // RefreshToken 쿠키 저장
                const refreshDate = new Date();
                refreshDate.setDate(refreshDate.getDate()+7);
                res.cookie('RefreshToken', `${loginUserResult.RefreshToken}`, {
                    expires: refreshDate // 7일
                });
    
                // accessToken 쿠키 생성 
                const accessDate = new Date();
                accessDate.setDate(accessDate.getDate()+3);
                res.cookie('AccessToken', `${loginUserResult.AccessToken}`, {
                    // expires: new Date(Date.now() + 10800000), // 3시간
                    expires : accessDate
                });
            }

            console.log(loginUserResult)
            
            loginUserResult.errorMessage ? res.status(200).send({errorMessage:loginUserResult.errorMessage}) : res.status(200).send({loginUserResult,message:'로그인을 성공하셨습니다!'});
            
        } catch (error) {
            console.log(error)
            res.status(400).send({errorMessage:error.message})
        }
        
    }

}

module.exports = UserController;