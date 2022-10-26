let jwtService = require('../services/jwt.service');
let UsersRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
jwtService = new jwtService();
UsersRepository = new UsersRepository();

module.exports = async (req, res, next) => {
  try {
    // 
    console.log('미들웨어 실행이다잉@@@@@@@');
    
    // console.log(req);
    // let accessToken = req.cookies.AccessToken;


    // authorization 에서 받아온 토큰 값 저장
    const accessToken = req.headers.authorization;
     
    console.log(accessToken);
    
    let userId;
    // AccessToken 만료 여부 확인
    let result = await jwtService.validateAccessToken(accessToken);
    console.log('AccessToken 토큰 :::> '+result)

    // AccessToken 만료 시 RefreshToken을 검증하여 AccessToken 재발급

    // RefreshToken 으로 AccessToken 재발급 로직 제거
    if (false) {
      console.log('AccessToken 만료, 재발급 시작');
      const refreshToken = req.cookies['RefreshToken'];
      
      // RefreshToken 유효기간 확인
      result = await jwtService.validateRefreshToken(refreshToken);

      // RefreshToken 만료인 경우 재로그인(RefreshToken 재발급)
      if (!result) {
        return res.status(403).send({ errorMessage: '로그인 해주시길 바랍니다.' });
      }

      // DB에 저장된 RefreshToken 과 비교하여 위변조 여부 확인
      const findUser = await UsersRepository.findOneById(result.id);
      const forgery = bcrypt.compareSync(refreshToken, findUser.refreshToken);
      // forgery = bcrypt.compareSync('토큰위변조',findUser.refreshToken);
      if (!forgery) {
        return res.status(403).send({ errorMessage: '정상적으로 접근하시길 바랍니다.' });
      }

      // AccessToken 재발급
      const newAccessToken = await jwtService.createAccessToken(result.userId);
      userId = result.userId;

      // accessToken 쿠키 재생성
      res.cookie('AccessToken', `Bearer ${newAccessToken}`, {
        expires: new Date(Date.now() + 10800000), // 3시간
      });

      console.log('AccessToken 만료, 재발급 종료');
    }

    // 선생님들께서 사용하실 값
    res.locals.user = { userId: userId };
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).send({
      errorMessage: '토큰 인증이 정상적이지 않습니다.',
    });
  }
};

