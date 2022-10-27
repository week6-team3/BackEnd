const UserRepository = require('../repositories/users.repository');
let JwtService = require('./jwt.service');
require('dotenv').config();
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.jwtService = new JwtService();
  }

  createUserService = async (nickname, email, password) => {
    // 암호화
    const hashPasswd = bcrypt.hashSync(password, parseInt(process.env.SALT));

    const createUserResult = await this.userRepository.createUser(nickname, email, hashPasswd);
    return createUserResult;
  };

  loginUserService = async (email, password) => {
    try {
      // 유저 조회
      const findOneUserResult = await this.userRepository.findOneUser(email);
      if (!findOneUserResult) {
        throw new Error('이메일 혹은 비밀번호를 확인해주세요.');
      }

      // 비밀번호 일치여부
      const passwordResult = await bcrypt.compare(password, findOneUserResult.password);
      if (!passwordResult) {
        throw new Error('이메일 혹은 비밀번호를 확인해주세요.');
      }


      // 비밀번호 일치 시 토큰 발급
      const accessToken = await this.jwtService.createAccessToken(findOneUserResult.userId);
      const refreshToken = await this.jwtService.createRefreshToken(findOneUserResult.userId);

      const hashRefreshToken = bcrypt.hashSync(refreshToken, parseInt(process.env.SALT));

      // 유저 DB에 암호화된 refreshToken 저장쓰
      const [insertRefreshToken] = await this.userRepository.insertUserRefreshToken(findOneUserResult.userId, hashRefreshToken);
      if (!insertRefreshToken) {
        throw new Error('RefreshToken 업데이트 오류!');
      }

      // user 쿠키에 저장되는 RefreshToken은 암호화 x
      return { AccessToken: accessToken, RefreshToken: refreshToken, usernickname: findOneUserResult.nickname };
    } catch (error) {
      return { errorMessage: error.message };
    }
  };
}

module.exports = UserService;
