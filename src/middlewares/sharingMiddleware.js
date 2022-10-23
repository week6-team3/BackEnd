let jwtService = require('../services/jwt.service');
let UsersRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
jwtService = new jwtService();
UsersRepository = new UsersRepository();

// 로그인 되어 있는 유저일 경우 Error를 반환한다.
module.exports = async (req, res, next) => {
  try {
    let accessToken = req.cookies['AccessToken'];
    if (!accessToken) return next();

    let userId;
    // AccessToken 만료 여부 확인
    let result = await jwtService.validateAccessToken(accessToken.split(' ')[1]);
    userId = result.userId;
    // AccessToken 만료 시 RefreshToken을 검증하여 AccessToken 재발급

    if (!result) {
      console.log('AccessToken 만료, 재발급 시작');
      const refreshToken = req.cookies['RefreshToken'];

      // RefreshToken 유효기간 확인
      result = await jwtService.validateRefreshToken(refreshToken.split(' ')[1]);
      // RefreshToken 만료인 경우 재로그인(RefreshToken 재발급)
      if (!result) {
        return res.status(403).send({ errorMessage: '로그인 해주시길 바랍니다.' });
      }

      // DB에 저장된 RefreshToken 과 비교하여 위변조 여부 확인
      const findUser = await UsersRepository.findOneById(result.id);
      const forgery = bcrypt.compareSync(refreshToken.split(' ')[1], findUser.refreshToken);
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
    return res.status(400).send({
      errorMessage: '잘못된 접근입니다.',
    });
  }
};
